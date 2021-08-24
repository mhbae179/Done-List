import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { List, Divider, FAB, Portal, Provider } from 'react-native-paper';
import { db } from '../../firebase';
import styles from './styles'

const ViewAll = ({ navigation }) => {
    const [shopminders, setShopminders] = useState([]);
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;


    useEffect(() => {
        const ref = db.collection('dones');
        ref.onSnapshot((query) => {
            const objs = [];
            query.forEach((doc) => {
                objs.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setShopminders(objs);
        });
    }, [])

    return (
        <>
            <ScrollView>
                <View>
                    {shopminders.map((shopminder) => (
                        <View key={shopminder.id}>
                            <List.Item
                                title={shopminder.title}
                            />
                            <Divider />
                        </View>
                    ))}
                </View>
            </ScrollView>
            <Provider>
                <Portal>
                    <FAB.Group
                        open={open}
                        icon={open ? 'calendar-today' : 'plus'}
                        actions={[
                            { icon: 'plus', onPress: () => navigation.navigate('addOne') },
                            {
                                icon: 'star',
                                label: 'Star',
                                onPress: () => console.log('Pressed star'),
                            },
                            {
                                icon: 'email',
                                label: 'Email',
                                onPress: () => console.log('Pressed email'),
                            },
                            {
                                icon: 'bell',
                                label: 'Remind',
                                onPress: () => console.log('Pressed notifications'),
                            },
                        ]}
                        onStateChange={onStateChange}
                        onPress={() => {
                            if (open) {
                                // do something if the speed dial is open
                            }
                        }}
                    />
                </Portal>
            </Provider>
        </>
    )
};
export default ViewAll;