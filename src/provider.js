import React from "react";
import { Provider } from "./context";
import { createInitState } from "./utils";

const MQs = {
  xs: "screen and (max-width: 599px)",
  sm: "screen and (min-width: 600px) and (max-width: 959px)",
  md: "screen and (min-width: 960px) and (max-width: 1279px)",
  lg: "screen and (min-width: 1280px) and (max-width: 1919px)",
  xl: "screen and (min-width: 1920px) and (max-width: 5000px)",
};

export default class FlexProvider extends React.Component {
  eventRegistry = {};

  constructor(props) {
    super(props);
    let currentMQ = MQs;
    if (this.props.config) {
      const { queries, behaviour } = this.props.config;
      if (queries) {
        if (behaviour === "override") {
          currentMQ = queries;
        } else {
          currentMQ = { ...currentMQ, ...queries };
        }
      }
    }

    this.currentMQ = currentMQ;

    this.state = { mq: createInitState(currentMQ) };
  }

  componentDidMount() {
    Object.keys(this.currentMQ).forEach((key) => {
      const mq = this.currentMQ[key];
      let mql = window.matchMedia(mq);

      const listener = (e) => {
        let newState = [];
        const mqState = this.state.mq;
        if (e.matches) {
          newState = [...mqState, key];
        } else {
          newState = mqState.filter((m) => m !== key);
        }
        this.setState({
          mq: newState,
        });
      };
      mql.addListener(listener);
      this.eventRegistry = {
        key: { mql, listener },
      };
    });
  }

  componentWillUnmount() {
    // remove MQ listeners
    Object.keys(this.eventRegistry).forEach((key) => {
      const { mql, listener } = this.eventRegistry[key];
      mql.removeListener(listener);
    });
  }

  render() {
    return <Provider value={this.state.mq}>{this.props.children}</Provider>;
  }
}
