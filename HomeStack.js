import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import EntryScreen from './screens/EntryScreen'; 
import WarehouseScreen from './screens/WarehouseScreen';

const screens = {
  EntryScreen: {
    screen: EntryScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  WarehouseScreen: {
    screen: WarehouseScreen,
    navigationOptions: {
      headerShown: false,
    },
  }
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);