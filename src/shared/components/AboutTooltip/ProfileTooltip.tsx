import React, {useCallback, useEffect, useRef, useState} from 'react';

import Button from '../Button/Button';
import Tooltip from '../Tooltip/Tooltip';

import feedbackImage from './assets/feedback.png';
import {FeedbackDropdown, FeedbackImageCont, FeedbackImage, FeedbackParagraph} from './AboutTooltipStyles';
import {Authenticator} from '../../../service/api/authentication/Authenticator';
import {FormLabel} from 'react-bootstrap';
import {getDetails} from '../../../service/api/profile/getDetails';
import {AxiosResponse} from 'axios';

const ProfileTooltip = (tooltipProps: any) => {
  const handleLogout = () => {
    Authenticator.logout();
    window.location.reload();
  };

  const [userName, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const mounted = useRef(false);

  const loadDetails = useCallback(() => {
    const userDetails: Promise<AxiosResponse<{ username: string, email: string }>> = getDetails(Authenticator.userId);
    userDetails.then((userDetailsResult) => {
      setUsername(userDetailsResult.data.username);
      setEmail(userDetailsResult.data.email);
    });
  }, []);

  useEffect(() => {
    mounted.current = true;
    loadDetails();

    return () => {
      mounted.current = false;
    };
  }, [loadDetails]);

  return (
    <Tooltip
      width={300}
      {...tooltipProps}
      renderContent={() => (
        <FeedbackDropdown>
          <FeedbackImageCont>
            <FeedbackImage src={feedbackImage} alt="Give feedback"/>
          </FeedbackImageCont>

          <FeedbackParagraph>
            <FormLabel>Username : {userName}</FormLabel>
          </FeedbackParagraph>

          <FeedbackParagraph>
            <FormLabel>Email : {email}</FormLabel>
          </FeedbackParagraph>

          <Button variant="primary" onClick={handleLogout}>Logout</Button>
        </FeedbackDropdown>
      )}
    />
  );
};

export default ProfileTooltip;
