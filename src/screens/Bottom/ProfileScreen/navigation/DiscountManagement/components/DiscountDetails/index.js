import {icons} from '@assets';
import {Block, Button, Text} from '@components';
import Clipboard from '@react-native-community/clipboard';
import {useNavigation, useRoute} from '@react-navigation/core';
import {theme} from '@theme';
import {convertCurrency, CustomToast} from '@utils/helper';
import {height, width} from '@utils/responsive';
import I18n from 'i18n';
import moment from 'moment';
import React, {useState} from 'react';
import {Image, Pressable, ScrollView} from 'react-native';
import styles from './styles';

// type = payment, profile

const DiscountDetails = ({setIsVisible, datadetails}) => {
  const {type, onSetPromotionCode} = useRoute().params || {};
  const {goBack} = useNavigation();
  const [copiedText] = useState(datadetails.promotion_id);

  const copyCode = () => {
    Clipboard.setString(copiedText);
    CustomToast(I18n.t('coupon.coppy'));
  };

  return (
    <Block
      borderTopLeftRadius={10}
      borderTopRightRadius={10}
      height={height / 1.6}
      backgroundColor="white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block alignCenter justifyCenter paddingVertical={15}>
          <Text alignCenter fontType="bold" size={20} color="red">
            {I18n.t('coupon.decrease')}{' '}
            {datadetails?.value_type === '1'
              ? datadetails?.value
              : convertCurrency(datadetails?.value)}{' '}
            {datadetails?.value_type === '1' ? '%' : 'VNĐ'}
          </Text>
        </Block>
        <Block
          row
          alignCenter
          paddingHorizontal={12}
          paddingVertical={10}
          backgroundColor="background">
          <Block width={width * 0.3}>
            <Text size={13}> {I18n.t('coupon.code')}:</Text>
          </Block>
          <Block flex row alignCenter space="between">
            <Text size={13}>{datadetails.promotion_id}</Text>
            {type === 'profile' && (
              <Pressable onPress={copyCode}>
                <Image
                  source={icons.copy}
                  style={styles.iconCopy}
                  resizeMode="contain"
                />
              </Pressable>
            )}
          </Block>
        </Block>
        <Block row alignCenter paddingHorizontal={12} paddingVertical={10}>
          <Block width={width * 0.3}>
            <Text size={13}> {I18n.t('coupon.HSD')}:</Text>
          </Block>
          <Text size={13}>
            HSD:{'  '}{' '}
            {moment(datadetails.date_end * 1000).format('DD/MM/YYYY')}
          </Text>
        </Block>
        <Block
          row
          alignCenter
          backgroundColor="background"
          paddingHorizontal={12}
          paddingVertical={10}>
          <Text>{I18n.t('coupon.proviso')}:</Text>
        </Block>
        <Block
          row
          alignCenter
          paddingVertical={10}
          marginTop={10}
          marginHorizontal={12}>
          <Text marginLeft={5} size={13}>
            {datadetails.short}
          </Text>
        </Block>
      </ScrollView>
      <Block row alignCenter>
        {type === 'payment' && (
          <Block flex>
            <Button
              onPress={() => {
                setIsVisible(false);
                goBack();
                onSetPromotionCode &&
                  onSetPromotionCode(datadetails.promotion_id);
              }}
              style={styles.button}
              title={I18n.t('coupon.apply')}
            />
          </Block>
        )}
        <Block flex>
          <Button
            onPress={() => {
              setIsVisible(false);
            }}
            style={styles.button}
            title={I18n.t('coupon.cancel')}
            backgroundColor={theme.colors.gradient}
          />
        </Block>
      </Block>
    </Block>
  );
};

export default DiscountDetails;
