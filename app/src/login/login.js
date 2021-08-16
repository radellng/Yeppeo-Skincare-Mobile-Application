import React, { Component } from "react";
import styles from "./style";
import {
  Button,
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
} from "react-native";

export default class LoginScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Yeppeo</Text>
              <TextInput
                placeholder="Email or Username"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
              />
              <TextInput
                placeholder="Password"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                secureTextEntry={true}
              />

              <Button
                buttonStyle={styles.loginButton}
                onPress={() => {
                  onSignIn().then(() => navigation.navigate("SignedIn"));
                }}
                title="Login"
              />
              <Button
                buttonStyle={styles.signUpButton}
                onPress={() => this.onSignupPress()}
                title="Signup"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  onSignupPress() {
    console.log("signup button pressed");
  }
}
