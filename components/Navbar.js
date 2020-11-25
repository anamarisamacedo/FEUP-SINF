import { Component } from "react";

class Navbar extends Component{
    render(){
        return(
            <TouchableHighlight onPress={() => props.navigation.toggleDrawer()}>
                <Icon 
                    style={styles.icon}
                    name='plus'
                    type='font-awesome-5' />
        </TouchableHighlight>
        );
    }
}