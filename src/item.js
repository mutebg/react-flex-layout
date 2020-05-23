import React from "react";
import { Context } from "./context";
import { determinateProp } from "./utils";
import { createCSS } from "./css";

const FLEX_FILL_CSS = {
  margin: 0,
  width: "100%",
  height: "100%",
  minWidth: "100%",
  minHeight: "100%",
  flex: "auto",
};

export default React.forwardRef(
  (
    {
      children,
      size,
      offset,
      fill,
      align,
      order,
      style: customCSS,
      className = "",
      element = "div",
      ...props
    },
    ref
  ) => {
    const mq = React.useContext(Context);

    // ['size', 'offset', 'align', 'order'].forEach(prop => {
    //   const defaultValue = props[prop] || null;
    //   const styleValue = determinateProp(props, prop, mq, defaultValue);
    // })

    let style = {};

    const defaultSize = size || null;
    const styleWidth = determinateProp(props, "size", mq, defaultSize);
    if (styleWidth) {
      style["flex"] = `1 1 ${styleWidth}`;
      if (styleWidth !== "auto") {
        style["maxWidth"] = styleWidth;
      }
    }

    const defaultOffset = offset || null;
    const styleOffset = determinateProp(props, "offset", mq, defaultOffset);
    if (styleOffset) {
      style["marginLeft"] = styleOffset;
    }

    const defaultAlign = align || null;
    const styleAlign = determinateProp(props, "align", mq, defaultAlign);
    if (styleAlign) {
      // Cross-axis
      switch (styleAlign) {
        case "start":
          style["alignSelf"] = "flex-start";
          break;
        case "end":
          style["alignSelf"] = "flex-end";
          break;
        default:
          style["alignSelf"] = styleAlign;
          break;
      }
    }

    const defaultOrder = order || null;
    const styleOrder = determinateProp(props, "order", mq, defaultOrder);
    if (styleOrder) {
      style["order"] = styleOrder;
    }

    if (fill) {
      style = { ...style, ...FLEX_FILL_CSS };
    }

    const mdClassName = createCSS(style);

    const allProps = {
      className: (mdClassName + " " + className).trim(),
    };
    if (customCSS) {
      allProps["style"] = customCSS;
    }
    const Element = element;

    return (
      <Element {...allProps} ref={ref} {...props}>
        {children}
      </Element>
    );
  }
);
