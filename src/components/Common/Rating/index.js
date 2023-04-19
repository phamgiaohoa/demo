import React from 'react';
import {Rating} from 'react-native-elements';
import styles from './styles';

const Rate = React.memo(({imageSize, startingValue}) => {
  return (
    <Rating
      readonly
      imageSize={imageSize}
      fractions={1}
      startingValue={Number(startingValue)}
      style={styles.rating}
    />
  );
});

export default Rate;
