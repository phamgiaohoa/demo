import actions, {_onSuccess} from '@redux/actions';

export const getAddAddress = (user, values) => {
  return user
    ? {
        type: actions.ADD_ADDRESS,
        params: {user},
        body: {
          full_name: values.full_name,
          phone: values.phone,
          email: values.email,
          address: values.address,
          province: values.province.code,
          district: values.district.code,
          ward: values.ward.code,
          is_default: values.is_default,
        },
      }
    : {
        type: _onSuccess(actions.GET_ADDRESS),
        data: [
          {
            full_name: values.full_name,
            phone: values.phone,
            email: values.email,
            address: values.address,
            province: values.province.code,
            district: values.district.code,
            ward: values.ward.code,
            province_text: values.province.title,
            district_text: values.district.title,
            ward_text: values.ward.title,
            is_default: values.is_default,
          },
        ],
      };
};
