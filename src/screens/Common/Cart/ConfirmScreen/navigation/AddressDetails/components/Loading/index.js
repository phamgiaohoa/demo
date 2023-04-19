import {Block} from '@components';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';

const Loading = () => {
  const config = useSelector(state => state.config.data);
  return (
    <Block flex justifyCenter alignCenter>
      <ActivityIndicator size="large" color={config.general_active_color} />
    </Block>
  );
};

export default Loading;
