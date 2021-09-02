import React, { useState, useEffect, useRef } from 'react'
import { View, Modal, Text, Dimensions, Animated, PanResponder, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: 'Aujourd\'hui'
};

LocaleConfig.defaultLocale = 'fr';

function BottomSheet({ modalVisible, setModalVisible }) {
    const today = useRef('')
    const screenHeight = Dimensions.get('screen').height
    const panY = useRef(new Animated.Value(screenHeight)).current
    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1]
    })

    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
    })

    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true
    })

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(gestureState.dy)
        },
        onPanResponderRelease: (event, gestureState) => {
            if (gestureState.dy > 0 && gestureState.vy > 1.5) {
                closeModal()
            } else {
                resetBottomSheet.start()
            }
        }
    })).current

    useEffect(() => {
        if (modalVisible) {
            resetBottomSheet.start()
        }
    }, [modalVisible, today])

    const closeModal = () => {
        closeBottomSheet.start(() => {
            setModalVisible(false)
        })
    }

    const getToday = (date) => {
        const year = new Date(date).getFullYear()
        const month = new Date(date).getMonth() + 1
        console.log(`today : ${date}, ${year}, ${month}`)
        // setToday(`${year} ${month}`)
        today.current = `${year} ${month}`
    }

    return (
        <Modal
            visible={modalVisible}
            animationType={'fade'}
            transparent
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.background} />
                </TouchableWithoutFeedback>
                <Animated.View
                    style={{ ...styles.bottomSheetContainer, transform: [{ translateY: translateY }] }}
                    {...panResponders.panHandlers}
                >
                    <View style={{ flex: 1, width: "100%" }}>
                        <Text style={styles.modalText}>{today.current}</Text>
                        <Calendar
                            onDayPress={(day) => {
                                console.log('selected day', day)
                                getToday(day.dateString)
                                // closeModal()
                            }}
                            onDayLongPress={(day) => { console.log('selected day', day) }}
                            monthFormat={'yyyy MM'}
                            onMonthChange={(month) => { console.log('month changed', month) }}
                            hideArrows={true}
                            renderArrow={(direction) => (<Arrow />)}
                            hideExtraDays={true}
                            disableMonthChange={true}
                            firstDay={1}
                            hideDayNames={false}
                            showWeekNumbers={false}
                            onPressArrowLeft={substractMonth => substractMonth()}
                            onPressArrowRight={addMonth => addMonth()}
                            disableArrowLeft={true}
                            disableArrowRight={true}
                            disableAllTouchEventsForDisabledDays={true}
                            renderHeader={(date) => getToday(date)}
                        />
                    </View>

                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    background: {
        flex: 1
    },
    modalText: {
        fontSize: 22
    }
})

export default BottomSheet
