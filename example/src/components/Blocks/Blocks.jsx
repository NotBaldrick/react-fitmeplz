import styled, {css} from "styled-components";
import {down} from "styled-breakpoints";

const CSSBlock = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
`;

export const OptionsBlock = styled.div`
  grid-area: 1 / 1;

  ${down("md")} {
    grid-area: 2 / 1;
  }
  ${CSSBlock}
`;

export const DisplayBlock = styled.div`
  grid-area: 1 / 2;

  ${down("md")} {
    grid-area: 1 / 1;
  }
  ${CSSBlock}
`;
