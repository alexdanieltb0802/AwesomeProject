import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { ListItem, Avatar } from 'react-native-elements';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            listUsers: [],
        }
    }

    componentDidMount() {
        this.getUserRandom();
    }

    getUserRandom = () => {
        const url = 'https://randomuser.me/api/?seed=1&page=1&results=20';

        this.setState({ loading: true })
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    listUsers: res.results,
                    loading: false
                })

            });
    };

    render() {
        //if (this.state.loading) {
        //    return (
        //        <View style={styles.container}>
        //            <Text>Descargando usuarios!</Text>
        //        </View>
        //    );
        //}

        return (
            <FlatList
                data={this.state.listUsers}
                renderItem={({ item }) => (
                    <ListItem bottomDivider>
                        <Avatar
                            rounded
                            source={{ uri: item.picture.thumbnail }}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{item.name.first}</ListItem.Title>
                            <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                )}
                keyExtractor={item => item.email}
            />

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
