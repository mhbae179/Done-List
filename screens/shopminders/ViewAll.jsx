import React, { useState, useEffect } from 'react';
import { ScrollView, View, Button, Alert } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { db, auth } from '../../firebase';
import ActionButton from 'react-native-action-button'
import styles from './styles';

const styled = {
    complete: {
        color: 'grey',
        textDecorationLine: 'line-through',
        margin: 5,
    },
    notComplete: {
        margin: 5,
    }
}

const ViewAll = ({ navigation }) => {
    const [dones, setDones] = useState([]);
    const user = auth.currentUser;

    useEffect(() => {
        const ref = db.collection('dones')

        const refQuery = ref.where('belongsTo', '==', user.uid).orderBy("createdAt", "desc");

        refQuery.onSnapshot((query) => {
            const objs = [];
            query.forEach((doc) => {
                objs.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setDones(objs);
        });
    }, [])

    const handleComplete = async (done) => {
        const ref = db.collection('dones').doc(done.id)

        try {
            await ref.set({
                complete: !done.complete,
            }, { merge: true })
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (done) => {
        const ref = db.collection('dones').doc(done.id)

        try {
            Alert.alert(
                'Are you sure?',
                'Are you sure you want to delete?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => null
                    },
                    {
                        text: 'Delete',
                        onPress: async () => await ref.delete()
                    }
                ]
            )
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <ScrollView>
                <View>
                    {dones.map((done) => (
                        <View key={done.id}>
                            <List.Item
                                title={done.name}
                                titleStyle={done.complete === true ? styled.complete : styled.notComplete}
                                onPress={() => handleComplete(done)}
                                onLongPress={() => handleDelete(done)}
                            />
                            <Divider />
                        </View>
                    ))}
                </View>
            </ScrollView>
            <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => navigation.navigate('addOne')} />            
            {/* <Button title='hi' onPress={() => navigation.navigate('addOne')}></Button> */}
        </>
    )
};
export default ViewAll;