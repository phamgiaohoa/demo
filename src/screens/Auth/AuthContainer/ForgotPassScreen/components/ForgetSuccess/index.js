import {icons} from '@assets';
import {Block, Button, Text} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/core';
import I18n from 'i18n';
import React from 'react';
import {Image} from 'react-native';
import styles from './styles';

const ForgetSuccess = ({email}) => {
  const navigation = useNavigation();
  return (
    <Block flex padding={12} marginTop={12} backgroundColor="background">
      <Block flex>
        <Image style={styles.iconCheck} source={icons.check_mark} />
        <Text center color="green">
          {I18n.t('forgetPass.sentEmail')}
        </Text>
        <Block row marginVertical={15}>
          <Block
            width={8}
            height={8}
            radius={8}
            marginTop={5}
            marginRight={8}
            backgroundColor="red"
          />
          <Block flex>
            <Text color="placeholder">
              {I18n.t('forgetPass.tutorial1')} {email}.{' '}
              {I18n.t('forgetPass.tutorial2')}
            </Text>
          </Block>
        </Block>
        <Block row marginBottom={10}>
          <Block
            width={8}
            height={8}
            radius={8}
            marginTop={5}
            marginRight={8}
            backgroundColor="red"
          />
          <Block flex>
            <Text color="placeholder">{I18n.t('forgetPass.warning')}</Text>
          </Block>
        </Block>
      </Block>
      <Button
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: routes.BOTTOM_TAB}],
          });
        }}
        style={styles.button}
        title={I18n.t('forgetPass.continueCart')}
      />
    </Block>
  );
};

export default ForgetSuccess;
