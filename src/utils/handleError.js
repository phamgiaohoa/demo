import actions, {_onUnmount} from '@redux/actions';
import {CustomToast} from '@utils/helper';
import Storage from '@utils/storage';
import I18n from 'i18n';
import {Alert} from 'react-native';
import RNRestart from 'react-native-restart';
import store from 'redux/store';

export const hanldeError = error => {
  if (error.data.code === 401) {
    Alert.alert(
      I18n.t('handleError.Login_version'),
      I18n.t('handleError.restart'),
      [
        {
          text: I18n.t('handleError.accept'),
          onPress: () => RNRestart.Restart(),
        },
      ],
      {cancelable: false},
    );
  } else if (error.data.code === 403) {
    Alert.alert(
      I18n.t('handleError.Login_version'),
      I18n.t('handleError.Please_re_login'),
      [
        {
          text: I18n.t('handleError.accept'),
          onPress: () => {
            Storage.removeItem('TOKEN_USER');
            store.dispatch({type: _onUnmount(actions.TOKEN_USER)});
            store.dispatch({type: _onUnmount(actions.GET_USER_INFORMATION)});
          },
        },
      ],
      {cancelable: false},
    );
  } else {
    console.error(error.data.message);
    CustomToast(error.data.message);
  }
};
