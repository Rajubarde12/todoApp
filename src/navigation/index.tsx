import {Provider, useSelector} from 'react-redux';
import type {RootState} from '../redux/store';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routes';
import Loader from '../components/loader';

const Root: React.FC = () => {
  const {loading} = useSelector((state: RootState) => state.data);
  return (
  
      <NavigationContainer
        onStateChange={state => {
          const name = state?.routes[state.index].name;
          console.log(name);
        }}>
        <Routes />
        <Loader loading={loading} />
      </NavigationContainer>
   
  );
};
export default Root;
