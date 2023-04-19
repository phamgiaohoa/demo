/* eslint-disable react-hooks/exhaustive-deps */
import {icons, lottie} from '@assets';
import {Block, Text, TextInput} from '@components';
import {Header} from '@components/';
import {navigate} from '@navigation/RootNavigation';
import {routes} from '@navigation/routes';
import actions, {_onUnmount} from '@redux/actions';
import Storage from '@utils/storage';
import I18n from 'i18n';
import _ from 'lodash';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, Image, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Empty from '../Empty';
import ItemHistory from './components/ItemHistory';
import ItemSearch from './components/ItemSearch';
import styles from './styles';

const SearchScreen = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const config = useSelector(state => state.config.data);
  const {data, isLoading} = useSelector(state => state.search);
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    Storage.getItem('@history').then(res => setHistory(res?.reverse() || []));
  }, [search]);

  useEffect(() => {
    return () => {
      dispatch({type: _onUnmount(actions.GET_SEARCH_SCREEN)});
    };
  }, [dispatch]);

  const _onClearInput = () => {
    setSearch('');
    inputRef.current.clear();
    dispatch({type: _onUnmount(actions.GET_SEARCH_SCREEN)});
  };

  const _removeHistory = () => {
    setHistory([]);
    Storage.removeItem('@history');
  };

  const _onDebounce = useCallback(
    _.debounce(keyword => {
      dispatch({
        type: actions.GET_SEARCH_SCREEN,
        params: {
          keyword,
        },
      });
      Storage.getItem('@history').then(res => {
        const newHistory = res ? [...res, keyword] : [keyword];
        const convertHistory = [...new Set(newHistory)];
        Storage.setItem('@history', JSON.stringify(convertHistory));
      });
    }, 1000),
    [],
  );

  const _onChangeSearch = keyword => {
    setSearch(keyword);
    dispatch({type: _onUnmount(actions.GET_SEARCH_SCREEN)});
    keyword && _onDebounce(keyword);
  };

  const _onSubmitEditing = () => {
    _onClearInput();
    navigate(routes.SEARCH_DETAILS_SCREEN, {search});
  };

  const _renderItem = ({item}) => (
    <ItemHistory item={item} setSearch={setSearch} setHistory={setHistory} />
  );

  const _renderLoading = () => (
    <Block marginTop={15}>
      <ActivityIndicator color={config.general_active_color} size="large" />
    </Block>
  );

  const _renderEmpty = () => (
    <Text center marginTop={15} fontType="semibold">
      {I18n.t('search.label')}
    </Text>
  );

  return (
    <Block flex backgroundColor="background">
      <Header title={I18n.t('search.searchHeader')} canGoBack />
      <Block flex padding={12} backgroundColor="white">
        <TextInput
          setRef={inputRef}
          returnKeyType="search"
          iconLeft={icons.search}
          style={styles.input}
          containerStyle={styles.contentInput}
          placeholder={I18n.t('search.search')}
          value={search}
          onChangeText={_onChangeSearch}
          onSubmitEditing={_onSubmitEditing}
          iconRight={() =>
            search !== '' && (
              <Pressable style={styles.btnClose} onPress={_onClearInput}>
                <Image
                  style={styles.iconClose}
                  source={icons.close}
                  resizeMode="contain"
                />
              </Pressable>
            )
          }
        />
        {search !== '' ? (
          isLoading ? (
            _renderLoading()
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={(item, index) => String(index)}
              renderItem={({item}) => <ItemSearch item={item} />}
              ListEmptyComponent={_renderEmpty}
            />
          )
        ) : history.length > 0 ? (
          <Block flex>
            <Block row alignCenter marginBottom={10} space="between">
              <Text size={16} fontType="semibold">
                {I18n.t('search.history')}
              </Text>
              <Pressable onPress={_removeHistory}>
                <Text color="blue"> {I18n.t('search.delete')}</Text>
              </Pressable>
            </Block>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={history}
              keyExtractor={(item, index) => String(index)}
              renderItem={_renderItem}
            />
          </Block>
        ) : (
          <Empty lottie={lottie.search} content=" " />
        )}
      </Block>
    </Block>
  );
};

export default SearchScreen;
