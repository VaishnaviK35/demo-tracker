import React, { Component } from 'react'

export default class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className=' w-full h-full grid place-items-center'>
          Something went wrong. Please contact IT support.
        </div>
      )
    }
    return this.props.children;
  }
}
