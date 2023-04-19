/* eslint-disable react-native/no-inline-styles */
import {Block, Text} from '@components';
import {theme} from '@theme';
import I18n from 'i18n-js';
import React from 'react';
import {FlatList, Image, Platform} from 'react-native';
import {useKeyboard} from 'react-native-keyboard-height';
import {useSelector} from 'react-redux';
import styles from './styles';

const Evaluate = () => {
  const expired = useSelector(state => state.orderCompletedeExpired.data);
  const [keyboardHeight] = useKeyboard();

  const _renderItem = (item, index) => {
    return (
      <Block
        key={index}
        row
        marginVertical={10}
        borderWidth={0.5}
        radius={5}
        padding={10}
        marginTop={10}
        borderColor={theme.colors.lightGray}>
        <Image
          source={{uri: item.item.picture}}
          resizeMode="contain"
          style={styles.image}
        />
        <Text marginLeft={6} fontType="bold">
          {item.item.title}
        </Text>
      </Block>
    );
  };
  return (
    <Block
      borderTopLeftRadius={10}
      borderTopRightRadius={10}
      marginBottom={Platform.OS === 'ios' ? keyboardHeight : 0}
      backgroundColor="white">
      <Block backgroundColor="white" padding={12}>
        <Text size={15} color="red" fontType="bold">
          {I18n.t('cart.paymentFailed')}
        </Text>
        <Text color="lightGray" fontType={'light'}>
          {I18n.t('cart.noteFailed')}
        </Text>

        <Block>
          <FlatList
            data={expired?.data}
            keyExtractor={(_, index) => String(index)}
            renderItem={_renderItem}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
          />
        </Block>
      </Block>
    </Block>
  );
};

export default Evaluate;
