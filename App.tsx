import React, { useState, useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PushNotification from "./components/PushNotification";
import Main from "./Main";
import Store from "./redux/Store";
import * as Font from "expo-font";

import {
  ActionSheetProvider,
  connectActionSheet,
} from "@expo/react-native-action-sheet";

const theme = {
  colors: {},
};

const App = (props) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async function () {
      await Font.loadAsync({
        antoutline: require("./assets/fonts/antoutline.ttf"),
        antfill: require("./assets/fonts/antfill.ttf"),
      });
      setIsReady(true);
    })();
  }, []);

  if (!isReady) return null;
  return (
    <ReduxProvider store={Store}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <Main {...props} />
        </SafeAreaProvider>
      </ThemeProvider>
      <PushNotification />
    </ReduxProvider>
  );
};

const ConnectedApp = connectActionSheet(App);

class AppContainer extends React.Component {
  render() {
    return (
      <ActionSheetProvider>
        <ConnectedApp />
      </ActionSheetProvider>
    );
  }
}

export default AppContainer;
