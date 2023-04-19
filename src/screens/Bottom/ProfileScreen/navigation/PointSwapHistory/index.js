import {ListWrapper} from '@components';
import {PointHolder} from '@components/Common/PlaceHolder';
import actions, {_onUnmount} from '@redux/actions';
import I18n from 'i18n';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PointWrapper from '../../components/PointWrapper';
import {formatDate} from '../../helper';
import EmptyPoint from './components/EmptyPoint';
import InfoTotal from './components/InfoTotal';
import ItemPoint from './components/ItemPoint';

const PointSwapHistory = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());

  const user = useSelector(state => state.tokenUser.data);
  const {data, totalPage, isLoading, info} = useSelector(
    state => state.swapCommissionLog,
  );

  useEffect(() => {
    dispatch({
      type: actions.SWAP_COMMISSION_LOG,
      params: {
        user,
        search_date_begin: formatDate(dateStart),
        search_date_end: formatDate(dateEnd),
      },
    });

    return () => {
      dispatch({type: _onUnmount(actions.SWAP_COMMISSION_LOG)});
    };
  }, [dateEnd, dateStart, dispatch, user]);

  const _onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    setPage(1);
    dispatch({
      type: actions.SWAP_COMMISSION_LOG,
      params: {
        user,
        search_date_begin: formatDate(dateStart),
        search_date_end: formatDate(dateEnd),
      },
    });
  };

  const _loadMore = () => {
    if (page < totalPage) {
      setPage(page + 1);
      dispatch({
        type: actions.SWAP_COMMISSION_LOG,
        isLoadMore: true,
        params: {
          user,
          p: page + 1,
          search_date_begin: formatDate(dateStart),
          search_date_end: formatDate(dateEnd),
        },
      });
    }
  };

  const _renderInfo = () => {
    return <InfoTotal info={info} />;
  };

  return (
    <PointWrapper
      title={I18n.t('pointManagement.title')}
      dateStart={dateStart}
      dateEnd={dateEnd}
      setDateStart={setDateStart}
      setDateEnd={setDateEnd}
      renderFooter={_renderInfo}>
      <ListWrapper
        data={data}
        page={page}
        isLoading={isLoading}
        refreshing={refreshing}
        onRefresh={_onRefresh}
        onLoadMore={_loadMore}
        EmptyComponent={EmptyPoint}
        HolderComponent={PointHolder}>
        <ItemPoint />
      </ListWrapper>
    </PointWrapper>
  );
};

export default PointSwapHistory;
