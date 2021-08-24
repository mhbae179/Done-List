import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import FAB from 'react-native-fab'
import Icon from 'react-native-vector-icons'
import styles from './styles';

function AddOne() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data);
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
                name="shopminder"
                rules={{ required: true }}
                defaultValue=""
            />
            <View style={styles.errorMsg}>
                {errors.shopminder && <Text style={styles.errorText}>You must fill in your shopminder</Text>}
            </View>
            <FAB 
                buttonColor="red" 
                iconTextColor="#FFFFFF" 
                onClickAction={() => {console.log("FAB pressed")}} 
                visible={true} 
                iconTextComponent={<Icon name="plus"/>} 
            />
        </>
    );
};
export default AddOne;