import {CustomToast} from '@utils/helper';

export const ADD_CART = 'ADD_CART';

export const BUY_NOW = 'BUY_NOW';

export const convertDataBonus = (gifts = [], products = []) => {
  if (gifts?.length > 0) {
    return gifts?.filter(({active}) => active === '1');
  } else {
    return products;
  }
};

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

export const addCartToLocal = ({
  cart,
  productQty,
  details,
  optionId,
  combo_info,
  is_combo,
  arr_gift,
  arr_include,
  gift_info,
  include_info,
}) => {
  const index = cart?.findIndex(({option_id}) => option_id === optionId);

  if (index !== -1) {
    cart[index] = {
      ...cart[index],
      quantity: cart[index]?.quantity + productQty,
    };
  } else {
    const newItem = {
      ...details,
      combo_info,
      is_combo,
      arr_gift,
      arr_include,
      gift_info,
      include_info,
      quantity: productQty,
      option_id: optionId,
    };
    cart = [...cart, newItem];
  }

  return cart;
};
