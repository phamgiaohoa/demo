/* eslint-disable no-unused-vars */
import {Block, Text} from '@components';
import actions from '@redux/actions';
import {useField} from 'formik';
import React from 'react';
import {FlatList, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const ListLocation = ({setSearch, setIsCheckSelect, useSelectTab}) => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.location);
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

  const _onSelectItem = item => {
    let params;
    switch (selectTab) {
      case 'PROVINCE':
        provinceHelpers.setValue(item);
        setSelectTab('DISTRICT');
        params = {type: 'district', province_code: item.code};
        break;
      case 'DISTRICT':
        districtHelpers.setValue(item);
        setSelectTab('WARD');
        params = {type: 'ward', district_code: item.code};
        break;
      case 'WARD':
        wardHelpers.setValue(item);
        setIsCheckSelect(false);
        break;
    }
    dispatch({
      type: actions.GET_LOCATION,
      params,
    });
    setSearch('');
  };

  const _renderItem = ({item}) => {
    return (
      <Pressable onPress={() => _onSelectItem(item)}>
        <Block paddingVertical={8}>
          <Text>{item.title}</Text>
        </Block>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => String(index)}
      renderItem={_renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ListLocation;
