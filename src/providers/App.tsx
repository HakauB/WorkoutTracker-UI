import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';

import { Button, Spin} from 'antd';
import { openNotification } from '../components/Notifications/Notifications';
import { AuthProvider } from '../lib/auth';
import { queryClient } from '../lib/react-query';

const ErrorFallback = () => {
    return (
        <div>
            <h1>Something went wrong</h1>
            <Button
                onClick={() => window.location.assign(window.location.origin)}
            >
                Go back to the homepage
            </Button>
        </div>
    );
}

type AppProviderProps = {
    children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <React.Suspense
            fallback={
                <Spin
                    size="large"
                    tip="Loading..."
                />
            }
        >
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <QueryClientProvider client={queryClient}>
                    {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
                    <AuthProvider>
                        <Router>
                            {children}
                        </Router>
                    </AuthProvider>
                </QueryClientProvider>
            </ErrorBoundary>
        </React.Suspense>
    )
}