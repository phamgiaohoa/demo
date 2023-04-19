import {icons} from '@assets';
import {Block, ModalBox, Text} from '@components';
import actions from '@redux/actions';
import {theme} from '@theme';
import {height} from '@utils/responsive';
import moment from 'moment';
import React, {useState} from 'react';
import {FlatList, Image, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const ItemVoucherProduct = ({item}) => {
  const dispatch = useDispatch();
  const vouchers = useSelector(state => state.voucherProduct);
  const isSaved =
    vouchers?.find(({promotion_id}) => promotion_id === item?.promotion_id) ||
    false;

  const _onAddVoucher = voucher => {
    const payload = isSaved
      ? {
          type: actions.REMOVE_VOUCHER_PRODUCT,
          promotion_id: item?.promotion_id,
        }
      : {
          type: actions.ADD_VOUCHER_PRODUCT,
          voucher,
        };

    dispatch(payload);
  };

  return (
    <Block
      row
      padding={12}
      borderWidth={1}
      radius={10}
      borderColor="smoke"
      backgroundColor="background">
      <Image style={styles.imageProduct} source={icons.discount} />
      <Block flex space="around" paddingHorizontal={10}>
        <Text fontType="semibold" numberOfLines={1}>
          {item?.promotion_id}
        </Text>
        <Text size={13} color="placeholder">
          Số lượng: {item?.max_use}
        </Text>
        <Text size={13} color="placeholder">
          HSD: {moment(item.date_end * 1000).format('DD/MM/YYYY')}
        </Text>
      </Block>
      <Pressable style={styles.btnSave} onPress={() => _onAddVoucher(item)}>
        <Block
          alignCenter
          justifyCenter
          width={60}
          height={30}
          radius={30}
          borderWidth={1}
          borderColor="blue"
          backgroundColor={isSaved ? 'background' : 'blue'}>
          <Text
            size={10}
            fontType="semibold"
            color={!isSaved ? 'white' : 'blue'}>
            {isSaved ? 'Đã lưu' : 'Lưu'}
          </Text>
        </Block>
      </Pressable>
    </Block>
  );
};

const VoucherProduct = ({vouchers = []}) => {
  const [isVisible, setIsVisible] = useState(false);

  const _onOpenModal = () => setIsVisible(true);

  const _onCloseModal = () => setIsVisible(false);

  const _keyExtractor = (_item, index) => String(index);

  const _renderItem = ({item}) => {
    return <ItemVoucherProduct item={item} />;
  };

  const _renderSeparator = () => <Block marginBottom={12} />;

  if (!vouchers?.length) {
    return null;
  }

  return (
    <Block>
      <Pressable onPress={_onOpenModal}>
        <Block padding={12} marginBottom={8} backgroundColor="white">
          <Block row alignCenter space="between">
            <Block row alignCenter>
              <Image style={styles.iconVoucher} source={icons.voucher} />
              <Text color={theme.colors.placeholder}>Voucher sản phẩm</Text>
            </Block>
            <Image style={styles.iconRight} source={icons.right_arrow} />
          </Block>
        </Block>
      </Pressable>

      <ModalBox
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onBackdropPress={_onCloseModal}>
        <Block
          isPaddingIos
          height={height / 1.8}
          padding={12}
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          backgroundColor="white">
          <Text center size={16} marginBottom={12} fontType="semibold">
            Voucher sản phẩm
          </Text>
          <FlatList
            data={vouchers}
            renderItem={_renderItem}
            keyExtractor={_keyExtractor}
            ItemSeparatorComponent={_renderSeparator}
            showsVerticalScrollIndicator={false}
          />
        </Block>
      </ModalBox>
    </Block>
  );
};

export default VoucherProduct;
