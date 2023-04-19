/* eslint-disable no-unused-vars */
import {Text} from '@components';
import actions from '@redux/actions';
import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {useField} from 'formik';
import React from 'react';
import {Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const ItemTab = ({item, setSearch, useSelectTab}) => {
  const dispatch = useDispatch();
  const config = useSelector(state => state.config?.data);
  const [selectTab, setSelectTab] = useSelectTab;
  const [provinceField, provinceMeta, provinceHelpers] = useField({
    name: 'province',
  });
  const [districtField, districtMeta, districtHelpers] = useField({
    name: 'district',
  });
  const [wardField, wardMeta, wardHelpers] = useField({
    name: 'ward',
  });

  const labelName =
    item.type === 'PROVINCE'
      ? provinceField.value?.title
      : item.type === 'DISTRICT'
      ? districtField.value?.title
      : wardField.value?.title;

  const _onSetTab = tab => {
    setSearch('');
    switch (tab) {
      case 'PROVINCE':
        setSelectTab('PROVINCE');
        if (provinceField.value) {
          provinceHelpers.setValue('');
          districtHelpers.setValue('');
          wardHelpers.setValue('');
          dispatch({
            type: actions.GET_LOCATION,
            params: {
              type: 'province',
            },
          });
        }
        break;
      case 'DISTRICT':
        provinceField.value && setSelectTab('DISTRICT');
        if (districtField.value) {
          districtHelpers.setValue('');
          wardHelpers.setValue('');
          dispatch({
            type: actions.GET_LOCATION,
            params: {
              type: 'district',
              province_code: provinceField.value.code,
            },
          });
        }
        break;
      case 'WARD':
        districtField.value && setSelectTab('WARD');
        break;
    }
  };

  return (
    <Pressable
      onPress={() => _onSetTab(item.type)}
      style={{
        ...styles.btnTab,
        borderBottomWidth: getSize.m(3),
        borderColor:
          selectTab === item.type
            ? config?.general_active_color
            : theme.colors.smoke,
      }}>
      <Text numberOfLines={1}>{labelName || item.label}</Text>
    </Pressable>
  );
};

export default ItemTab;
