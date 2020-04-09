import React from 'react';
import { Button, View, Text } from 'react-native';
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
   
    render() {
        return (
        <View style={{ 
            flex: 1,
            alignItems:'center',
            justifyContent:'center'
            }}>

            <Button title="Go to Profile screen"
                onPress={() => this.props.navigation.navigate('Profile')}
            />
            
            <TouchableOpacity onPress={this.onButtonPress}>
                <Text>click below</Text>
                <Text>Check for updates</Text>
            </TouchableOpacity>

        </View>
        );
    }
}
export default Home;