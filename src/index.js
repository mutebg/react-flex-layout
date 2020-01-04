import React from "react";
const FlexContext = React.createContext({});
const FlexContextProvider = FlexContext.Provider;

const MQs = {
  xs: "screen and (max-width: 599px)",
  sm: "screen and (min-width: 600px) and (max-width: 959px)",
  md: "screen and (min-width: 960px) and (max-width: 1279px)",
  lg: "screen and (min-width: 1280px) and (max-width: 1919px)",
  xl: "screen and (min-width: 1920px) and (max-width: 5000px)"
};

const initState = Object.keys(MQs).reduce((prev, key) => {
  const mq = MQs[key];
  let mql = window.matchMedia(mq);
  if (mql.matches) {
    prev.push(key);
  }
  return prev;
}, []);

const toUpperFirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const determinateProp = (prosp, type, sizes, def) => {
  const currentSize = sizes[0];
  if (!currentSize) {
    return def;
  }
  const value = prosp[type + toUpperFirst(currentSize)];
  return value || def;
};

export const FlexRow = ({ children, layout, align, gap, ...props }) => {
  const mq = React.useContext(FlexContext);

  const style = {
    display: "flex"
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

  return <div style={style}>{children}</div>;
};

const FLEX_FILL_CSS = {
  margin: 0,
  width: "100%",
  height: "100%",
  minWidth: "100%",
  minHeight: "100%",
  flex: "auto"
};

export const FlexItem = ({
  children,
  size,
  offset,
  fill,
  align,
  order,
  ...props
}) => {
  const mq = React.useContext(FlexContext);

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

  return <div style={style}>{children}</div>;
};

export class FlexProvider extends React.Component {
  constructor() {
    super();
    this.state = { mq: initState };
  }

  componentDidMount() {
    Object.keys(MQs).forEach(key => {
      const mq = MQs[key];
      let mql = window.matchMedia(mq);

      mql.addListener(e => {
        let newState = [];
        const mqState = this.state.mq;
        if (e.matches) {
          newState = [...mqState, key];
        } else {
          newState = mqState.filter(m => m !== key);
        }
        this.setState({
          mq: newState
        });
      });
    });
  }

  render() {
    return (
      <FlexContextProvider value={this.state.mq}>
        {this.props.children}
      </FlexContextProvider>
    );
  }
}
