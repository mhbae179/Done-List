import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, View, Button, Alert, Text } from 'react-native';
import { List, Divider } from 'react-native-paper';
import ActionButton from 'react-native-action-button'
import { db, auth } from '../../firebase';
import BottomSheet from './BottomSheet'
import { LocaleConfig } from 'react-native-calendars';

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
    },
    calContainer: {

    }
})

const ViewAll = ({ navigation }) => {
    const user = auth.currentUser;
    const [dones, setDones] = useState([]);
    const [modalVisible, setModalVisible] = useState(false)
    const [dayValue, setDayValue] = useState('')
    const [marked, setMarked] = useState([])

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

        titleData()

        return () => {
            setDones([])
            setDayValue('')
        }
    }, [])

    useEffect(() => {
        // console.log(`date`, new Date())
        let filteringDones = dones.filter((v) => {
            console.log(v.time === dayValue)
            v.time === dayValue
        })

        setDones(filteringDones)
    }, [dayValue])

    const titleData = useCallback(() => {
        let time = new Date()
        let month = (time.getMonth() + 1) < 10 ? `0${time.getMonth() + 1}` : `${time.getMonth() + 1}`
        let date = time.getDate() < 10 ? `0${time.getDate()}` : `${time.getDate()}`
    
        console.log(`${time.getFullYear()}-${month}-${date}`)
        setDayValue(`${time.getFullYear()}-${month}-${date}`)
    }, [])

    const pressModalButton = () => {
        setModalVisible(true)
    }

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

    const onClickTitle = (value) => {
        console.log(value)
        setDayValue(value)
    }

    return (
        <>
            <View style={styles.calContainer}>
                {/* <Text>{dayValue}</Text> */}
                <Button title={`${dayValue}`} onPress={pressModalButton} />
            </View>
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
            <BottomSheet modalVisible={modalVisible} setModalVisible={setModalVisible} onClickTitle={onClickTitle} dones={dones} />
            <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => navigation.navigate('addOne')} />            
            {/* <Button title='hi' onPress={() => navigation.navigate('addOne')}></Button> */}
        </>
    )
};
export default ViewAll;