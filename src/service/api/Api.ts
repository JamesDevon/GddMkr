import axios, {AxiosResponse} from 'axios';
import {IProject} from '../../project/interfaces/IProject';
import {MsConfig} from '../../config/MsConfig';
import {Authenticator} from './authentication/Authenticator';
import {IPost} from './interfaces/IPost';
import {IRequest} from './interfaces/IRequest';

/**
 * Api class used for the connection to the microservice
 */
export class Api<T, C> {
  /**
   * @summary Used for fetching the projects of the user
   * @param {string} userId the user id
   */
  static async fetchProjects(userId: string | null) : Promise<AxiosResponse<IProject[]>> {
    return axios.get(`${MsConfig.projectsPath}`, {
      headers: {
        'Authorization': `Bearer ${Authenticator.token}`,
      },
      params: {userId},
    });
  }

  /**
   * @summary Making a get request
   * @param {IRequest} requestDto
   * @return {Promise}
   */
  async request(requestDto: IRequest) : Promise<Response> {
    const {path, method, body} = requestDto;
    const init: RequestInit = {
      method: method,
      headers: {
        'Authorization': `Bearer ${Authenticator.token}`,
        'Content-Type': 'application/json',
      },
    };
    if (method !== 'GET') {
      init.body = (body != null) ? JSON.stringify(body) : '';
    }
    return await fetch(path, init);
  }

  /**
   * @summary Making a post request
   * @param {IPost} postDto
   */
  async post(postDto: IPost<T>) : Promise<AxiosResponse<C>> {
    const {path, body} = postDto;
    return axios.post(
        path,
        {...body},
        {
          headers: {
            'Authorization': `Bearer ${Authenticator.token}`,
          }},
    );
  }

  /**
   * @summary Making a post request
   * @param {IPost} postDto
   */
  async put(postDto: IPost<T>) : Promise<AxiosResponse<C>> {
    const {path, body} = postDto;
    return axios.put(
        path,
        {...body},
        {
          headers: {
            'Authorization': `Bearer ${Authenticator.token}`,
          }},
    );
  }
}
