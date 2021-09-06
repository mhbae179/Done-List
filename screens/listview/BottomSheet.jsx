import React, { useState, useEffect, useRef } from 'react'
import { View, Modal, Text, Dimensions, Animated, PanResponder, TouchableWithoutFeedback, TouchableOpacity,StyleSheet } from 'react-native'
import { Calendar, CalendarList, Agenda, ExpandableCalendar, CalendarProvider } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1.', '2.', '3', '4', '5', '6', '7.', '8', '9.', '10.', '11.', '12.'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    // today: 'Aujourd\'hui'
};

LocaleConfig.defaultLocale = 'fr';

const image1 = require("../../assets/next.png")
const image2 = require("../../assets/previous.png")

function BottomSheet({ modalVisible, setModalVisible, onClickTitle, dones }) {
    const [value, setValue] = useState('2021-09-06')

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
    }, [modalVisible])

    const closeModal = () => {
        closeBottomSheet.start(() => {
            setModalVisible(false)
        })
    }

    const getToday = (date) => {
        setValue(date)
        onClickTitle(date)
    }

    const onDateChange = (date=null, updateSource=null) => {
        setValue(date)
        onClickTitle(date)
        closeModal()
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
                        <CalendarProvider
                            date={value}
                            showTodayButton={false}
                            onDateChanged={onDateChange}
                            >
                            <Calendar
                                current={value}
                                onDayPress={day => getToday(day.dateString)}
                                enableSwipeMonths={true}
                                markedDates={{
                                    [value]: {
                                        selected: true,
                                        disableTouchEvent: true,
                                        selectedColor: '#2196f3',
                                        selectedTextColor: '#ffffff'
                                    }
                                }}
                            />
                        </CalendarProvider>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: 360,
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
