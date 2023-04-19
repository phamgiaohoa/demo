import {icons} from '@assets';
import {Block, ModalBox, Text} from '@components';
import I18n from 'i18n';
import React, {useRef, useState} from 'react';
import {Image, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ButtonFilter from '../ButtonFilter';
import FilterBox from '../FilterBox';
import InputPrice from '../InputPrice';
import DataPrice from './DataPrice';
import DataRating from './DataRating';
import styles from './styles';

const Filter = React.memo(({useRating, usrPrice, onPress}) => {
  const inputMin = useRef();
  const inputMax = useRef();
  const {bottom} = useSafeAreaInsets();
  const [rating, setRating] = useRating || [];
  const [price, setPrice] = usrPrice || [];
  const [isInput, setIsInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);

  const _onClearInput = () => {
    inputMin.current?._inputElement?.blur();
    inputMax.current?._inputElement?.blur();
    setIsInput(false);
    setError(null);
  };

  const _onBlur = () => {
    const min = inputMin.current.getRawValue() || '0';
    const max = inputMax.current.getRawValue() || '10000000';
    if (max > min) {
      _onClearInput();
      setPrice({...price, min: String(min), max: String(max)});
    } else {
      setError('Giá tối đa không thể thấp hơn giá tối thiểu');
    }
  };

  const _onReset = () => {
    setRating(null);
    setPrice(null);
  };

  const _onSelectStar = (value, index) => {
    _onClearInput();
    const isCheck = index === rating?.index;
    const newValue = isCheck ? null : {index, value: value.data};
    setRating(newValue);
  };

  const _onSelectPrice = (value, index) => {
    _onClearInput();
    const isCheck = index === price?.index;
    const newValue = isCheck ? null : {index, min: value.min, max: value.max};
    setPrice(newValue);
  };

  const _onConfirm = () => {
    setIsVisible(false);
    onPress();
  };

  return (
    <Block>
      <Pressable style={styles.btnFilter} onPress={() => setIsVisible(true)}>
        <Image
          style={styles.filter}
          source={icons.filter}
          resizeMode="contain"
        />
        <Text marginLeft={5}> {I18n.t('categoryScreen.filter')}</Text>
      </Pressable>
      <ModalBox
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onBackdropPress={() => setIsVisible(false)}>
        <Block style={styles.container(bottom)}>
          <Block style={styles.headerModal}>
            <Pressable
              style={styles.btnClose}
              onPress={() => setIsVisible(false)}>
              <Image
                style={styles.iconClose}
                source={icons.close}
                resizeMode="contain"
              />
            </Pressable>
            <Text center size={18} fontType="heavy">
              {I18n.t('categoryScreen.detailed_filters')}
            </Text>
          </Block>
          <FilterBox
            isIcon
            label={I18n.t('categoryScreen.evaluate')}
            data={DataRating}
            itemSelect={rating?.index}
            onPress={_onSelectStar}
          />
          <Block height={1.5} backgroundColor="smoke" marginTop={10} />
          <FilterBox
            label={I18n.t('categoryScreen.price_selection')}
            data={DataPrice}
            itemSelect={price?.index}
            onPress={_onSelectPrice}
          />
          <Text center marginBottom={10}>
            {I18n.t('categoryScreen.note')}
          </Text>
          <Block row alignCenter space="between" paddingHorizontal={15}>
            <InputPrice
              inputRef={inputMin}
              placeholder="0"
              value={price?.min}
              onChangeText={text => setPrice({...price, min: text})}
              onFocus={() => setIsInput(true)}
            />
            <Block
              width={10}
              height={2}
              marginHorizontal={5}
              backgroundColor="black"
            />
            <InputPrice
              inputRef={inputMax}
              placeholder="10000000"
              value={price?.max}
              onChangeText={text => setPrice({...price, max: text})}
              onFocus={() => setIsInput(true)}
            />
          </Block>
          {error && (
            <Text marginTop={5} color="red">
              {error}
            </Text>
          )}
          <ButtonFilter
            isInput={isInput}
            onBlur={_onBlur}
            onReset={_onReset}
            onConfirm={_onConfirm}
          />
        </Block>
      </ModalBox>
    </Block>
  );
});

export default Filter;
