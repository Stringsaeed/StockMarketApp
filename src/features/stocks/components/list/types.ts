import {Stock} from '@/types/stocks';
import {VoidFunction} from '@/types/utils';

export interface StocksListProps {
  data: Stock[];
  onEndReached: VoidFunction;
  loadingMoreError?: string;
  hasNextPage: boolean;
}
