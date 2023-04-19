import {Block, Header} from '@components';
import {CategoryHolder} from '@components/Common/PlaceHolder';
import actions from '@redux/actions';
import I18n from 'i18n';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LeftBox from './components/LeftBox';
import RightBox from './components/RightBox';

const CategoryScreen = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.category.isLoading);
  const [parentId, setParentId] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    dispatch({
      type: actions.GET_GROUP_CATEGORY,
    });
  }, [dispatch]);

  return (
    <Block flex>
      <Header title={I18n.t('categoryScreen.label')} />

      {isLoading ? (
        <CategoryHolder />
      ) : (
        <Block flex row>
          <LeftBox setParentId={setParentId} setTitle={setTitle} />
          <RightBox parentId={parentId} title={title} />
        </Block>
      )}
    </Block>
  );
};

export default CategoryScreen;
