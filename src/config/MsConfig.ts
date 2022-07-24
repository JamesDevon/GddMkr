/**
 * @summary Contains the basic info about the microservices
 */
export class MsConfig {
  public static rootPath: string = process.env.REACT_APP_API as string;
  public static loginPath: string = this.rootPath + process.env.REACT_APP_API_LOGIN;
  public static signUpPath: string = this.rootPath + process.env.REACT_APP_API_SIGN_UP;
  public static projectsPath: string = this.rootPath + process.env.REACT_APP_API_PROJECTS;
  public static detailPath: string = this.rootPath + process.env.REACT_APP_PROFILE_DETAILS;
}
