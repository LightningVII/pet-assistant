import React, { useState, useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "react-native-elements";
import HomeApp from "./HomeApp";
import Store from "./redux/Store";
import * as Font from "expo-font";
import {
  ActionSheetProvider,
  connectActionSheet
} from "@expo/react-native-action-sheet";

const theme = {
  colors: {}
};

const App = (props: any) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
      antfill: require("@ant-design/icons-react-native/fonts/antfill.ttf")
    }).then(() => setIsReady(true));
  }, []);

  if (!isReady) return null;
  return (
    <ReduxProvider store={Store}>
      <ThemeProvider theme={theme}>
        <HomeApp {...props} />
      </ThemeProvider>
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
