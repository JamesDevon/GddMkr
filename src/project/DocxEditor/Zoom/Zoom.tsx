import React from 'react';

import {Button} from '@mui/material';
import {Icon} from '../../../shared/components';
import {ZoomContainer} from './ZoomStyles';

export interface IZoomProps {
    setZoom: (per: number) => void;
    zoom: number;
    step: number;
}

const Zoom = (props: IZoomProps) => {
  const buttonStyle = {maxWidth: '45px', minWidth: '45px'};

  return (
    <ZoomContainer>
      <label>{props.zoom}%</label>
      <Button onClick={() => props.setZoom(props.zoom+props.step)} style={buttonStyle}>
        <Icon type="zoom-in" size={22}/>
      </Button>
      <Button onClick={() => props.setZoom(props.zoom-props.step)} style={buttonStyle}>
        <Icon type="zoom-out" size={22}/>
      </Button>
      <Button onClick={() => props.setZoom(100)} style={buttonStyle}>
        <Icon type="exit-fullscreen" size={22}/>
      </Button>
      <Button onClick={() => props.setZoom(250)} style={buttonStyle}>
        <Icon type="enter-fullscreen" size={22}/>
      </Button>
    </ZoomContainer>
  );
};

export default Zoom;
