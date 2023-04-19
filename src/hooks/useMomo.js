import {Platform} from 'react-native';
import RNMomosdk from 'react-native-momosdk';

const useMomo = () => {
  const handlePayment = async (data, callback) => {
    let jsonData = {};
    jsonData.enviroment = '1'; //"0": SANBOX,"1": PRODUCTION
    jsonData.action = 'gettoken'; //DO NOT EDIT
    jsonData.partner = 'merchant'; //DO NOT EDIT
    jsonData.merchantcode = data.merchantcode;
    jsonData.merchantname = 'TotVaTot';
    jsonData.merchantnamelabel = 'TotVaTot';
    jsonData.description = 'Thanh toán cho đơn hàng ' + data.description;
    jsonData.orderId = data.orderId;
    jsonData.amount = data.amount;
    jsonData.appScheme = 'momoh9re20210315';

    if (Platform.OS === 'android') {
      let dataPayment = await RNMomosdk.requestPayment(jsonData);
      callback(dataPayment);
    } else {
      RNMomosdk.requestPayment(jsonData);
    }

    RNMomosdk.requestPayment(jsonData);
  };

  return {handlePayment};
};

export default useMomo;
