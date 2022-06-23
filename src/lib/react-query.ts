import { AxiosError } from 'axios';
import { QueryClient, UseQueryOptions, UseMutationOptions, DefaultOptions } from 'react-query';

const queryConfig: DefaultOptions = {
    queries: {
        retry: false,
        refetchOnWindowFocus: false,
        useErrorBoundary: true,
    }
}

export const queryClient: QueryClient = new QueryClient({defaultOptions: queryConfig});