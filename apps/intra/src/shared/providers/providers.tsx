'use client';

import { DialogUtil } from '@hiarc-platform/ui';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps): React.ReactElement {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        mutationCache: new MutationCache({
          onSuccess: (data, variables, context, mutation) => {
            // Global automatic invalidation after successful mutations
            const shouldSkipInvalidation = mutation.meta?.skipInvalidation;
            const invalidateQueries = mutation.meta?.invalidateQueries;

            if (!shouldSkipInvalidation) {
              if (invalidateQueries) {
                // Selective invalidation based on meta
                const queries = Array.isArray(invalidateQueries)
                  ? invalidateQueries
                  : [invalidateQueries];
                queries.forEach((queryKey) => {
                  queryClient.invalidateQueries({ queryKey });
                });
              } else {
                // Default: invalidate all queries (can be refined later)
                queryClient.invalidateQueries();
              }
            }
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            retry: false,
          },
          mutations: {
            onError: (error: Error) => {
              DialogUtil.hideAllDialogs();
              DialogUtil.showServerError(error, '서버 오류가 발생했습니다.');
            },
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
