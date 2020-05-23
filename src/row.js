import React from "react";
import { Context } from "./context";
import { determinateProp } from "./utils";
import { createCSS } from "./css";

export default ({
  children,
  layout,
  align,
  gap,
  style: customCSS,
  className = "",
  element = "div",
  innerRef = null,
  ...props
}) => {
  const mq = React.useContext(Context);

  const style = {
    display: "flex",
  };

  const defaultLayoyt = layout || null;
  const styleLayout = determinateProp(props, "layout", mq, defaultLayoyt);
  if (styleLayout) {
    style["flexFlow"] = styleLayout;
  }

  const defaultGap = gap || null;
  const styleGap = determinateProp(props, "gap", mq, defaultGap);
  if (styleGap) {
    style["gap"] = styleGap;
  }

  const defaultAlign = align || null;
  const styleAlign = determinateProp(props, "align", mq, defaultAlign);
  if (styleAlign) {
    const [mainAxis, crossAxis] = styleAlign.split(" ");

    // Main axis
    switch (mainAxis) {
      case "center":
        style["justifyContent"] = "center";
        break;
      case "space-around":
        style["justifyContent"] = "space-around";
        break;
      case "space-between":
        style["justifyContent"] = "space-between";
        break;
      case "space-evenly":
        style["justifyContent"] = "space-evenly";
        break;
      case "end":
      case "flex-end":
        style["justifyContent"] = "flex-end";
        break;
      case "start":
      case "flex-start":
      default:
        style["justifyContent"] = "flex-start"; // default main axis
        break;
    }

    // Cross-axis
    switch (crossAxis) {
      case "start":
      case "flex-start":
        style["alignItems"] = style["alignContent"] = "flex-start";
        break;
      case "center":
        style["alignItems"] = style["alignContent"] = "center";
        break;
      case "end":
      case "flex-end":
        style["alignItems"] = style["alignContent"] = "flex-end";
        break;
      case "space-between":
        style["alignContent"] = "space-between";
        style["alignItems"] = "stretch";
        break;
      case "space-around":
        style["alignContent"] = "space-around";
        style["alignItems"] = "stretch";
        break;
      case "baseline":
        style["alignContent"] = "stretch";
        style["alignItems"] = "baseline";
        break;
      case "stretch":
      default:
        style["alignItems"] = style["alignContent"] = "stretch"; // default cross axis
        break;
    }
  }

  const mdClassName = createCSS(style);

  const allProps = {
    className: (mdClassName + " " + className).trim(),
  };
  if (customCSS) {
    allProps["style"] = customCSS;
  }

  if (innerRef) {
    allProps["ref"] = innerRef;
  }

  const Element = element;

  return <Element {...allProps}>{children}</Element>;
};
