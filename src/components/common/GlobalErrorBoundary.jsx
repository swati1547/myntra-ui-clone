import React from "react";

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    //  Log error to monitoring service
    console.error("Global Error Boundary caught an error:", error, errorInfo);

    // Example:
    // sendErrorToSentry(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h1>Something went wrong 😞</h1>
          <p>We’re working on fixing this. Please try refreshing.</p>
          <button onClick={this.handleReload} style={styles.button}>
            Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    padding: "0.625rem 1rem",
    marginTop: "0.75",
    cursor: "pointer",
  },
};

export default GlobalErrorBoundary;
