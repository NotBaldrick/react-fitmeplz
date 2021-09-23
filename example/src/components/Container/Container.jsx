import styled from "styled-components";
import {down} from "styled-breakpoints";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: minmax(0, 1fr);
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1rem;
  justify-content: center;
  align-items: center;

  ${down("md")} {
    grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr);
    height: auto;
    padding-top: 1rem;
  }
`;

export default Container;
