import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {GiftedChat} from 'react-native-gifted-chat'

class ChatScreen extends React.Component {
    static navigationOptions = {
        title: 'Chat',
    };

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.socket = new WebSocket('ws://tumbleweed-hack.herokuapp.com/chat', '', {
            headers: {
                "chat-sender": "AAA",
                "chat-receiver": "BBB"
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
        this.socket.onopen = () => console.log("Connected to WS");//this.socket.send(JSON.stringify({type: 'greet', payload: 'Hello Mr. Server!'}));
        this.socket.onmessage = ({data}) => console.log(data);
        this.setState({
            messages: [
                {
                    _id: "111",
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: "111",
                        name: 'React Native'
                    },
                },
            ],
        })
    }

    toClientMessages(data) {

    }

    toServerMessage(message) {
        let msgText = message[0].text;
        return {
            "text": msgText
        }

    }

    onSend(messages = []) {
        this.socket.send(JSON.stringify(this.toServerMessage(messages)));
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: "AAA",
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
    ChatScreen
);
