import {Block, Header, WebView} from '@components';
import React from 'react';

const InformationDetails = ({route}) => {
  const {data} = route.params;

  return (
    <Block flex backgroundColor="white">
      <Header title="Thông tin chi tiết" canGoBack />
      <Block flex padding={12} paddingBottom={20}>
        <WebView data={data} />
      </Block>
    </Block>
  );
};

export default InformationDetails;
