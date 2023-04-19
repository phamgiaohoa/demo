import {icons} from '@assets';
import {Block, ModalBox, Text} from '@components';
import I18n from 'i18n';
import React, {useEffect, useState} from 'react';
import {Image, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DATA from './DataSort';
import styles from './styles';

const Sort = React.memo(({setSort, onPress}) => {
  const {bottom} = useSafeAreaInsets();
  const [label, setLabel] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setLabel(DATA[0].label);
    setSort(DATA[0].value);
  }, [setSort]);

  const _onPress = item => {
    setIsVisible(false);
    setLabel(item.label);
    onPress(item);
  };

  const _renderOption = (item, index) => {
    const isSelect = item.label === label;

    return (
      <Pressable
        key={`Sort-${index}`}
        style={styles.row(isSelect)}
        onPress={() => _onPress(item)}>
        <Image
          style={styles.icon(isSelect)}
          source={isSelect ? icons.dot_circle : icons.circle}
        />
        <Text>{item.label}</Text>
      </Pressable>
    );
  };

  return (
    <Block flex>
      <Pressable style={styles.container} onPress={() => setIsVisible(true)}>
        <Image
          style={styles.iconMore}
          source={icons.sortBy}
          resizeMode="contain"
        />
        <Text>
          {I18n.t('categoryScreen.sort')}: {label}
        </Text>
      </Pressable>
      <ModalBox
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onBackdropPress={() => setIsVisible(false)}>
        <Block style={styles.modalContainer(bottom)}>
          <Block style={styles.headerModal}>
            <Pressable
              style={styles.btnClose}
              onPress={() => setIsVisible(false)}>
              <Image style={styles.iconClose} source={icons.close} />
            </Pressable>
            <Text center size={18} fontType="heavy">
              Sắp xếp theo
            </Text>
          </Block>
          {DATA.map(_renderOption)}
        </Block>
      </ModalBox>
    </Block>
  );
});

export default Sort;
