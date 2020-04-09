import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";

const Project= createStackNavigator({
  Home: {
   screen: Home
  },
  Profile: {
   screen: Profile
  }
});

export default createAppContainer(Project);