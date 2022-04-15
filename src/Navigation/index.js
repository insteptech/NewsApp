import React from 'react';
import {TouchableOpacity} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AntDesign from 'react-native-vector-icons/AntDesign';

//IMPORT SCREENS
import DashBoardScreen from '../Screens/Dashboard/DashBoard';
import ArticlesScreen from '../Screens/Dashboard/Articles';
import ArticleScreen from '../Screens/Dashboard/Article';
import SearchScreen from '../Screens/Dashboard/Search';

const Stack = createNativeStackNavigator();

//ROUTER ====================================================

const Router = () => {
  const headerRightDashboard = navigation => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <AntDesign name="search1" size={25} color="gray" />
      </TouchableOpacity>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="DashBoard"
          component={DashBoardScreen}
          options={({navigation}) => ({
            title: 'NewsApp',
            headerRight: () => headerRightDashboard(navigation),
          })}
        />
        <Stack.Screen name="Articles" component={ArticlesScreen} />
        <Stack.Screen
          name="Article"
          component={ArticleScreen}
          options={({navigation, route}) => ({
            headerShown: true,
            title: route.params.title,
          })}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
