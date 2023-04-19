import {icons, lottie} from '@assets';
import {Block, Text} from '@components';
import {useRoute} from '@react-navigation/core';
import actions, {_onSuccess} from '@redux/actions';
import Empty from '@screens/Common/Empty';
import {theme} from '@theme';
import I18n from 'i18n';
import React from 'react';
import {FlatList, Image, Pressable} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const ListAddress = ({useSelectItem, setIsChangeList, onAdd, onEdit}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const user = useSelector(state => state.tokenUser.data);
  const config = useSelector(state => state.config?.data);
  const address = useSelector(state => state.address.data);
  const [selectItem, setSelectItem] = useSelectItem;

  const _onSetDefault = item => {
    dispatch({
      type: actions.UPDATE_ADDRESS,
      params: {user, id: item.id},
      body: {
        full_name: item.full_name,
        phone: item.phone,
        email: item.email,
        address: item.address,
        province: item.province,
        district: item.district,
        ward: item.ward,
        is_default: 1,
      },
    });
    setIsChangeList(prev => !prev);
  };

  const _onDelete = id => {
    if (user) {
      dispatch({
        type: actions.DELETE_ADDRESS,
        params: {
          user,
          id,
        },
      });
    } else {
      dispatch({
        type: _onSuccess(actions.GET_ADDRESS),
        data: [],
      });
    }
    setIsChangeList(prev => !prev);
  };

  const _keyExtractor = (_, index) => String(index);

  const _itemSeparator = () => (
    <Block height={1} backgroundColor={theme.colors.smoke} />
  );

  const _renderItem = ({item}) => {
    const isSelect = selectItem ? item?.id === selectItem?.id : false;
    const tintColor = isSelect ? theme.colors.green : theme.colors.placeholder;

    const _onEdit = () => {
      isSelect && setSelectItem(null);
      onEdit(item);
    };

    return (
      <Pressable onPress={() => setSelectItem(item)}>
        <Block row alignCenter marginVertical={15}>
          {!route.params?.isShow && (
            <Image
              style={{...styles.iconCheck, tintColor}}
              source={isSelect ? icons.dot_circle : icons.circle}
              resizeMode="contain"
            />
          )}
          <Block flex marginLeft={10}>
            <Text fontType="bold" size={15}>
              {item.full_name} - {item.phone}
            </Text>
            <Text style={styles.textAddress}>
              {item.address}, {item.ward_text}, {item.district_text},{' '}
              {item.province_text}
            </Text>
            {item.is_default === '1' && (
              <Block row alignCenter marginTop={10}>
                <Image
                  style={{...styles.iconDefault, ...styles.right}}
                  source={icons.flag}
                  resizeMode="contain"
                />
                <Text color={theme.colors.green}>
                  {' '}
                  {I18n.t('cart.Default_address')}
                </Text>
              </Block>
            )}
          </Block>
          <Menu>
            <MenuTrigger style={styles.menuTrigger}>
              <Image
                style={styles.iconMore}
                source={icons.more}
                resizeMode="contain"
              />
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.optionStyle}>
              {user && (
                <MenuOption
                  style={styles.bottom}
                  onSelect={() => _onSetDefault(item)}
                  text={I18n.t('cart.as_default')}
                />
              )}
              <MenuOption
                style={styles.bottom}
                onSelect={_onEdit}
                text={I18n.t('cart.edit')}
              />
              <MenuOption
                onSelect={() => _onDelete(item.id)}
                text={I18n.t('cart.delete')}
              />
            </MenuOptions>
          </Menu>
        </Block>
      </Pressable>
    );
  };

  const _renderBtnAdd = () => {
    if (!user && address?.length === 1) {
      return null;
    }

    return (
      <Pressable onPress={onAdd} style={styles.btnAdd}>
        <Text color={config.general_active_color}>
          {I18n.t('cart.new_address')}
        </Text>
        <Image
          style={styles.iconMore}
          source={icons.next}
          resizeMode="contain"
        />
      </Pressable>
    );
  };

  return (
    <Block flex>
      <Block backgroundColor="white">
        <Text padding={12} fontType="bold">
          {I18n.t('cart.delivery_addresses')}
        </Text>
        <FlatList
          data={address}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          contentContainerStyle={styles.content}
          ItemSeparatorComponent={_itemSeparator}
        />
      </Block>
      {_renderBtnAdd()}
      {!address?.length && (
        <Block flex justifyCenter alignCenter>
          <Empty lottie={lottie.location} content=" " />
        </Block>
      )}
    </Block>
  );
};

export default ListAddress;
