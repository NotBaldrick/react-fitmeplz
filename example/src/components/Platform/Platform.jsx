import React, {useEffect, useState} from "react";
import styled, {css} from "styled-components";

const StyPlatform = styled.div`
  border: dashed red 0.5rem;
  width: ${(p) => p.$width};
  height: ${(p) => p.$height};
  box-sizing: border-box;
  padding: 0.5rem;
  position: relative;
  :before {
    content: "${(p) => p.$infoText}";
    padding: 0.5rem;
    position: absolute;
    ${(p) => p.$infoPosition}
  }
`;

const defaultProps = {
  width: "100%",
  height: "100%",
  info: {
    text: "",
    position: "bottom-left",
  },
};

function Platform(props) {
  props = {
    ...defaultProps,
    ...props,
    info: {
      ...defaultProps.info,
      ...props.info,
    },
  };

  const [infoPosition, setInfoPosition] = useState(css`
    bottom: 0;
    left: 0;
  `);

  useEffect(() => {
    switch (props.info.position) {
      case "top-left":
        setInfoPosition(css`
          top: 0;
          left: 0;
        `);
        break;
      case "top-right":
        setInfoPosition(css`
          top: 0;
          right: 0;
        `);
        break;
      case "bottom-left":
        setInfoPosition(css`
          bottom: 0;
          left: 0;
        `);
        break;
      case "bottom-right":
        setInfoPosition(css`
          bottom: 0;
          right: 0;
        `);
        break;
      default:
        setInfoPosition(css`
          bottom: 0;
          left: 0;
        `);
        break;
    }
  }, [props.info.position]);

  return (
    <StyPlatform
      $width={props.width}
      $height={props.height}
      $infoPosition={infoPosition}
      $infoText={props.info.text}
    >
      {props.children}
    </StyPlatform>
  );
}

Platform.defaultProps = defaultProps;

export default Platform;
