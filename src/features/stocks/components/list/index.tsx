import {ListRenderItemInfo, MasonryFlashList} from '@shopify/flash-list';
import {useCallback} from 'react';

import ErrorMessage from '@/components/ErrorMessage';
import LoadingIndicator from '@/components/LoadingIndicator';
import {Stock} from '@/types/stocks';

import {StockItem} from '../list-item';

import {listStyles as styles} from './styles';
import {StocksListProps} from './types';

export const StocksList = ({
  loadingMoreError,
  onEndReached,
  hasNextPage,
  data,
}: StocksListProps) => {
  const renderItem = useCallback(({index, item}: ListRenderItemInfo<Stock>) => {
    return <StockItem stock={item} onPress={() => {}} index={index} />;
  }, []);

  const renderFooter = useCallback(() => {
    if (!hasNextPage) {
      return null;
    }
    if (loadingMoreError) {
      return <ErrorMessage onRetry={onEndReached} />;
    }
    return <LoadingIndicator size="small" message="Loading more stocks..." />;
  }, [hasNextPage, loadingMoreError, onEndReached]);

  return (
    <MasonryFlashList
      data={data ?? []}
      keyExtractor={(item, index) => `${item.ticker}-${index}`}
      renderItem={renderItem}
      estimatedItemSize={104}
      contentContainerStyle={styles.listContent}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.2}
      ListFooterComponent={renderFooter}
      numColumns={2}
      testID="stocks-list"
      contentInsetAdjustmentBehavior="automatic"
    />
  );
};
