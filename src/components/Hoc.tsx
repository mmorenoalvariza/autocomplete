import React from "react";

type Props = {};
const Hoc = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return class ReturnHOC extends React.Component<P & Props> {
    render() {
      const newProps = {
        hi: "hello",
      };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
};

export default Hoc;
