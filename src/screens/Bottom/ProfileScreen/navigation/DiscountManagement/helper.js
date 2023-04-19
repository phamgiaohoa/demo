export const convertData = (voucherSaved = [], voucherGeneral = []) => {
  return voucherSaved.length
    ? [
        {
          title: 'Voucher đã lưu',
          data: voucherSaved,
        },
        {
          title: 'Voucher chung',
          data: voucherGeneral,
        },
      ]
    : [];
};
