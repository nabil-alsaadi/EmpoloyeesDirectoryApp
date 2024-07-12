import Reactotron from "reactotron-react-native";
import {reactotronRedux} from "reactotron-redux";
import {NativeModules} from "react-native";

let reactotron;
if (__DEV__) {
	const host = NativeModules.SourceCode.scriptURL
		?.split("://")[1]
		.split(":")[0];

	reactotron = Reactotron.configure({host}) // controls connection & communication settings
		.use(reactotronRedux())
		.useReactNative() // add all built-in react native plugins
		.connect(); // let's connect!
}

export default reactotron;