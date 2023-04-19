/* eslint-disable react-native/no-inline-styles */
import {Block, Header, Text} from '@components';
import React, {useState} from 'react';
import {Image, Pressable, StatusBar} from 'react-native';
import I18n from 'i18n';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {icons} from '@assets';
import {getSize} from '@utils/responsive';
import {CustomToast} from '@utils/helper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {DATE_START, DATE_END, getTimeForDate} from '../../helper';

const ChooseDateStartEnd = ({
  dateStart,
  dateEnd,
  onChangeStart,
  onChangeEnd,
}) => {
  const config = useSelector(state => state.config?.data);

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={[config?.general_active_color, config?.general_active_color]}>
      <Block row alignCenter space="between">
        <Pressable onPress={onChangeStart}>
          <Block marginLeft={16} paddingVertical={10}>
            <Text paddingVertical={6} color="white">
              {I18n.t('commission.date_begin')}
            </Text>
            <Text
              size={20}
              paddingVertical={6}
              color="white"
              fontType="semibold">
              {moment(dateStart).format('DD-MM-YYYY')}
            </Text>
          </Block>
        </Pressable>
        <Image
          style={{
            width: getSize.s(16),
            height: getSize.s(16),
            tintColor: 'white',
          }}
          source={icons.right_arrow}
          resizeMode="contain"
        />
        <Pressable onPress={onChangeEnd}>
          <Block marginRight={16} paddingVertical={10}>
            <Text paddingVertical={6} color="white">
              {I18n.t('commission.date_end')}
            </Text>
            <Text
              size={20}
              paddingVertical={6}
              color="white"
              fontType="semibold">
              {moment(dateEnd).format('DD-MM-YYYY')}
            </Text>
          </Block>
        </Pressable>
      </Block>
    </LinearGradient>
  );
};

const PointWrapper = ({
  title = '',
  dateStart = new Date(),
  dateEnd = new Date(),
  setDateStart,
  setDateEnd,
  renderFooter,
  children,
}) => {
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [typeDate, setTypeDate] = useState(DATE_START);

  const isDateStart = typeDate === DATE_START;

  const _onDateStart = () => {
    setIsDatePicker(true);
    setTypeDate(DATE_START);
  };

  const _onDateEnd = () => {
    setIsDatePicker(true);
    setTypeDate(DATE_END);
  };

  const _onConfirmDate = date => {
    setIsDatePicker(false);
    if (isDateStart) {
      getTimeForDate(date) <= getTimeForDate(dateEnd)
        ? setDateStart(date)
        : CustomToast('Chọn ngày bắt đầu nhỏ hơn ngày kết thúc');
    } else {
      getTimeForDate(date) >= getTimeForDate(dateStart)
        ? setDateEnd(date)
        : CustomToast('Chọn ngày kết thúc lớn hơn ngày bắt đầu');
    }
  };

  return (
    <Block flex backgroundColor="background">
      <StatusBar translucent barStyle="dark-content" />
      <Header light title={title} canGoBack />
      <ChooseDateStartEnd
        dateStart={dateStart}
        dateEnd={dateEnd}
        onChangeStart={_onDateStart}
        onChangeEnd={_onDateEnd}
      />
      {children}
      {renderFooter && renderFooter()}
      <DateTimePickerModal
        mode="date"
        locale="vi_VN"
        date={isDateStart ? dateStart : dateEnd}
        headerTextIOS={isDateStart ? 'Chọn ngày bắt đầu' : 'Chọn ngày kết thúc'}
        isVisible={isDatePicker}
        onConfirm={_onConfirmDate}
        onCancel={() => setIsDatePicker(false)}
      />
    </Block>
  );
};

export default PointWrapper;
