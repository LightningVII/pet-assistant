import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'react-native-elements';
import HomeApp from './HomeApp';
import Store from './redux/Store';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet'

const theme = {
  colors: {}
}

const App = (props: any) => {
  return (
    <ReduxProvider store={Store}>
      <ThemeProvider theme={theme}>
        <HomeApp {...props} />
      </ThemeProvider>
    </ReduxProvider>
  );
};

const ConnectedApp = connectActionSheet(App)

class AppContainer extends React.Component {
  render() {
    return (
      <ActionSheetProvider>
        <ConnectedApp />
      </ActionSheetProvider>
    );
  }
}

export default AppContainer
