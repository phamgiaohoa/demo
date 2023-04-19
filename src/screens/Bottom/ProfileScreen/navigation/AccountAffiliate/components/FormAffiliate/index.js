/* eslint-disable react-hooks/exhaustive-deps */
import {Block, Button, FormContainer, FormInput, Text} from '@components';
import FormButton from '@components/Form/FormButton';
import SelectCity from '@screens/Common/Cart/ConfirmScreen/navigation/AddressDetails/components/SelectCity';
import {theme} from '@theme';
import I18n from 'i18n';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useSelector} from 'react-redux';
import SelectPicture from '../SelectPicture';
import styles from './styles';

const InputAffiliate = ({name, placeholder, ...rest}) => {
  return (
    <FormInput
      {...rest}
      name={name}
      placeholder={placeholder}
      style={styles.input}
      errorContainerStyle={styles.error}
      placeholderTextColor={theme.colors.placeholder}
    />
  );
};

const FormAffiliate = ({
  values,
  setFieldValue,
  setValues,
  handleSubmit,
  useSelectCity,
}) => {
  const {birthday, province, district, ward} = values;
  const [isSelectCity, setIsSelectCity] = useSelectCity;
  const [isDatePicker, setIsDatePicker] = useState(false);
  const userInfo = useSelector(state => state.userInfo.data);
  const {isLoading} = useSelector(state => state.signupAffiliate);

  useEffect(() => {
    setValues({
      full_name: userInfo.full_name || '',
      phone: userInfo.phone || '',
      email: userInfo.email || '',
      birthday: userInfo.birthday || '',
      address: userInfo.address || '',
      province: '',
      district: '',
      ward: '',
      bank_account_owner: '',
      bank_account_number: '',
      bank_name: '',
      bank_branch: '',
      picture_list: [],
    });
  }, [userInfo]);

  const _onConfirmDate = date => {
    setFieldValue('birthday', date);
    setIsDatePicker(false);
  };

  const _onSelectCity = () => setIsSelectCity(true);

  const _renderForm = () => {
    return (
      <Block flex padding={12}>
        <InputAffiliate
          name="full_name"
          placeholder="Tên công ty hoặc cá nhân"
        />
        <InputAffiliate
          name="phone"
          placeholder={I18n.t('cart.inputPhone')}
          keyboardType="phone-pad"
        />
        <InputAffiliate
          name="email"
          placeholder="Email"
          keyboardType="email-address"
        />
        <InputAffiliate
          name="address"
          placeholder={I18n.t('cart.inputAddress')}
        />
        <FormButton
          name="birthday"
          value={
            birthday
              ? moment(birthday / 1000).format('DD/MM/YYYY')
              : 'Ngày sinh'
          }
          buttonStyles={styles.button}
          titleStyles={styles.buttonTitle(birthday)}
          errContainerStyles={styles.error}
          onPress={() => setIsDatePicker(true)}
        />
        <FormButton
          isIconRight
          name="province"
          value={province ? province?.title : I18n.t('cart.province')}
          buttonStyles={styles.button}
          titleStyles={styles.buttonTitle(province)}
          errContainerStyles={styles.error}
          onPress={_onSelectCity}
        />
        <FormButton
          isIconRight
          name="district"
          value={district ? district?.title : I18n.t('cart.district')}
          buttonStyles={styles.button}
          titleStyles={styles.buttonTitle(district)}
          errContainerStyles={styles.error}
          onPress={_onSelectCity}
        />
        <FormButton
          isIconRight
          name="ward"
          value={ward ? ward?.title : I18n.t('cart.ward')}
          buttonStyles={styles.button}
          titleStyles={styles.buttonTitle(ward)}
          errContainerStyles={styles.error}
          onPress={_onSelectCity}
        />
        <InputAffiliate
          name="bank_account_owner"
          placeholder="Tên chủ tài khoản"
        />
        <InputAffiliate
          name="bank_account_number"
          placeholder="Số tài khoản ngân hàng"
        />
        <InputAffiliate name="bank_name" placeholder="Tên ngân hàng" />
        <InputAffiliate name="bank_branch" placeholder="Chi nhánh ngân hàng" />
        <SelectPicture />
      </Block>
    );
  };

  if (isSelectCity) {
    return <SelectCity setIsCheckSelect={setIsSelectCity} />;
  }
  return (
    <Block flex>
      <FormContainer>{_renderForm()}</FormContainer>
      <Block marginTop={10} padding={12}>
        <Text center size={12} color="placeholder" fontType="light">
          Cập nhật đầy đủ thông tin để gửi yêu cầu
        </Text>
        <Text
          center
          size={12}
          marginTop={5}
          color="placeholder"
          fontType="light">
          đăng ký tài khoản tiếp thị liến kết.
        </Text>
        <Button disabled={isLoading} title="Đăng ký" onPress={handleSubmit} />
      </Block>
      <DateTimePickerModal
        mode="date"
        locale="vi_VN"
        headerTextIOS={'Ngày sinh'}
        isVisible={isDatePicker}
        onConfirm={_onConfirmDate}
        onCancel={() => setIsDatePicker(false)}
      />
    </Block>
  );
};

export default FormAffiliate;
