import {Block} from '@components';
import React from 'react';
import {Platform} from 'react-native';
import WebView from 'react-native-webview';

const WEBView = ({data, style, scrollEnabled = true}) => {
  return (
    <Block flex style={style}>
      <WebView
        androidLayerType="hardware"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        startInLoadingState={true}
        scalesPageToFit={false}
        useWebKit={true}
        originWhitelist={['*']}
        source={{
          baseUrl: '',
          html: `
          <html>
          <head>
            <meta name='viewport' content='width=device-width,initial-scale=1,maximum-scale=1'>
            ${styles}
          </head>
          <body> 
              ${data}
          </body>
          </html>`,
        }}
        injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
      />
    </Block>
  );
};

export default WEBView;

const fontFamily = Platform.select({
  ios: '-apple-system',
  android: 'Roboto',
});

const styles = `<style type="text/css">
  * {
    font-size: 14px !important;
    text-align: justify;
    line-height: 1.5;
    font-family: ${fontFamily} !important;
  }
  body {
    margin: 0 !important;
    padding: 0 !important;
  }
  img {
    max-width: 100%;
    height: auto;
    margin: 5px 5px 0 5px;
  }
  p, figure {
    padding: 0;
    margin: 0;
  }
</style>`;
