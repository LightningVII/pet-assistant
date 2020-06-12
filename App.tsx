import React, { useState, useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PushNotification from "./components/PushNotification";
import Main from "./Main";
import Pets from "./Pets";
import Store from "./redux/Store";
import useCachedResources from "./hooks/useCachedResources";

import {
  ActionSheetProvider,
  connectActionSheet,
} from "@expo/react-native-action-sheet";

interface ITheme {
  colors: object;
}

const theme: ITheme = {
  colors: {},
};

const App = (props) => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) return null;
  return (
    <ReduxProvider store={Store}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <Pets {...props} />
          {/* <Main {...props} /> */}
        </SafeAreaProvider>
      </ThemeProvider>
      {/* <PushNotification /> */}
    </ReduxProvider>
  );
};

const ConnectedApp = connectActionSheet(App);

class AppContainer extends React.Component {
  public render() {
    return (
      <ActionSheetProvider>
        <ConnectedApp />
      </ActionSheetProvider>
    );
  }
}

export default AppContainer;
