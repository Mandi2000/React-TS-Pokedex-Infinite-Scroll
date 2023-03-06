import React from "react";

type ErrorBoundaryProps = {
    fallback: React.ReactNode;
    children: any;
  };
  
  export class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError() {
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        return this.props.fallback;
      }
  
      return this.props.children;
    }
  }
  