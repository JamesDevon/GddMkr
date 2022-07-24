import {Api} from '../Api';
import {IProject} from '../../../project/interfaces/IProject';
import {MsConfig} from '../../../config/MsConfig';
import {IPost} from '../interfaces/IPost';
import {IReturn} from '../interfaces/IReturn';
import StatusCode from 'status-code-enum';

/**
 * The Project class
 * Used for communication with the backend
 */
export class ProjectService {
  /**
  * @summary Fetch the projects for the user
  */
  static async getProjects() : Promise<IReturn<IProject[]>> {
    const result : IReturn<IProject[]> = {success: false, msg: '', data: []};
    try {
      const api: Api<any, IProject[]> = new Api< any, IProject[]>();
      const response : Response = await api.request({path: MsConfig.projectsPath, method: 'GET', body: null});
      result.success = true;
      if (response.status === StatusCode.SuccessOK) {
        result.data = await response.json();
      }
    } catch (error: any) {
      result.success = false;
      result.msg = error;
    }

    return result;
  }

  /**
   * @summary Creating a new project
   * @param {Partial<IProject>} newProject
   */
  static async createProject(newProject : Partial<IProject>) : Promise<IReturn<Partial<IProject>>> {
    const api: Api<Partial<IProject>, IProject> = new Api<Partial<IProject>, IProject>();
    const project: Partial<IProject> = {
      title: newProject.title,
      genre: newProject.genre,
      description: newProject.description,
      sections: newProject.sections,
    };
    const postParams : IPost<Partial<IProject>> = {
      body: project,
      path: MsConfig.projectsPath,
    };
    const responsePromise = api.post(postParams);
    const result : IReturn<Partial<IProject>> = {success: false, msg: '', data: {}};
    await responsePromise.then( (response) => {
      result.success = true;
      if (response.status === StatusCode.SuccessCreated) {
        result.msg= 'Project has been successfully created';
        result.data = response.data;
      }
    }).catch( (response) => {
      result.success = false;
      if (response.status === StatusCode.ServerErrorInternal) {
        result.msg = 'The projects creation failed due to system error. Please try again';
      } else if (response.status === StatusCode.ClientErrorBadRequest) {
        result.msg = 'The info you provided was not acceptable. Please review your input and try again';
      }
    });
    return result;
  }
}
