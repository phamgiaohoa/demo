import {icons} from '@assets';
import {
  Block,
  CheckBox,
  FormContainer,
  FormInput,
  RadioButton,
  Text,
  TextInput,
} from '@components';
import I18n from 'i18n';
import moment from 'moment';
import React, {useRef} from 'react';
import {Image, Pressable} from 'react-native';
import styles from './styles';

const DATA = [
  {value: '0', label: I18n.t('personal.man')},
  {value: '1', label: I18n.t('personal.women')},
];

const FormEditUser = ({
  useFullName,
  usePhone,
  useEmail,
  useGender,
  useBirthday,
  useTogglePass,
}) => {
  const inputName = useRef();
  const inputOldPass = useRef();
  const inputNewPass = useRef();
  const inputRePass = useRef();
  const [fullName, setFullName] = useFullName;
  const [phone, setPhone] = usePhone;
  const [email] = useEmail;
  const [gender, setGender] = useGender;
  const [birthday, setIsDatePicker] = useBirthday;
  const [togglePass, setTogglePass] = useTogglePass;

  const _onClearInput = input => {
    input.current.clear();
    input.current.focus();
  };

  const _renderInputPass = (ref, title, nameInput) => {
    return (
      <Block marginBottom={10}>
        <Text>{title}</Text>
        <Block row>
          <FormInput
            isSecure
            setRef={ref}
            name={nameInput}
            style={styles.inputWrap}
            inputStyle={styles.input}
            containerStyle={styles.container}
            errorContainerStyle={styles.error}
          />
        </Block>
      </Block>
    );
  };

  return (
    <FormContainer>
      <Block padding={12} marginBottom={1} backgroundColor="smoke">
        <Text fontType="bold" size={16}>
          {I18n.t('personal.personal')}
        </Text>
      </Block>
      <Block>
        <Block backgroundColor="white" padding={12}>
          <Block marginBottom={10}>
            <Text>{I18n.t('personal.name')}</Text>
            <Block row>
              <TextInput
                setRef={inputName}
                style={styles.inputWrap}
                inputStyle={styles.input}
                containerStyle={styles.container}
                placeholder={I18n.t('personal.name')}
                value={fullName}
                onChangeText={text => setFullName(text)}
                iconRight={() => (
                  <Pressable
                    style={styles.btnClose}
                    onPress={() => _onClearInput(inputName)}>
                    <Image style={styles.iconClose} source={icons.close} />
                  </Pressable>
                )}
              />
            </Block>
          </Block>
          <Block marginBottom={10}>
            <Text>{I18n.t('personal.phone')}</Text>
            <Block row>
              <TextInput
                style={styles.inputWrap}
                inputStyle={styles.input}
                containerStyle={styles.container}
                placeholder={I18n.t('personal.phone')}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={text => setPhone(text)}
              />
            </Block>
          </Block>
          <Block marginBottom={10} style={styles.inputWrap}>
            <Text>Email</Text>
            <Text marginVertical={5} color="lightGray">
              {email}
            </Text>
          </Block>
          <Block marginBottom={10}>
            <Text>{I18n.t('personal.birth')}</Text>
            <Pressable
              onPress={() => setIsDatePicker(true)}
              style={styles.birthday}>
              <Text color="placeholder">
                {birthday
                  ? moment(birthday * 1000).format('DD/MM/YYYY')
                  : I18n.t('personal.not_update')}
              </Text>
            </Pressable>
          </Block>
          <RadioButton
            itemStyle={styles.radioBtn}
            data={DATA}
            selected={gender}
            setSelected={setGender}
          />
        </Block>
        <Block
          row
          alignCenter
          marginTop={15}
          padding={12}
          marginBottom={1}
          backgroundColor="white">
          <CheckBox
            title={I18n.t('personal.password')}
            value={togglePass}
            setValue={setTogglePass}
          />
        </Block>
        {togglePass && (
          <Block backgroundColor="white" padding={12}>
            {_renderInputPass(
              inputOldPass,
              I18n.t('personal.old_password'),
              'oldPass',
            )}
            {_renderInputPass(
              inputNewPass,
              I18n.t('personal.new_password'),
              'newPass',
            )}
            {_renderInputPass(
              inputRePass,
              I18n.t('personal.re_password'),
              'rePass',
            )}
          </Block>
        )}
      </Block>
    </FormContainer>
  );
};

export default FormEditUser;
