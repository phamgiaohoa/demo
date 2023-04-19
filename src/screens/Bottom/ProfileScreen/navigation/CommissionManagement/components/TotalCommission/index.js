import {Block, Button, FormContainer, Text} from '@components';
import actions from '@redux/actions';
import {convertCurrency} from '@utils/helper';
import {Formik} from 'formik';
import I18n from 'i18n';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Validation} from './../../validation';
import FormCommission from './../FormCommission';
import styles from './styles';
const INITIAL_VALUES = {
  num_commission: '',
};

const TotalCommission = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.tokenUser.data);
  const {info} = useSelector(state => state.commission);

  const _onSubmit = values => {
    dispatch({
      type: actions.SWAP_COMMISSION,
      params: {
        user,
      },
      body: {
        num_commission: Number(values.num_commission),
      },
    });
    values.num_commission = '';
  };

  return (
    <FormContainer>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={Validation}
        onSubmit={_onSubmit}>
        {({handleSubmit}) => (
          <FormContainer>
            <Block backgroundColor="white" padding={12}>
              <Block row alignCenter paddingVertical={6}>
                <Text>{I18n.t('commission.total_commission')}</Text>
                <Text color="red">
                  {convertCurrency(info?.total_commissions)} VNĐ
                </Text>
              </Block>
              <Block row alignCenter paddingVertical={6}>
                <Text>{I18n.t('commission.converted')}</Text>
                <Text color="red">
                  {convertCurrency(info?.swap_commmission)} VNĐ
                </Text>
              </Block>
              <Block row alignCenter paddingVertical={6}>
                <Text>{I18n.t('commission.current')}</Text>
                <Text color="red">
                  {convertCurrency(info?.user_commission)} Đ
                </Text>
              </Block>
            </Block>
            <Block backgroundColor="white" padding={12} marginTop={8}>
              <Block paddingVertical={6}>
                <Text size={18}>{I18n.t('commission.requirements')}</Text>
              </Block>
              <Text>{I18n.t('commission.note_swap_1')}</Text>
              <Block row alignCenter paddingVertical={6}>
                <Text>
                  {I18n.t('commission.note_swap_2')}
                  <Text color="red">{info?.wcoin2money}VNĐ</Text>
                </Text>
              </Block>
            </Block>
            <FormCommission />
            <Block backgroundColor="white">
              <Button
                title={I18n.t('commission.submit')}
                onPress={() => {
                  handleSubmit();
                }}
                style={styles.btnConfirm}
              />
            </Block>
          </FormContainer>
        )}
      </Formik>
    </FormContainer>
  );
};

export default TotalCommission;
