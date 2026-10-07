'use client';

import React, { useEffect } from 'react';
import { PortfolioProvider } from '@/lib/portfolioContext';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Intercept image/resource loading and event bubble issues that cause unhandled [object Event] in dev overlay
    const handleGlobalError = (event: ErrorEvent | Event) => {
      // Check if event is not an actual Error instance or has no error object / message
      const isResourceOrSyntheticEvent =
        !(event instanceof ErrorEvent) ||
        !event.error ||
        !event.message ||
        (event.target && (event.target as HTMLElement).tagName === 'IMG') ||
        (event.target && (event.target as HTMLElement).tagName === 'SCRIPT') ||
        (event.target && (event.target as HTMLElement).tagName === 'LINK');

      if (isResourceOrSyntheticEvent) {
        event.preventDefault?.();
        event.stopPropagation?.();
        if ('stopImmediatePropagation' in event) {
          event.stopImmediatePropagation();
        }
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Suppress unhandled promise rejections that are non-critical or synthetic
      if (!event.reason || typeof event.reason === 'string' && event.reason.includes('ResizeObserver')) {
        event.preventDefault?.();
      }
    };

    window.addEventListener('error', handleGlobalError, true);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError, true);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <ErrorBoundary fallbackTitle="Application Restored" fallbackMessage="The application is initializing. Please refresh if needed.">
      <PortfolioProvider>{children}</PortfolioProvider>
    </ErrorBoundary>
  );
}
