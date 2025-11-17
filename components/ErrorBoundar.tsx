import React from 'react';

type State = {
  hasError: boolean;
  error?: Error | null;
};

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log full details to the console so you can inspect stack traces and component stack.
    // You can also send these to a logging endpoint.
    // eslint-disable-next-line no-console
    console.error('Unhandled error in React component:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, color: '#fff', background: '#111', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ maxWidth: 720 }}>
            <h2 style={{ color: '#ff6b6b', marginBottom: 8 }}>Something went wrong</h2>
            <pre style={{ whiteSpace: 'pre-wrap', color: '#f8f8f2', background: '#1e1e2a', padding: 12, borderRadius: 6 }}>
              {String(this.state.error || 'Unknown error')}
            </pre>
            <p style={{ color: '#94a3b8' }}>
              Open the browser console (F12) for the stack trace. Reload the page after you fix the error.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{ marginTop: 12, padding: '8px 14px', borderRadius: 6, border: 'none', background: '#4f46e5', color: 'white', cursor: 'pointer' }}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}
