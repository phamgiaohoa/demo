import {icons} from '@assets';
import {Block, Text} from '@components';
import Clipboard from '@react-native-community/clipboard';
import {CustomToast} from '@utils/helper';
import I18n from 'i18n';
import React, {useState} from 'react';
import {Image, Pressable, Share} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles';

const ReferralCode = () => {
  const userInfo = useSelector(state => state.userInfo.data);
  const _onShare = () => {
    Share.share({
      url: userInfo.link_invitaion,
    });
  };
  const _copyCode = () => {
    Clipboard.setString(userInfo?.code_invitaion);
    CustomToast(I18n.t('coupon.coppy'));
  };

  return (
    <Block>
      <Block
        row
        alignCenter
        borderBottomWidth={1}
        borderColor="smoke"
        paddingVertical={8}
        paddingHorizontal={12}
        space="between">
        <Block row alignCenter>
          <Image style={styles.iconReferral} source={icons.referral} />
          <Text>{I18n.t('profileScreen.referralCode')}</Text>
        </Block>
        <Pressable onPress={_onShare}>
          <Block
            radius={5}
            paddingVertical={8}
            paddingHorizontal={10}
            backgroundColor="smoke">
            <Text size={13} color="blue">
              Share link
            </Text>
          </Block>
        </Pressable>
      </Block>
      <Block
        row
        alignCenter
        borderBottomWidth={1}
        borderColor="smoke"
        paddingVertical={8}
        paddingHorizontal={12}
        space="between">
        <Block row alignCenter>
          <Image style={styles.iconReferral} source={icons.code_invitaion} />
          <Text>{I18n.t('profileScreen.inviation_code')}</Text>
        </Block>
        <Pressable onPress={_copyCode}>
          <Block
            radius={5}
            paddingVertical={8}
            paddingHorizontal={10}
            backgroundColor="smoke">
            <Text size={13} color="blue">
              {userInfo?.code_invitaion}
            </Text>
          </Block>
        </Pressable>
      </Block>
    </Block>
  );
};

export default ReferralCode;
