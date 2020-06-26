import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Button, Alert } from 'react-native';
import { Ionicons } from 'react-native-vector-icons/Ionicons';


export default class login_screen extends React.Component {
  constructor(props){
    super(props);
  }

  state =
  {
    name: ""
  }

  continue = props => 
  {
    this.props.navigation.navigate("Chat", {name: this.state.name})
  }

  render() 
  {
    let progressView;

    if (this.state.progress) {
        progressView = (
          <Text style={styles.messages}>{this.state.progress.receivedBytes} of {this.state.progress.totalBytes} bytes received</Text>
        );
    }

    return(
      <View style={styles.container}>
        <View style={styles.circle}
        />
        <View style={{marginTop: 64}} >
          <Image
            source={require("../res/speak.png")}
            style={{width: 100, height: 100, alignSelf: "center"}}
          />
        </View>

        <View style={{marginHorizontal: 32}}>
          <Text style={styles.header}>Username</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Your name" 
              onChangeText={name => 
                {
                  this.setState({name});
                }
              }
            />

            <View style={{alignItems: "flex-end", marginTop: 64}}>
              <TouchableOpacity style={styles.continue} onPress={this.continue}>
                <Ionicons 
                  name="md-arrow-round-forward" 
                  size={24} 
                  color="#FFF"
                />
              </TouchableOpacity>
            </View>
        </View>

        <View style={styles.update_date}>
          <Text>Update: 9/4/2020 - FINAL BUILD</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create
({
    container:
    {
      flex: 1,
      backgroundColor: "#F4F5F7",
    },
    circle:
    {
      width: 500,
      height: 500,
      borderRadius: 500/2,
      backgroundColor: "#FFF",
      position: "absolute",
      left: -120,
      top: -20
    },
    header:
    {
      fontWeight: "800",
      fontSize: 30,
      color: "#514E5A",
      marginTop: 32
    },
    input:
    {
      marginTop: 32,
      height: 50,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "#BAB7C3",
      borderRadius: 30,
      paddingHorizontal: 16,
      fontWeight: "600"
    },
    continue:
    {
      width: 70,
      height: 70,
      borderRadius: 70/2,
      backgroundColor: "#9075E3",
      alignItems: "center",
      justifyContent: "center"
    },
    update_date:
    {
      // position: "absolute",
      // right: 0,
      // top: 0
      alignItems: "center",
      marginTop: 90
    }
});