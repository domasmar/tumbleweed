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
    }

    state = {
        messages: [],
    };

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native'
                    },
                },
            ],
        })
    }

    onSend(messages = []) {
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
                    _id: 1,
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
