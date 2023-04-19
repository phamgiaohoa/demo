import {lottie} from '@assets';
import {Block} from '@components';
import {OrderHolder} from '@components/Common/PlaceHolder';
import Empty from '@screens/Common/Empty';
import {getSize} from '@utils/responsive';
import I18n from 'i18n';
import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import ItemOrder from '../ItemOrder';

const ListOrderStatus = ({is_status}) => {
  const order = useSelector(state => state.order.data);
  const {isLoading} = useSelector(state => state.order);
  const data = order?.filter(value => value.is_status === is_status);

  return (
    <Block flex backgroundColor="background" padding={12}>
      {isLoading && !data && <OrderHolder />}
      {!isLoading && !data?.length ? (
        <Empty
          content={I18n.t('orderManagementScreen.emptyText')}
          lottie={lottie.emptyOrder}
          style={{marginTop: getSize.m(-50)}}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(_, index) => String(index)}
          renderItem={({item}) => <ItemOrder item={item} />}
          ItemSeparatorComponent={() => <Block height={10} />}
        />
      )}
    </Block>
  );
};

export default ListOrderStatus;
