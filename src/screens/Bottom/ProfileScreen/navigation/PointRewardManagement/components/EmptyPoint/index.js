import {lottie} from '@assets';
import Empty from '@screens/Common/Empty';
import I18n from 'i18n';
import React from 'react';

const EmptyPoint = () => {
  return (
    <Empty
      lottie={lottie.commission}
      content={I18n.t('commission.empty')}
      contentMore={I18n.t('commission.emptyMore')}
    />
  );
};

export default EmptyPoint;
