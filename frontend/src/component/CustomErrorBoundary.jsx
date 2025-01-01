import { Component } from "react";

export default class CustomErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error Occurred", error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Error Occurred</h1>
        </div>
      );
    }

    return this.props.children;
  }
}
