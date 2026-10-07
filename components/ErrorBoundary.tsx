'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Suppress intrusive console noise while logging gracefully
    if (process.env.NODE_ENV !== 'production') {
      console.warn('ErrorBoundary captured section error:', error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full my-6 p-6 sm:p-8 rounded-2xl bg-[#1a1a1a]/90 border border-amber-500/30 backdrop-blur-md text-center flex flex-col items-center justify-center space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div className="max-w-md">
            <h3 className="text-lg font-bold text-white font-poppins">
              {this.props.fallbackTitle || 'Section Display Notice'}
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              {this.props.fallbackMessage ||
                'This section encountered a temporary display issue. The rest of the application remains fully functional.'}
            </p>
          </div>
          <button
            onClick={this.handleReset}
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-skin/20 hover:bg-skin/30 text-skin font-medium text-sm border border-skin/30 transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Section
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
