import {AppRegistry, LogBox} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
import 'react-native-gesture-handler';
LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
