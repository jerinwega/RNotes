/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { Text, Input } from 'native-base';
import App from './src/App';
import {name as appName} from './app.json';

if (__DEV__) {
	import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
Input.defaultProps = Input.defaultProps || {};
Input.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
