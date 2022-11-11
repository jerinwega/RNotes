import { NativeModules } from 'react-native';
import Reactotron from 'reactotron-react-native';

const ConsoleLog = console.log;

// make a new one
console.log  = (...args) => {
	ConsoleLog(...args);

	Reactotron.display({
		name: 'CONSOLE.LOG',
		value: args,
		preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null
	})
};

let scriptHostname;
if (__DEV__) {
    const scriptURL = NativeModules.SourceCode.scriptURL;
    scriptHostname = scriptURL.split('://')[1].split(':')[0];
}

Reactotron
    .configure({host: scriptHostname}) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!
