import {NetWork} from '@components';
import {useDeviceInfo, useFCM} from '@hooks';
import actions from '@redux/actions';
import store, {persistor} from '@redux/store';
import Storage from '@utils/storage';
import I18n from 'i18n';
import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {MenuProvider} from 'react-native-popup-menu';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import RootStack from './navigation/RootStack';

const App = () => {
  const dispatch = useDispatch();
  const fcm = useFCM();
  const device = useDeviceInfo();
  const token = useSelector(state => state.token.data);
  const config = useSelector(state => state.config.data);

  useEffect(() => {
    fcm.requestUserPermission();
    fcm.getDeviceToken().then(device_token => {
      dispatch({
        type: actions.DEVICE_INFO,
        device_token,
        device_name:
          device.deviceName +
          ' - ' +
          device.systemName +
          ' - ' +
          device.systemVersion,
      });
    });
  }, [device, fcm, dispatch]);

  useEffect(() => {
    if (token && config) {
      RNBootSplash.hide({fade: true});
    }
  }, [token, config]);

  useEffect(() => {
    Storage.getItem('LANGUAGE').then(language => {
      language ? (I18n.locale = language) : (I18n.locale = 'vi');
    });

    dispatch({type: actions.GET_TOKEN});
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch({type: actions.GET_CONFIG});

      Storage.getItem('TOKEN_USER').then(user => {
        if (user) {
          dispatch({
            type: actions.TOKEN_USER,
            data: user,
          });
          dispatch({
            type: actions.GET_USER_INFORMATION,
            params: {
              user,
            },
          });
        }
      });
    }
  }, [dispatch, token]);

  return <RootStack />;
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <MenuProvider>
            <App />
            <NetWork />
          </MenuProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppWrapper;
