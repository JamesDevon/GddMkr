import styled from 'styled-components';
import {color, zIndexValues} from '../../../../shared/utils/styles';

export const EditorStyles = styled.div`
    *::before, *::after {
      box-sizing: border-box;
    }
  
  .ql-toolbar {
    display: flex;
    justify-content: center;
    z-index: ${zIndexValues.editor+1};
    position: sticky;
    top: 0;
    border: none;
    background-color: ${color.get('backgroundLightest')};
    box-shadow: 0 0 5px 0 rgba(0, 0, 0 ,.5);
  }
  
  .ql-container {
    display: flex;
    justify-content: center;
    border: none;
  }
  .ql-editor {
    zoom: ${(props: { zoomPercentage: number }) => props.zoomPercentage}%;
    width: 8.5in;
    min-height: 11in;
    padding: 1in;
    margin: 1rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0 ,.5);
    background-color: white;
  }
`;
