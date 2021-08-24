import React from 'react'
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper'
import { auth } from '../../firebase'
import styles from './styles'

function LoginScreen({ navigation }) {
    const { control, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        const { email, password } = data 
        auth.signInWithEmailAndPassword(email.trim().toLowerCase(), password)
        console.log(data)
    }

    return (
        <View style={styles.authFormContainer}>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.formInput}
                        label="Email"
                        mode="outlined"
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                    />
                )}
                name="email"
                rules={{ required: true }}
                defaultValue=""
            />
            <View style={styles.errorMsg}>
                {errors.email && <Text style={styles.errorText}>You must fill in your email</Text>}
            </View>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.formInput}
                        label="Password"
                        mode="outlined"
                        secureTextEntry
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                    />
                )}
                name="password"
                rules={{ required: true }}
                defaultValue=""
            />
            <View style={styles.errorMsg}>
                {errors.password && <Text style={styles.errorText}>You must fill in your password</Text>}
            </View>
            <View>
                <Button
                    style={styles.submitButton}
                    mode="contained"
                    compact={false}
                    onPress={handleSubmit(onSubmit)}
                    icon="account-arrow-right"
                >
                    Sign in
                </Button>
            </View>
            <View style={styles.switchScreenText}>
                <Text>
                    Don't have an account yet?
                </Text>
            </View>
            <Button
                mode='outlined'
                style={styles.switchBtn}
                icon='account-plus'
                compact
                onPress={() => navigation.navigate('register')}
            >
                Register Account
            </Button>
        </View>
    )
}

export default LoginScreen
