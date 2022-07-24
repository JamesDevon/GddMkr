import styled from 'styled-components';
import {zIndexValues} from '../../../shared/utils/styles';

export const ZoomContainer = styled.div`
  z-index: ${zIndexValues.editor+2};
  position: fixed;
  right: 2%;
  top: 8%
`;
