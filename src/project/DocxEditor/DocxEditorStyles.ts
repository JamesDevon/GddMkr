import styled from 'styled-components';
import {zIndexValues} from '../../shared/utils/styles';

export const EditorContainer = styled.div`
    z-index: ${zIndexValues.editor};
    position: fixed;
    top: 8%;
    width:87%;
    height: 100%;
    overflow-y: scroll;
`;
