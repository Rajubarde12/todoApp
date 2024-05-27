import React from 'react';
import {View} from 'react-native';
import Root from './src/navigation';
import {Provider} from 'react-redux';
import store from './src/redux/store';
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};
export default App;
