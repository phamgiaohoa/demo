import {Block, Button, Header, Loading} from '@components';
import actions from '@redux/actions';
import {Formik} from 'formik';
import I18n from 'i18n';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FormAddress from './components/FormAddress';
import ListAddress from './components/ListAddress';
import SelectCity from './components/SelectCity';
import {getAddAddress} from './helper';
import styles from './styles';
import validation from './validation';

const INITIAL_VALUE = {
  full_name: '',
  phone: '',
  email: '',
  address: '',
  province: '',
  district: '',
  ward: '',
  is_default: 1,
};

const AddressDetails = ({navigation, route}) => {
  const {address, isShow, onSetAddress} = route.params || {};
  const dispatch = useDispatch();
  const user = useSelector(state => state.tokenUser.data);
  const isLoading = useSelector(state => state.address.isLoading);
  const [isChangeList, setIsChangeList] = useState(false);
  const [isCheckList, setIsCheckList] = useState(true);
  const [isCheckSelect, setIsCheckSelect] = useState(false);
  const [idAddress, setIdAddress] = useState('');
  const [selectItem, setSelectItem] = useState(address);

  useEffect(() => {
    user &&
      dispatch({
        type: actions.GET_ADDRESS,
        params: {user},
      });
  }, [dispatch, user, isCheckList, isChangeList]);

  const _onGoBack = () => {
    if (isCheckSelect) {
      return setIsCheckSelect(false);
    }
    if (isCheckList) {
      return navigation.goBack();
    }
    setIsCheckList(true);
  };

  const _onAdd = handleReset => {
    setIsCheckList(false);
    setIdAddress('');
    handleReset();
  };

  const _onEdit = (item, setValues, handleReset) => {
    handleReset();
    setIsCheckList(false);
    setIdAddress(item.id);
    setValues({
      full_name: item.full_name,
      phone: item.phone,
      email: item.email,
      address: item.address,
      province: {code: item.province, title: item.province_text},
      district: {code: item.district, title: item.district_text},
      ward: {code: item.ward, title: item.ward_text},
      is_default: Number(item.is_default),
    });
  };

  const _onSubmitList = () => {
    onSetAddress(selectItem);
    navigation.goBack();
  };

  const _onSubmitForm = values => {
    idAddress ? _handleEdit(values) : _handleAdd(values);
  };

  const _handleAdd = values => {
    dispatch(getAddAddress(user, values));
    setIsCheckList(true);
  };

  const _handleEdit = values => {
    dispatch({
      type: actions.UPDATE_ADDRESS,
      params: {
        user,
        id: idAddress,
      },
      body: {
        full_name: values.full_name,
        phone: values.phone,
        email: values.email,
        address: values.address,
        province: values.province.code,
        district: values.district.code,
        ward: values.ward.code,
        is_default: values.is_default,
      },
    });
    setIsCheckList(true);
    onSetAddress({
      id: idAddress,
      full_name: values.full_name,
      phone: values.phone,
      email: values.email,
      address: values.address,
      province: values.province.code,
      province_text: values.province.title,
      district: values.district.code,
      district_text: values.district.title,
      ward: values.ward.code,
      ward_text: values.ward.title,
      is_default: values.is_default,
    });
  };

  const _renderButton = props => {
    if (isShow && isCheckList) {
      return null;
    }

    return (
      <Block style={styles.btnConfirmWrap}>
        <Button
          onPress={() => (isCheckList ? _onSubmitList() : props.handleSubmit())}
          style={styles.button}
          title={I18n.t('cart.addressShip')}
        />
      </Block>
    );
  };

  const _renderContent = props => {
    if (isCheckSelect) {
      return <SelectCity setIsCheckSelect={setIsCheckSelect} />;
    }

    return (
      <Block flex>
        {isCheckList ? (
          <ListAddress
            useSelectItem={[selectItem, setSelectItem]}
            setIsChangeList={setIsChangeList}
            onAdd={() => _onAdd(props.handleReset)}
            onEdit={item => _onEdit(item, props.setValues, props.handleReset)}
          />
        ) : (
          <FormAddress setIsCheckSelect={setIsCheckSelect} />
        )}
        {_renderButton(props)}
      </Block>
    );
  };

  return (
    <Formik
      initialValues={INITIAL_VALUE}
      validationSchema={validation}
      onSubmit={_onSubmitForm}>
      {props => (
        <Block flex>
          <Header
            canGoBack
            title={I18n.t('cart.formAddress')}
            onGoBack={_onGoBack}
          />
          {_renderContent(props)}
          <Loading visible={isLoading} />
        </Block>
      )}
    </Formik>
  );
};

export default AddressDetails;
