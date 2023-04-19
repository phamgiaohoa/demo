import {Block, Text} from '@components';
import Rating from '@components/Common/Rating';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/core';
import {height} from '@utils/responsive';
import I18n from 'i18n';
import React from 'react';
import {Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import Comment from '../Comment';
import RenderProgress from '../RenderProgress';
import styles from './styles';

const EvaluateProduct = ({data, isShowAll, item_id, hasCombo}) => {
  const navigation = useNavigation();
  const productDetails = useSelector(state => state.productDetails.data);
  const rCombo = useSelector(state => state.comboProductDetails.data);
  const dataDetails = hasCombo ? rCombo : productDetails;

  if (dataDetails?.rating?.average > 0) {
    return (
      <Block marginTop={8}>
        <Block padding={12} backgroundColor="white">
          <Text size={16} marginVertical={7} fontType="semibold">
            {I18n.t('evaluate.product')}
          </Text>
          <Block row alignCenter>
            <Block alignCenter justifyCenter marginRight={10}>
              <Text marginBottom={8} size={26} fontType="bold">
                {dataDetails.rating?.average}
              </Text>
              <Rating
                imageSize={13}
                startingValue={dataDetails?.rating?.average}
              />
              <Text marginTop={8}>
                {dataDetails?.rating?.count &&
                Object.values(dataDetails.rating?.count).length > 0
                  ? Object.values(dataDetails.rating?.count)?.reduce(
                      (total, item) => total + item,
                    )
                  : null}{' '}
                {I18n.t('evaluate.comment')}
              </Text>
            </Block>
            <Block
              alignSelf="center"
              width={1}
              marginRight={12}
              height={height * 0.1}
              backgroundColor="smoke"
            />
            <Block flex>
              {Object.values(dataDetails?.rating?.count).map((item, index) => (
                <RenderProgress
                  key={index}
                  item={item}
                  index={index}
                  hasCombo={hasCombo}
                />
              ))}
            </Block>
          </Block>
        </Block>
        <Block paddingHorizontal={12} paddingTop={16} backgroundColor="white">
          {data?.map((item, index) => (
            <Comment key={index} item={item} />
          ))}
          {isShowAll && (
            <Pressable
              style={styles.btnViewDetails}
              onPress={() =>
                navigation.navigate(routes.COMMENT_DETAILS, {item_id, hasCombo})
              }>
              <Text alignCenter size={13} color="blue" fontType="semibold">
                {I18n.t('evaluate.all_comments')}
                {' >'}
              </Text>
            </Pressable>
          )}
        </Block>
      </Block>
    );
  }

  return null;
};

export default EvaluateProduct;
