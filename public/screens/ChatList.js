import React from 'react';
import {Text} from "react-native";

import {MappedUsers} from './Users';
// import axios from "axios";
import connect from "react-redux/es/connect/connect";
import {List, ListItem} from "react-native-elements";

export class ChatList extends React.Component {

  static navigationOptions = {
    title: 'Drivers',
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      chats: [],
    };
    this.loadChats();
  }

  async loadChats() {
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    });

    console.log(this.props.passenger);
    console.log(this.props.driver);

    // const response = await axios.get("https://tumbleweed-hack.herokuapp.com/chats/" + '');
    // const chats = response.data;

    this.setState(() => ({
      loading: false,
      chats: [{
        receiverId: 'steve',
      }, {
        receiverId: 'bill'
      }, {
        receiverId: 'mindaugas'
      }, {
        receiverId: 'domas'
      }, {
        receiverId: 'edgaras'
      }]
    }))
  }

  getUser(chat) {
    return MappedUsers[chat.receiverId];
  }

  openChat(chat) {
    this.props.navigation.navigate('ChatScreen', {
      receiverId: chat.receiverId
    });
  }

  render() {
    if (this.state.loading) return (
      <Text>Loading</Text>
    );

    return (
      <List containerStyle={{marginBottom: 20}}>
        {
          this.state.chats.map((chat) => (
            <ListItem
              roundAvatar
              onPress={() => this.openChat(chat)}
              avatar={{uri: this.getUser(chat).picture}}
              key={this.getUser(chat).userId}
              title={this.getUser(chat).name}
            />
          ))
        }
      </List>
    );
  }
}

const mapStateToProps = ({passenger, driver}) => {
  return {passenger, driver};
};

export default connect(mapStateToProps, {})(ChatList);
