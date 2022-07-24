import axios from 'axios';
import {MsConfig} from '../../../config/MsConfig';
import {Authenticator} from '../authentication/Authenticator';

export const getDetails = (userId: string | null) => {
  return axios.get(`${MsConfig.detailPath}/${userId}`, {
    headers: {
      'Authorization': `Bearer ${Authenticator.token}`,
    },
  });
};
