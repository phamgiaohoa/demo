import {Block, Text} from '@components';
import {theme} from '@theme';
import I18n from 'i18n';
import React from 'react';
import {LogBox, Pressable} from 'react-native';
import styles from './styles';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const AlertBox = ({navigation, route}) => {
  const {
    title,
    content,
    handleConfirm,
    CustomContent,
    isConfirm = true,
    contentStyles,
    textStyles,
  } = route.params || {};

  const _onPress = (isBack = true) => {
    navigation.goBack();
    !isBack && handleConfirm();
  };

  return (
    <Pressable style={styles.container} onPress={_onPress}>
      <Pressable style={[styles.content, contentStyles]}>
        {CustomContent ? (
          CustomContent
        ) : (
          <Block>
            <Block paddingHorizontal={20} paddingVertical={25}>
              {title && (
                <Text center size={18} fontType="bold" marginBottom={12}>
                  {title}
                </Text>
              )}
              {content && (
                <Text style={textStyles} center>
                  {content}
                </Text>
              )}
            </Block>
            <Block height={1.5} backgroundColor={theme.colors.smoke} />
            <Block row alignCenter>
              <Pressable style={styles.btn} onPress={_onPress}>
                <Text>{I18n.t('alertBox.cancel')}</Text>
              </Pressable>
              {isConfirm && (
                <Block
                  height="100%"
                  width={1.5}
                  backgroundColor={theme.colors.smoke}
                />
              )}
              {isConfirm && (
                <Pressable style={styles.btn} onPress={() => _onPress(false)}>
                  <Text>{I18n.t('alertBox.confirm')}</Text>
                </Pressable>
              )}
            </Block>
          </Block>
        )}
      </Pressable>
    </Pressable>
  );
};

export default AlertBox;
