import {AnimatedImage, Block, Icon, Text} from '@components';
import {theme} from '@theme';
import {convertCurrency} from '@utils/helper';
import {getSize} from '@utils/responsive';
import React from 'react';
import {Pressable, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {convertDataBonus, useActiveBonus, useAddBonus} from '../../helper';
import styles from './styles';

const ITEM_WIDTH = 85;
const ICON_SIZE = 26;

const ItemGift = ({
  item,
  color,
  marginLeft,
  backgroundColor,
  isPrice,
  onPress,
}) => {
  return (
    <Pressable style={{marginLeft, width: ITEM_WIDTH}} onPress={onPress}>
      <Block
        radius={5}
        padding={8}
        paddingBottom={15}
        borderWidth={2}
        borderColor={backgroundColor}>
        <Block alignCenter>
          <AnimatedImage
            style={styles.image}
            source={item?.picture}
            thumbnail={item?.thumbnail}
          />
        </Block>
        <Text numberOfLines={1} marginTop={5} size={11} color="black">
          {item?.title}
        </Text>
        {isPrice && (
          <Text numberOfLines={1} size={10} color="red">
            {convertCurrency(item?.price_buy)} đ
          </Text>
        )}
      </Block>

      <Block alignCenter height={ICON_SIZE / 2}>
        <Block
          style={{transform: [{translateY: getSize.m(-ICON_SIZE / 2)}]}}
          alignCenter
          justifyCenter
          width={ICON_SIZE}
          height={ICON_SIZE}
          radius={ICON_SIZE}
          borderWidth={3}
          borderColor="white"
          backgroundColor={backgroundColor}>
          <Icon type="AntDesign" name="check" size={12} color={color} />
        </Block>
      </Block>
    </Pressable>
  );
};

const ChooseBonus = ({
  data,
  productBonus,
  setProductBonus,
  containerStyles,
}) => {
  const {arr_gift, array_product_bonus, title, num_chose} = data || {};
  const config = useSelector(state => state.config.data);
  const newData = convertDataBonus(arr_gift, array_product_bonus);

  const _renderItem = (item, index) => {
    const isActive = useActiveBonus(productBonus, item);
    const marginLeft = index !== 0 ? 12 : 0;
    const color = isActive ? theme.colors.white : theme.colors.black;
    const backgroundColor = isActive
      ? config.general_active_color
      : theme.colors.background;

    const _onSelectGift = () => {
      const bonus = useAddBonus(productBonus, item, isActive, num_chose);
      setProductBonus(bonus);
    };

    return (
      <ItemGift
        key={index}
        item={item}
        color={color}
        marginLeft={marginLeft}
        backgroundColor={backgroundColor}
        isPrice={array_product_bonus?.length > 0}
        onPress={_onSelectGift}
      />
    );
  };

  return (
    <Block style={containerStyles}>
      <Block row alignCenter marginBottom={10} space="between">
        <Text flex size={16} fontType="semibold" numberOfLines={1}>
          {title}
        </Text>
        <Text marginLeft={8} fontType="semibold">
          {productBonus?.length || 0}/{num_chose}
        </Text>
      </Block>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {newData.map(_renderItem)}
      </ScrollView>
    </Block>
  );
};

export default ChooseBonus;
