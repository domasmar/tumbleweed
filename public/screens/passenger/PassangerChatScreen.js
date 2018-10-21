import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {GiftedChat} from 'react-native-gifted-chat'

class PassangerChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat',
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    console.log("sender", this.props.navigation.state.params.senderId);
    console.log("receiver", this.props.navigation.state.params.receiverId);

    this.socket = new WebSocket('ws://tumbleweed-hack.herokuapp.com/chat', '', {
      headers: {
        "chat-sender": this.props.navigation.state.params.senderId,
        "chat-receiver": this.props.navigation.state.params.receiverId
      }
    });

    this.emit = this.emit.bind(this);
  }

  emit() {
    this.setState(prevState => ({
      open: !prevState.open
    }));
    this.socket.send("It worked!")
  }

  state = {
    messages: [],
    open: false,
    connected: false
  };

  componentWillMount() {
    this.socket.onopen = () => console.log("Connected to WS");
    this.socket.onmessage = ({data}) => {
      this.setState(previousState => ({
        messages: GiftedChat.append([], this.toClientMessages(data)),
      }));
    };

    this.setState({
      messages: [],
    })
  }

  toClientMessages(data) {
    data = JSON.parse(data);
    if (data && data.history) {
      return data.history.map(msg => {
        return {
          _id: msg.id,
          createdAt: new Date(),
          text: msg.text,
          user: {
            _id: msg.author,
            name: 'Bill'
          },
        }
      }).reverse();
    } else {
      return [{
        _id: 1,
        createdAt: new Date(),
        text: "Sveiki",
        user: {
          _id: "mindaugas",
          name: 'Domas'
        },
      }]
    }
  }

  toServerMessage(message) {
    let msgText = message[0].text;
    return {
      "text": msgText
    }

  }

  onSend(messages = []) {
    this.socket.send(JSON.stringify(this.toServerMessage(messages)));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.navigation.state.params.senderId,
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 5,
    paddingLeft: 5,
  },
  col6: {
    flexBasis: '50%',
  },
  col4: {
    flexBasis: '33.33%',
  },
  col3: {
    flexBasis: '25%',
  },
  row: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
});

const mapStateToProps = ({isLoading, chatList}) => {
  return {isLoading, chatList};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(
  PassangerChatScreen
);
