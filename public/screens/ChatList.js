import React from 'react';
import {Text} from "react-native";

import {MappedUsers} from './Users';
import axios from "axios";
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

    if (this.props.passenger) {
      this.senderId = this.props.passenger.userId;
    } else if (this.props.driver) {
      this.senderId = this.props.driver.userId;
    }

    this.loadChats();
  }

  async loadChats() {
    console.log(this.props.passenger);
    console.log(this.props.driver);

    const response = await axios.get("https://tumbleweed-hack.herokuapp.com/chat/user/" + this.senderId + "/conversations");
    const chats = response.data;

    console.debug(chats);

    this.setState(() => ({
      loading: false,
      chats: chats.map(chat => {
        return {
          receiverId: chat.members.filter(m => m !== this.senderId)[0]
        }
      })
    }))
  }

  getUser(chat) {
    return MappedUsers[chat.receiverId];
  }

  openChat(chat) {
    this.props.navigation.navigate('ChatScreen', {
      senderId: this.senderId,
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
