import React from 'react';
import { View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import firebase from 'firebase'
import ActionButton from 'react-native-action-button'
import styles from './styles';
import { auth, db } from '../../firebase'

function AddOne({ navigation }) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = async (data) => {
        const user = auth.currentUser
        try {
            const list = {
                name: data.done,
                complete: false,
                belongsTo: user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }
            const ref = db.collection('dones')

            await ref.add(list)
            navigation.goBack()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Name of Shopminder"
                        mode="outlined"
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        style={styles.field}
                    />
                )}
                name="done"
                rules={{ required: true }}
                defaultValue=""
            />
            <View style={styles.errorMsg}>
                {errors.shopminder && <Text style={styles.errorText}>You must fill in your shopminder</Text>}
            </View>
            <ActionButton buttonColor="rgba(231,76,60,1)" onPress={handleSubmit(onSubmit)} />
            {/* <Button title='hello' onPress={handleSubmit(onSubmit)}></Button> */}
        </>
    );
};
export default AddOne;