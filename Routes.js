import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import login_screen from "./src/screens/login_screen";
import chat_screen from "./src/screens/chat_screen";

const Project= createStackNavigator({
  Login: {
   screen: login_screen
  },
  Chat: {
   screen: chat_screen
  }
});

export default createAppContainer(Project);