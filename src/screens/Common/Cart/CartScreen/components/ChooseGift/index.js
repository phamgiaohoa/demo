import {lottie} from '@assets';
import {Block, Text} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {convertCurrency} from '@utils/helper';
import {getSize, width} from '@utils/responsive';
import I18n from 'i18n';
import LottieView from 'lottie-react-native';
import React from 'react';
import {Image, Pressable, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import ContentGift from '../ContentGift';
import styles from './styles';

const ChooseGift = ({item}) => {
  const navigation = useNavigation();
  const config = useSelector(state => state.config.data);

  const isGift = item?.arr_gift?.length > 0;

  const _onGift = () => {
    navigation.navigate(routes.ALERT_BOX, {
      CustomContent: <ContentGift data={item} isGift={isGift} />,
      contentStyles: {
        width: width - 24,
      },
    });
  };

  if (!item?.arr_gift?.length && !item?.arr_include?.length) {
    return null;
  }

  if (item.gift_info?.length || item.include_info?.length) {
    const data = isGift ? item.gift_info : item.include_info;

    return (
      <Block marginTop={8}>
        <Block row alignCenter space="between">
          <Text fontType="semibold">
            {isGift ? I18n.t('cart.giftProduct') : I18n.t('cart.chooseBonus')}
          </Text>
          <Pressable onPress={_onGift}>
            <Text color={config.general_active_color}>
              {I18n.t('cart.changeGift')}
            </Text>
          </Pressable>
        </Block>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map((bonus, index) => {
            const marginLeft = index !== 0 ? 12 : 0;
            return (
              <Block
                key={index}
                marginLeft={marginLeft}
                padding={8}
                radius={5}
                marginTop={8}
                width={85}
                borderWidth={2}
                borderColor="background">
                <Block alignCenter>
                  <Image
                    style={{
                      width: getSize.s(45),
                      height: getSize.s(45),
                      borderRadius: getSize.s(5),
                    }}
                    source={{uri: bonus?.picture}}
                    resizeMode="contain"
                  />
                </Block>
                <Text marginTop={5} size={13} numberOfLines={2}>
                  {bonus?.title}
                </Text>
                {!isGift && (
                  <Text size={11} numberOfLines={1} color="red">
                    {convertCurrency(bonus?.price_buy)} đ
                  </Text>
                )}
              </Block>
            );
          })}
        </ScrollView>
      </Block>
    );
  }

  return (
    <Pressable onPress={_onGift} style={styles.container}>
      <Text size={13} color={config.general_active_color} fontType="light">
        {item?.arr_gift?.length
          ? I18n.t('cart.choseGift')
          : I18n.t('cart.chooseBonus')}
      </Text>
      <LottieView
        loop
        autoPlay
        resizeMode="contain"
        source={lottie.gift}
        style={styles.iconGift}
      />
    </Pressable>
  );
};

export default ChooseGift;
