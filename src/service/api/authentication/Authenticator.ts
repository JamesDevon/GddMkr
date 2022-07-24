import axios, {AxiosError, AxiosResponse} from 'axios';
import {MsConfig} from '../../../config/MsConfig';
const {StatusCode} = require('status-code-enum');

/**
 * The authenticator class
 */
export class Authenticator {
  static userId: string | null = localStorage.getItem('userId');
  static token: string | null = localStorage.getItem('token');
  static createdAt: number | null = Number(localStorage.getItem('createdAt'));

  /**
   * Get jwt token for authentication
   * @param {string} username
   * @param {string} password
   * @return {boolean} success
   */
  static async login(username: string, password: string): Promise<boolean> {
    try {
      const response: Promise<AxiosResponse<{ accessToken: string, userId: string }>> = axios.post(MsConfig.loginPath, {
        username,
        password,
      });
      let success: boolean = false;
      await response.then((token) => {
        const {data} = token;
        this.token = data.accessToken;
        localStorage.setItem( 'token', data.accessToken);
        this.userId = data.userId;
        localStorage.setItem('userId', data.userId);
        this.createdAt = (new Date()).getTime();
        localStorage.setItem('createdAt', String((new Date()).getTime()));
        success = true;
      });
      return success;
    } catch (error: any) {
      if (error.response.status === StatusCode.ClientErrorUnauthorized || error.response.status === StatusCode.ClientErrorBadRequest) {
        return false;
      } else {
        throw new Error('Unexpected error during login');
      }
    }
  }

  /**
   * @summary handles the register function
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @return {boolean} whether the registration was successful
   */
  static async registerUser(username: string, email: string, password: string) : Promise<number> {
    const response : Promise<AxiosResponse> = axios.post(MsConfig.signUpPath, {
      username,
      password,
      email,
    });
    let success : number = 500;
    await response.then((result) => {
      success = result.status;
    }).catch((error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        // @ts-ignore
        success = error.response.status;
      }
    });
    return success;
  }

  /**
   * @summary clears the localstorage token
   */
  static logout() : void {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('createdAt');
  }

  /**
   *  @summary returns whether the token is still valid
   *  @return {boolean}
   */
  static isLogin(): boolean {
    return (this.token !== null && this.createdAt!==null && ((new Date()).getTime() - this.createdAt < 3600000));
  }
}
