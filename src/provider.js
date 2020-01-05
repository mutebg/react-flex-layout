import React from "react";
import { Provider } from "./context";
import { createInitState } from "./utils";

const MQs = {
  xs: "screen and (max-width: 599px)",
  sm: "screen and (min-width: 600px) and (max-width: 959px)",
  md: "screen and (min-width: 960px) and (max-width: 1279px)",
  lg: "screen and (min-width: 1280px) and (max-width: 1919px)",
  xl: "screen and (min-width: 1920px) and (max-width: 5000px)"
};

export default class FlexProvider extends React.Component {
  constructor() {
    super();
    this.state = { mq: createInitState(MQs) };
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

  componentWillUnmount() {
    console.log("TODO: remove MQs listeners");
  }

  render() {
    return <Provider value={this.state.mq}>{this.props.children}</Provider>;
  }
}
