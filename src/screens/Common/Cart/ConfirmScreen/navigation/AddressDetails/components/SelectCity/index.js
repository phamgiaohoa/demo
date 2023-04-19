/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {icons} from '@assets';
import {Block, TextInput} from '@components';
import actions from '@redux/actions';
import {theme} from '@theme';
import {useField} from 'formik';
import I18n from 'i18n';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ItemTab from '../ItemTab';
import ListLocation from '../ListLocation';
import Loading from '../Loading';
import DataLocation from './DataLocation';
import styles from './styles';

const SelectCity = ({setIsCheckSelect}) => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.location);
  const [selectTab, setSelectTab] = useState('PROVINCE');
  const [search, setSearch] = useState('');
  const [provinceField, provinceMeta, provinceHelpers] = useField({
    name: 'province',
  });
  const [districtField, districtMeta, districtHelpers] = useField({
    name: 'district',
  });
  const [wardField, wardMeta, wardHelpers] = useField({
    name: 'ward',
  });

  useEffect(() => {
    provinceHelpers.setValue('');
    districtHelpers.setValue('');
    wardHelpers.setValue('');
  }, []);

  useEffect(() => {
    dispatch({
      type: actions.GET_LOCATION,
      params: {
        type: 'province',
      },
    });
  }, [dispatch]);

  const _onChangeSearch = keyword => {
    setSearch(keyword);
    dispatch({
      type: actions.SEARCH_LOCATION,
      keyword,
    });
  };

  return (
    <Block flex>
      <Block row alignCenter backgroundColor={theme.colors.smoke}>
        {DataLocation.map((item, index) => (
          <ItemTab
            key={index}
            item={item}
            setSearch={setSearch}
            useSelectTab={[selectTab, setSelectTab]}
          />
        ))}
      </Block>
      <Block flex backgroundColor="white" padding={12}>
        <TextInput
          style={styles.input}
          iconLeft={icons.search}
          containerStyle={styles.contentInput}
          placeholder={I18n.t('header.search')}
          placeholderTextColor={theme.colors.placeholder}
          value={search}
          onChangeText={_onChangeSearch}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <ListLocation
            setSearch={setSearch}
            setIsCheckSelect={setIsCheckSelect}
            useSelectTab={[selectTab, setSelectTab]}
          />
        )}
      </Block>
    </Block>
  );
};

export default SelectCity;
