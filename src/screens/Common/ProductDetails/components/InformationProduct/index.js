import {Block, Text, WebView} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/native';
import I18n from 'i18n';
import React from 'react';
import {Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const InformationProduct = ({content, isShowMore = true}) => {
  const navigation = useNavigation();

  return (
    <Block padding={12} paddingTop={16} height={300} backgroundColor="white">
      <Text size={16} marginBottom={16} fontType="semibold">
        {I18n.t('productDetails.productInformation')}{' '}
      </Text>
      <WebView scrollEnabled={!isShowMore} data={content} />
      <LinearGradient
        colors={['rgba(250,250,250,0.5)', 'rgba(255,255,255,1)']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.linearGradient}
      />
      {isShowMore && (
        <Pressable
          style={styles.btnViewDetails}
          onPress={() =>
            navigation.navigate(routes.INFORMATION_DETAILS, {data: content})
          }>
          <Text alignCenter size={13} color="blue" fontType="semibold">
            {I18n.t('productDetails.seeDetails')}
            {'  >'}
          </Text>
        </Pressable>
      )}
    </Block>
  );
};

export default InformationProduct;
