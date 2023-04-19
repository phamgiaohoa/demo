export const convertProductAll = (data = []) => {
  let result = [];

  data?.map(value => {
    const element = value?.data;
    result = [...result, ...element];
  });

  return result;
};
