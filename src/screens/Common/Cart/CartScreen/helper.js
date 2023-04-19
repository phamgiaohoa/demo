import actions, {_onSuccess} from '@redux/actions';
import {CustomToast} from '@utils/helper';

export const useActiveBonus = (array = [], item) => {
  const bonus = array?.find(({item_id}) => item_id === item?.item_id);

  return Boolean(bonus);
};

export const useAddBonus = (
  array = [],
  item = null,
  isSelect = false,
  limitAdd = 0,
) => {
  if (isSelect) {
    return array?.filter(({item_id}) => item_id !== item?.item_id);
  } else {
    if (array?.length === limitAdd) {
      CustomToast(`Bạn chỉ được chọn tối đa ${limitAdd} lần`);
      return array;
    }

    return array?.length ? [...array, item] : [item];
  }
};

export const useComboInfo = (array = [], isComboGift = true) => {
  const newArr = array?.length ? array?.map(({item_id}) => item_id) : [];
  const str = newArr?.length > 1 ? newArr?.join(',') : `${newArr[0]}`;
  const bonus = newArr?.length ? str : '0';
  const result = isComboGift ? {gift_id: bonus} : {include_id: bonus};
  return JSON.stringify(result);
};

export const getDispatchApplyCombo = ({
  user,
  item_id,
  quantity,
  option_id,
  combo_info,
  cart,
  itemBonus,
}) => {
  if (user) {
    return {
      type: actions.UPDATE_CART,
      params: {user},
      body: {
        item_id,
        quantity,
        option_id,
        combo_info,
      },
    };
  } else {
    const data = cart?.map(value => {
      const isActive = value?.item_id === item_id;
      return {
        ...value,
        combo_info: isActive ? JSON.parse(combo_info) : value?.combo_info,
        gift_info: isActive ? itemBonus : value?.gift_info,
        include_info: isActive ? itemBonus : value?.include_info,
      };
    });
    return {type: _onSuccess(actions.GET_CART), data};
  }
};
