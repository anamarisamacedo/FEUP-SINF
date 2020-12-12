import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import EntryScreen from './screens/EntryScreen'; 
import WarehouseScreen from './screens/WarehouseScreen';
import StockListingScreen from './screens/StockListingScreen';
import ClientOrdersScreen from './screens/ClientOrdersScreen';
import SupplierOrdersScreen from './screens/SupplierOrdersScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import PickersListScreen from './screens/PickersListScreen';
import PickingWavesScreen from './screens/PickingWavesScreen';
import GeneratePickingWaveScreen from './screens/GeneratePickingWaveScreen';
import PickerWaveScreen from './screens/PickerWaveScreen';
import ManagerWaveScreen from './screens/ManagerWaveScreen';
import ConcludedWaveScreen from './screens/ConcludedWaveScreen';
import PickerInputScreen from './screens/PickerInputScreen';


const screens = {
  PickingWavesScreen: {
    screen: PickingWavesScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  EntryScreen: {
    screen: EntryScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  SignUpScreen: {
    screen: SignUpScreen,
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
  },
  OrderDetailsScreen: {
    screen: OrderDetailsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  PickersListScreen: {
    screen: PickersListScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  PickingWavesScreen: {
    screen: PickingWavesScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  GeneratePickingWaveScreen: {
      screen: GeneratePickingWaveScreen,
      navigationOptions: {
        headerShown: false,
      },
  },
  PickerWaveScreen: {
      screen: PickerWaveScreen,
      navigationOptions: {
        headerShown: false,
      },
  },
  ManagerWaveScreen: {
      screen: ManagerWaveScreen,
      navigationOptions: {
        headerShown: false,
      },
  },
  ConcludedWaveScreen: {
      screen: ConcludedWaveScreen,
      navigationOptions: {
        headerShown: false,
      },
  },
  PickerInputScreen: {
    screen: PickerInputScreen,
    navigationOptions: {
      headerShown: false,
    },
}
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);