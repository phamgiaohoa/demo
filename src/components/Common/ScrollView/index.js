import React, {Fragment} from 'react';
import {FlatList} from 'react-native';

const VirtualizedView = ({children, style, ...props}) => {
  return (
    <FlatList
      {...props}
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => 'dummy'}
      renderItem={null}
      ListHeaderComponent={() => <Fragment>{children}</Fragment>}
      showsVerticalScrollIndicator={false}
      style={style}
    />
  );
};

export default VirtualizedView;
