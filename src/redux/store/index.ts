import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import {mySaga} from '../saga';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    data: reducers,
  },
  middleware: defaultMidlewer => defaultMidlewer().concat(sagaMiddleware),
});
sagaMiddleware.run(mySaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
