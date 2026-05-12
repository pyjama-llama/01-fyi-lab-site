import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackContent?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ChartErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught chart error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallbackContent) {
        return <div className="chart-error-wrapper">{this.props.fallbackContent}</div>;
      }
      return (
        <div 
          className="chart-error-fallback" 
          style={{ 
            padding: '24px', 
            borderRadius: '12px', 
            background: 'var(--surface)', 
            border: '1px solid var(--border)',
            textAlign: 'center',
            color: 'var(--muted)'
          }}
        >
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Chart Data Unavailable</h3>
          <p style={{ margin: 0, fontSize: '14px' }}>
            We couldn't render this chart. Please try refreshing or check back later.
          </p>
        </div>
      );
    }

    return (
      <div className="chart-responsive-wrapper" style={{ width: '100%', overflowX: 'auto' }}>
        {this.props.children}
      </div>
    );
  }
}
