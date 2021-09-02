import { StyleSheet } from 'react-native'

const styles = () => StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 10,
        backgroundColor: '#c7c7c7'
    },
    complete: {
        color: 'grey',
        textDecorationLine: 'line-through',
        margin: 5,
    },
    notComplete: {
        margin: 5,
    },
    errorMsg: {
        marginLeft: 10,
        marginBottom: 10
    },
    errorText: {
        color: 'red'
    },
})

export default styles
