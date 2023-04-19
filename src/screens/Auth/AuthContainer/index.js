import {icons} from '@assets';
import {FormContainer} from '@components';
import LoginScreen from '@screens/Auth/AuthContainer/LoginScreen';
import SignUpScreen from '@screens/Auth/AuthContainer/SignUpScreen';
import styles from '@screens/Auth/AuthContainer/styles';
// import ChooseLanguage from '@screens/Bottom/ProfileScreen/components/ChooseLanguage';
import React, {useState} from 'react';
import {Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

const AuthScreen = ({route}) => {
  const invitation_code = route.params?.invitation_code || null;
  const config = useSelector(state => state.config.data);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <FormContainer>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        colors={config.general_background_color}
        style={styles.LinearHeader}>
        <Image
          source={icons.logo}
          style={styles.imgLogo}
          resizeMode="contain"
        />
      </LinearGradient>
      {isLogin ? (
        <LoginScreen callback={() => setIsLogin(!isLogin)} />
      ) : (
        <SignUpScreen
          invitation_code={invitation_code}
          callback={() => setIsLogin(!isLogin)}
        />
      )}
      {/* <ChooseLanguage position="top" /> */}
    </FormContainer>
  );
};

export default AuthScreen;
