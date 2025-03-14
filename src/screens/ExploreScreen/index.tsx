import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {StatusBar} from 'react-native';
import {P, match} from 'ts-pattern';

import ErrorMessage from '@/components/ErrorMessage';
import LoadingIndicator from '@/components/LoadingIndicator';
import {StocksList, useStocksInfiniteQuery} from '@/features/stocks';
import {useSearch} from '@/hooks/useSearch';
import {RootStackScreenProps, RootStackScreens} from '@/types/navigation';

type ScreenProps = RootStackScreenProps<RootStackScreens.Explore>;

const ExploreScreen = () => {
  const navigation = useNavigation<ScreenProps['navigation']>();
  const {deferredSearchQuery} = useSearch({
    placeholder: 'Search Stocks',
    navigation,
  });
  const {
    isFetchNextPageError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    refetch,
    error,
    data,
  } = useStocksInfiniteQuery(deferredSearchQuery);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage && !!data?.length) {
      fetchNextPage();
    }
  };

  useLayoutEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setHidden(false);
  }, []);

  return match({isFetchNextPageError, isLoading, error, data})
    .with({isLoading: true}, () => (
      <LoadingIndicator message="Loading stocks..." />
    ))
    .with({isFetchNextPageError: false, error: P.nonNullable}, () => (
      <ErrorMessage onRetry={() => refetch()} />
    ))
    .with({data: P.nonNullable, isLoading: false}, ({data: _data}) => (
      <StocksList
        data={_data}
        hasNextPage={hasNextPage}
        onEndReached={handleEndReached}
        loadingMoreError={error?.message}
      />
    ))
    .otherwise(() => null);
};

export default ExploreScreen;
