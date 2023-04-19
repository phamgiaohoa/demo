import {Block, Button, Header, Loading} from '@components';
import actions from '@redux/actions';
import {Formik} from 'formik';
import I18n from 'i18n';
import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch, useSelector} from 'react-redux';
import FormEditUser from './components/FormEditUser';
import styles from './styles';
import {Validation} from './validation';

const INITIAL_VALUES = {
  oldPass: '',
  newPass: '',
  rePass: '',
};

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.tokenUser.data);
  const userInfo = useSelector(state => state.userInfo.data);
  const isLoading = useSelector(state => state.userInfo.isLoading);
  const [fullName, setFullName] = useState(userInfo?.full_name);
  const [phone, setPhone] = useState(userInfo?.phone);
  const [email, setEmail] = useState(userInfo?.email);
  const [birthday, setBirthday] = useState(userInfo?.birthday);
  const [gender, setGender] = useState(userInfo?.gender);
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [togglePass, setTogglePass] = useState(false);

  const _onConfirmDate = date => {
    setBirthday(date / 1000);
    setIsDatePicker(false);
  };

  const _onConfirmInfo = () => {
    Keyboard.dismiss();
    const formData = new FormData();
    formData.append('full_name', fullName);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('birthday', birthday);
    formData.append('gender', gender);

    dispatch({
      type: actions.UPDATE_USER_INFORMATION,
      user,
      formData,
      goBack: false,
    });
  };

  const _onSubmit = values => {
    _onConfirmInfo();
    dispatch({
      type: actions.UPDATE_PASS_USER,
      params: {
        user,
      },
      body: {
        password_cur: values.oldPass,
        password: values.newPass,
        re_password: values.rePass,
      },
    });
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={Validation}
      onSubmit={_onSubmit}>
      {({handleSubmit}) => (
        <Block flex marginBottom={30} backgroundColor="background">
          <Header canGoBack title={I18n.t('personal.personal_info')} />
          <FormEditUser
            useFullName={[fullName, setFullName]}
            usePhone={[phone, setPhone]}
            useEmail={[email, setEmail]}
            useGender={[gender, setGender]}
            useBirthday={[birthday, setIsDatePicker]}
            useTogglePass={[togglePass, setTogglePass]}
          />
          <Block marginTop={12} backgroundColor="white">
            <Button
              disabled={isLoading}
              title={I18n.t('personal.save')}
              onPress={() => {
                togglePass ? handleSubmit() : _onConfirmInfo();
              }}
              style={styles.btnConfirm}
            />
          </Block>
          <Loading visible={isLoading} />
          <DateTimePickerModal
            mode="date"
            locale="vi_VN"
            headerTextIOS={'Ngày sinh'}
            isVisible={isDatePicker}
            onConfirm={_onConfirmDate}
            onCancel={() => setIsDatePicker(false)}
          />
        </Block>
      )}
    </Formik>
  );
};

export default EditProfile;
