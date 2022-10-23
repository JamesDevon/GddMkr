import styled from 'styled-components';
import {zIndexValues} from '../../../shared/utils/styles';

export const EditorContainer = styled.div`
    z-index: ${zIndexValues.editor};
    position: relative;
    top: 8%;
    width:100%;
    height: 100%;
`;
