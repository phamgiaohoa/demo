import {Block, Text} from '@components';
import {useRoute} from '@react-navigation/core';
import actions from '@redux/actions';
import {theme} from '@theme';
import React from 'react';
import {Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

// index = 0 ==> option1
// index = 1 ==> option2
// index = 2 ==> option3

const Options = ({hasCombo, options, setOptions}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.productOptions);
  const {arr_option} =
    useSelector(state => {
      return hasCombo
        ? state.comboProductDetails.data
        : state.productDetails.data;
    }) || {};

  const _onPress = (value, curIndex) => {
    let arrOption = options;
    arrOption[curIndex] = arrOption[curIndex] === value ? '' : value;
    setOptions(arrOption);
    dispatch({
      type: actions.GET_PRODUCT_OPTION,
      params: {
        item_id: route.params?.item_id,
        option1: arrOption[0],
        option2: arrOption[1],
        option3: arrOption[2],
      },
    });
  };

  return arr_option?.map((item, iOption) => {
    const items = item.value && Object.keys(item.value);
    const convert = data ? Object.values(data)[iOption] : null;
    const optionCheck = convert ? Object.keys(convert.value) : [];
    const option = options[iOption];

    return (
      <Block key={iOption} marginTop={20}>
        <Text>
          {item.title}: <Text fontType="semibold">{option}</Text>
        </Text>
        <Block row alignCenter wrap>
          {items.map((value, index) => {
            const isOpacity = optionCheck?.find(color => color === value);
            const opacity = !optionCheck?.length ? 1 : isOpacity ? 1 : 0.3;
            const isDisable = optionCheck?.length && !isOpacity;

            const isSelect = value === option;
            const backgroundColor = isSelect ? 'white' : theme.colors.smoke;
            const borderColor = isSelect ? theme.colors.red : 'white';

            return (
              <Pressable
                key={index}
                disabled={isDisable}
                onPress={() => _onPress(value, iOption)}
                style={{
                  ...styles.block,
                  backgroundColor,
                  borderColor,
                  opacity,
                }}>
                <Text>{value}</Text>
              </Pressable>
            );
          })}
        </Block>
      </Block>
    );
  });
};

export default Options;
