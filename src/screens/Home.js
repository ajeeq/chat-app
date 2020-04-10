import React from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import codePush from 'react-native-code-push';

class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };

    onButtonPress()
    {
        codePush.sync({
            updateDialog: true,
            installMode: codePush.InstallMode.IMMEDIATE
        });
    }
    constructor() {
        super();
        this.state = { restartAllowed: true };
      }
    
      codePushStatusDidChange(syncStatus) {
        switch(syncStatus) {
          case codePush.SyncStatus.CHECKING_FOR_UPDATE:
            this.setState({ syncMessage: "Checking for update." });
            break;
          case codePush.SyncStatus.DOWNLOADING_PACKAGE:
            this.setState({ syncMessage: "Downloading package." });
            break;
          case codePush.SyncStatus.AWAITING_USER_ACTION:
            this.setState({ syncMessage: "Awaiting user action." });
            break;
          case codePush.SyncStatus.INSTALLING_UPDATE:
            this.setState({ syncMessage: "Installing update." });
            break;
          case codePush.SyncStatus.UP_TO_DATE:
            this.setState({ syncMessage: "App up to date.", progress: false });
            break;
          case codePush.SyncStatus.UPDATE_IGNORED:
            this.setState({ syncMessage: "Update cancelled by user.", progress: false });
            break;
          case codePush.SyncStatus.UPDATE_INSTALLED:
            this.setState({ syncMessage: "Update installed and will be applied on restart.", progress: false });
            break;
          case codePush.SyncStatus.UNKNOWN_ERROR:
            this.setState({ syncMessage: "An unknown error occurred.", progress: false });
            break;
        }
      }
    
      codePushDownloadDidProgress(progress) {
        this.setState({ progress });
      }
    
      toggleAllowRestart() {
        this.state.restartAllowed
          ? codePush.disallowRestart()
          : codePush.allowRestart();
    
        this.setState({ restartAllowed: !this.state.restartAllowed });
      }
    
      /** Update is downloaded silently, and applied on restart (recommended) */
      sync() {
        codePush.sync(
          {},
          this.codePushStatusDidChange.bind(this),
          this.codePushDownloadDidProgress.bind(this)
        );
       } 
       
       /** Update pops a confirmation dialog, and then immediately reboots the app */
    syncImmediate() {
    codePush.sync(
      { installMode: codePush.InstallMode.IMMEDIATE, updateDialog: true },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this)
    );
  }

    render() {
        let progressView;

        if (this.state.progress) {
            progressView = (
              <Text style={styles.messages}>{this.state.progress.receivedBytes} of {this.state.progress.totalBytes} bytes received</Text>
            );
          }

        return (
            <View style={styles.container}>

                <Button title="Go to Profile screen"
                    onPress={() => this.props.navigation.navigate('Profile')}
                />

                <Button style={styles.button} title="CHECK FOR UPDATE!"onPress={this.onButtonPress}/>

                <Text style={styles.welcome}>
                    Welcome to CodePush !
                </Text>

                <TouchableOpacity onPress={this.sync.bind(this)}>
                    <Text style={styles.syncButton}>Press for background sync</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.syncImmediate.bind(this)}>
                    <Text style={styles.syncButton}>Press for dialog-driven sync</Text>
                </TouchableOpacity>

                {progressView}
                
                
                <TouchableOpacity onPress={this.toggleAllowRestart.bind(this)}>
                    <Text style={styles.restartToggleButton}>Restart { this.state.restartAllowed ? "allowed" : "forbidden"}</Text>
                </TouchableOpacity>

                <Text style={styles.messages}>{this.state.syncMessage || ""}</Text>
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
      justifyContent: "center",
      alignItems: "center",
    },
    button:
    {
        alignItems: "center",
        marginTop: 90
    },
    messages: 
    {
        marginTop: 30,
        textAlign: "center",
    },
    restartToggleButton: 
    {
        color: "blue",
        fontSize: 17
    },
    syncButton: 
    {
        color: "green",
        fontSize: 17
    },
    welcome: 
    {
        fontSize: 20,
        textAlign: "center",
        margin: 20
    },
});

export default Home;