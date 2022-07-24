import React, {useState, useEffect, useCallback} from 'react';
import {createQueryParamModalHelpers} from '../shared/utils/queryParamModal';
import {Authenticator} from '../service/api/authentication/Authenticator';
import {FrontConfig} from '../config/FrontConfig';
import {Navigate, useParams, useSearchParams} from 'react-router-dom';
import {ProjectService} from '../service/api/projects/ProjectService';
import {IProject} from './interfaces/IProject';
import {PageLoader} from '../shared/components/PageLoader/PageLoader';
import PageError from '../shared/components/PageError/PageError';
import {IProjectPageProps, ProjectsPage} from './ProjectsPage';
import {IReturn} from '../service/api/interfaces/IReturn';

export const Project = () => {
  if (!Authenticator.isLogin()) {
    return <Navigate to={{pathname: FrontConfig.loginPath}}/>;
  }

  const {id} = useParams<string>();

  const [searchParams, setSearchParams] = useSearchParams();

  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = useCallback(async () => {
    setError(false);
    const results: IReturn<IProject[]> = await ProjectService.getProjects();
    if (results.success) {
      setProjects(results.data);
    } else {
      setError(results.msg !== '');
    }
    setIsloading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const projectCreateModalHelpers = createQueryParamModalHelpers('project-create', searchParams, setSearchParams);
  const projectConfigModalHelpers = createQueryParamModalHelpers('project-config', searchParams, setSearchParams);
  const inviteFriendModalHelpers = createQueryParamModalHelpers('invite-friend', searchParams, setSearchParams);

  if (isLoading) {
    return <PageLoader/>;
  }

  if (!id) {
    if (projects.length > 0) {
      return <Navigate to={{pathname: `${FrontConfig.app}/${projects[0]._id}`}}/>;
    }
  }

  if (error) {
    return <PageError/>;
  }

  const props: IProjectPageProps = {
    id,
    projects,
    setProjects,
    projectCreateModalHelpers,
    projectConfigModalHelpers,
    inviteFriendModalHelpers,
  };

  return (
    <ProjectsPage {...props}/>
  );
};
