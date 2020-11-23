import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import EntryScreen from './screens/EntryScreen'; 
import WarehouseScreen from './screens/WarehouseScreen';
import StockListingScreen from './screens/StockListingScreen';
import ClientOrdersScreen from './screens/ClientOrdersScreen';
import SupplierOrdersScreen from './screens/SupplierOrdersScreen';

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
  },
  StockListingScreen: {
    screen: StockListingScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ClientOrdersScreen: {
    screen: ClientOrdersScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  SupplierOrdersScreen: {
    screen: SupplierOrdersScreen,
    navigationOptions: {
      headerShown: false,
    },
  }
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);