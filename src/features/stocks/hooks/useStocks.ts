import {useInfiniteQuery} from '@tanstack/react-query';

import {polygonApi} from '@/services/polygon';
import {StockResponse, StockResponseSchema} from '@/types/stocks';

const queryFn = async ({
  pageParam,
  search,
}: {
  pageParam: string | null;
  search: string;
}) => {
  const url = pageParam || '/v3/reference/tickers';
  const params = {
    market: 'stocks',
    sort: 'ticker',
    active: true,
    order: 'asc',
    // here the limit is 100 so we make less requests when we search or load more
    limit: 100,
    ...(search ? {search} : {}),
  };

  const response = await polygonApi.get<StockResponse>(url, {params});
  return StockResponseSchema.parse(response.data);
};

export const useStocksInfiniteQuery = (search: string = '') => {
  return useInfiniteQuery({
    queryFn: ({pageParam}: {pageParam: string | null}) =>
      queryFn({pageParam, search}),
    select: data => data.pages.flatMap(page => page.results),
    getNextPageParam: lastPage => lastPage.next_url || null,
    initialPageParam: null as string | null,
    queryKey: ['stocks', search],
  });
};
