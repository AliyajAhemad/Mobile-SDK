import React from 'react';
import { View } from 'react-native';
import { Icon} from 'react-native-elements';
import Styles from '../../js/Styles';

class NavImgButton extends React.Component { 
    render() {
        return (<View style={Styles.navBarButton}>
                  <Icon size={32} name={this.props.icon} type={this.props.iconType} color='white' underlayColor='red' onPress={() => this.props.onPress()} />
                </View>);
    }
}

export default NavImgButton;
