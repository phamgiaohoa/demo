/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {icons} from '@assets';
import {Block, Button, Text} from '@components';
import ImagePickerModal from '@components/Common/ImagePickerModal';
import {useImagePicker} from '@hooks';
import {CustomToast} from '@utils/helper';
import {getSize, width} from '@utils/responsive';
import {useField} from 'formik';
import React, {useEffect, useState} from 'react';
import {Image, Pressable} from 'react-native';
import styles from './styles';

const ITEM_SIZE = (width - 72) / 3;

const SelectPicture = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {picture, closeModal, openPicker, openCamera} = useImagePicker();
  const [field, meta, helper] = useField({
    name: 'picture_list',
  });

  useEffect(() => {
    setIsVisible(false);
  }, [closeModal]);

  useEffect(() => {
    if (picture) {
      helper.setValue([...meta.value, picture]);
    }
  }, [picture]);

  const _onCloseModal = () => setIsVisible(false);

  const _onOpenModal = () => {
    meta.value?.length === 5
      ? CustomToast('Giới hạn chỉ chọn được 5 tầm hình.')
      : setIsVisible(true);
  };

  const _renderItem = (item, index) => {
    const _onRemove = () => {
      if (meta.value?.length === 1) {
        helper.setValue([]);
      } else {
        const newData = meta.value?.filter((_, i) => i !== index);
        helper.setValue(newData);
      }
    };

    const _getUri = () => {
      if (typeof item === 'string') {
        return item;
      }
      return item?.uri || '';
    };

    return (
      <Pressable key={index} onPress={_onRemove} style={{margin: getSize.m(6)}}>
        <Image
          style={{width: ITEM_SIZE, height: ITEM_SIZE}}
          source={{uri: _getUri()}}
        />
        <Block absolute>
          <Image
            style={styles.iconRemove}
            source={icons.delete}
            resizeMode="contain"
          />
        </Block>
      </Pressable>
    );
  };

  return (
    <Block>
      {meta.value?.length ? (
        <Block
          row
          wrap
          radius={5}
          marginTop={10}
          marginVertical={12}
          backgroundColor="white">
          {meta.value?.map(_renderItem)}
          {meta.value?.length < 5 && (
            <Pressable onPress={_onOpenModal}>
              <Block
                justifyCenter
                alignCenter
                radius={5}
                width={ITEM_SIZE}
                height={ITEM_SIZE}
                margin={6}
                borderWidth={1}
                borderColor="yellow">
                <Image
                  style={styles.iconPlus}
                  source={icons.plus}
                  resizeMode="contain"
                />
              </Block>
            </Pressable>
          )}
        </Block>
      ) : (
        <Button
          title="Chụp 2 mặt chứng minh nhân dân"
          onPress={_onOpenModal}
          style={styles.btnWrapper}
        />
      )}

      <ImagePickerModal
        isVisible={isVisible}
        openCamera={openCamera}
        openPicker={openPicker}
        setIsVisible={setIsVisible}
        onBackdropPress={_onCloseModal}
      />
    </Block>
  );
};

export default SelectPicture;
