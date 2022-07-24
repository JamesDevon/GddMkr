import styled from 'styled-components';

interface StyledIconProps {
  size: number,
  left: number,
  top: number,
  code: string | undefined,
}

export const StyledIcon = styled.i`
  display: inline-block;
  font-size: ${(props: StyledIconProps) => `${props.size}px`};
  ${(props) =>
    props.left || props.top ? `transform: translate(${props.left}px, ${props.top}px);` : ''}
  ${(props) =>
      props.color? `color:${props.color};` : ''}
  &:before {
    content: "${(props) => props.code}";
    font-family: "bootstrap-icons" !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
