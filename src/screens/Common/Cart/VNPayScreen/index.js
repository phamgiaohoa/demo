import {Block, Header, Loading} from '@components';
import {reset} from '@navigation/RootNavigation';
import {routes} from '@navigation/routes';
import React, {useState} from 'react';
import WebView from 'react-native-webview';

const VNPayScreen = ({route}) => {
  const {uri} = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const _onNavigationStateChange = response => {
    setIsLoading(response.loading);
    if (response.url.includes('ResponseCode=00')) {
      reset(0, routes.SUCCESS_SCREEN);
    }
  };

  return (
    <Block isPaddingIos flex backgroundColor="white">
      <Header canGoBack title="Thanh toán qua VNPay" />
      <WebView
        source={{uri}}
        onNavigationStateChange={_onNavigationStateChange}
        showsVerticalScrollIndicator={false}
      />
      <Loading visible={isLoading} />
    </Block>
  );
};

export default VNPayScreen;
