
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });

    // You could send to an error reporting service here
    // sendErrorToService(error, errorInfo);
  }

  private resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 space-y-4">
          <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
          <div className="text-sm text-gray-600 max-w-md overflow-auto">
            <p className="font-semibold">Error:</p>
            <pre className="bg-gray-100 p-2 rounded">
              {this.state.error?.message}
            </pre>
            {this.state.error?.stack && (
              <>
                <p className="font-semibold mt-2">Stack trace:</p>
                <pre className="bg-gray-100 p-2 rounded text-xs">
                  {this.state.error.stack}
                </pre>
              </>
            )}
          </div>
          <Button onClick={this.resetError} variant="destructive">
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
