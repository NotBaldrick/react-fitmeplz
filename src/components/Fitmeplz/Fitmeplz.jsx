import React, {useState, useEffect, useRef} from "react";
import _ from "lodash";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow: hidden;
  text-align: center;
`;

const DynamicText = styled.div`
  white-space: nowrap;
  display: inline;
  vertical-align: top;
  opacity: ${(p) => p.$opacity};
`;

function Fitmeplz({
  min,
  max,
  start,
  throttle,
  step,
  hideOnMount,
  hideOnCalc,
  onStart,
  onEnd,
  onFontsize,
  children,
  ...rest
}) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [hide, setHide] = useState(hideOnMount);

  useEffect(() => {
    const container = containerRef.current;
    const resizeObserver = new window.ResizeObserver(() => adjustText());

    resizeObserver.observe(container);

    return () => resizeObserver.unobserve(container);
  }, [min, max, start, throttle, step, hideOnMount, hideOnCalc, children]);

  function elementSize() {
    return {
      text: {
        width: textRef.current?.getBoundingClientRect()?.width,
        height: textRef.current?.getBoundingClientRect()?.height,
      },
      container: {
        width: containerRef.current?.getBoundingClientRect()?.width,
        height: containerRef.current?.getBoundingClientRect()?.height,
      },
    };
  }

  function currentFontSize() {
    return parseFloat(textRef.current?.style.fontSize.replace("px", ""));
  }

  function changeFontSize(operation, value) {
    switch (operation) {
      case "set":
        textRef.current.style.fontSize = `${value}px`;
        break;
      case "increase":
        textRef.current.style.fontSize = `${currentFontSize() + value}px`;
        break;
      case "decrease":
        textRef.current.style.fontSize = `${currentFontSize() - value}px`;
        break;
      default:
        break;
    }

    onFontsize(textRef.current.style.fontSize);
  }

  function textTooSmall() {
    return new Promise((resolve) => {
      if (hideOnCalc) setHide(true);

      const growText = _.throttle(() => {
        if (currentFontSize() >= max) {
          changeFontSize("set", max);
          resolve();
          return;
        }

        if (
          elementSize().text.width < elementSize().container.width &&
          elementSize().text.height < elementSize().container.height
        ) {
          changeFontSize("increase", step);
          growText();
        } else {
          resolve();
        }
      }, throttle);
      growText();
    });
  }

  function textTooBig() {
    return new Promise((resolve) => {
      if (hideOnCalc) setHide(true);

      const shrinkText = _.throttle(() => {
        if (currentFontSize() <= min) {
          changeFontSize("set", min);
          resolve();
          return;
        }

        if (
          elementSize().text.width > elementSize().container.width ||
          elementSize().text.height > elementSize().container.height
        ) {
          changeFontSize("decrease", step);
          shrinkText();
        } else {
          resolve();
        }
      }, throttle);
      shrinkText();
    });
  }

  const adjustText = _.debounce(async () => {
    onStart();
    onFontsize(textRef.current.style.fontSize);
    await textTooSmall();
    await textTooBig();
    setHide(false);
    onEnd();
  }, 100);

  return (
    <StyContainer ref={containerRef} {...rest}>
      <DynamicText
        $opacity={hide ? 0 : 1}
        ref={textRef}
        style={{fontSize: `${start}px`}}
      >
        {children}
      </DynamicText>
    </StyContainer>
  );
}

Fitmeplz.defaultProps = {
  min: 1,
  max: 300,
  start: 100,
  throttle: 0,
  step: 1,
  hideOnMount: true,
  hideOnCalc: true,
  onStart: () => {},
  onEnd: () => {},
  onFontsize: () => {},
};

Fitmeplz.prototype = {
  min: PropTypes.number,
  max: PropTypes.number,
  start: PropTypes.number,
  throttle: PropTypes.number,
  step: PropTypes.number,
  hideOnMount: PropTypes.bool,
  hideOnCalc: PropTypes.bool,
  onStart: PropTypes.func,
  onEnd: PropTypes.func,
  onFontsize: PropTypes.func,
};

export default Fitmeplz;
