import {Stock} from '@/types/stocks';
import {VoidFunction} from '@/types/utils';

export interface StockItemProps {
  stock: Stock;
  onPress: VoidFunction;
  index: number;
}
