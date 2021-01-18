import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ActionSheetProvider,
  connectActionSheet,
} from "@expo/react-native-action-sheet";
import Navigation from "./navigation";
import useColorScheme from "./hooks/useColorScheme";

// import PushNotification from "./components/PushNotification";
import Store from "./redux/Store";
import useCachedResources from "./hooks/useCachedResources";

interface ITheme {
  colors: object;
}

const theme: ITheme = {
  colors: {},
};

const App = (props) => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) return null;
  return (
    <ReduxProvider store={Store}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
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
