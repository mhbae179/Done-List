import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Button, Alert, Text } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { db, auth } from '../../firebase';
import ActionButton from 'react-native-action-button'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'

const styles = StyleSheet.create({
    complete: {
        color: 'grey',
        textDecorationLine: 'line-through',
        margin: 5,
    },
    notComplete: {
        margin: 5,
    },
    noneItemView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    noneItemText: {
        fontSize: 18,
        marginTop: -50
    }
})

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

        return () => setDones([])
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
                '삭제하기',
                '정말 삭제 하시겠습니까?',
                [
                    {
                        text: '취소',
                        onPress: () => null
                    },
                    {
                        text: '삭제',
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
            {
                dones.length === 0 ? (
                    <View style={styles.noneItemView}>
                        <Text style={styles.noneItemText}>
                            오늘 달성한 일들을 추가하세요!
                        </Text>
                    </View>
                ) : (
                    <ScrollView>
                        <View>
                            {dones.map((done) => (
                                <View key={done.id}>
                                    <List.Item
                                        title={done.name}
                                        titleStyle={done.complete === true ? styles.complete : styles.notComplete}
                                        onPress={() => handleComplete(done)}
                                        onLongPress={() => handleDelete(done)}
                                    />
                                    <Divider />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                )
            }            
            <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => navigation.navigate('addOne')} />            
            {/* <Button title='hi' onPress={() => navigation.navigate('addOne')}></Button> */}
        </>
    )
};
export default ViewAll;