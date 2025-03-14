import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        gcTime: Infinity,
        retry: false,
      },
    },
  });

export function createQueryWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({children}: {children: React.ReactNode}) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
