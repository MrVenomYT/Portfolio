'use client';

import React, { useEffect } from 'react';
import { PortfolioProvider } from '@/lib/portfolioContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Intercept image/resource loading error events that would otherwise bubble as non-Error '[object Event]' in Next dev overlay
    const handleGlobalError = (event: ErrorEvent) => {
      // If the error has no error object or message (typical for <img> or <link> resource 404s)
      if (!event.error && !event.message) {
        event.preventDefault();
      }
    };

    window.addEventListener('error', handleGlobalError, true);
    return () => {
      window.removeEventListener('error', handleGlobalError, true);
    };
  }, []);

  return <PortfolioProvider>{children}</PortfolioProvider>;
}
