/** loginPath  if (!Authenticator.isLogIn) {
    return <Navigate to={{pathname: FrontConfig.loginPath}} />;
  }
 * @summary Contains the basic info about the microservices
 */
export class FrontConfig {
  public static root: string = '/';
  public static app: string = '/app';
  public static appUnique: string = '/app/:id';
  public static loginPath: string = '/login';
  public static signUpPath: string = '/signUp';
  public static logout: string = '/logout';
}
