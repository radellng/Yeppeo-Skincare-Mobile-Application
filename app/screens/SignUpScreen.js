import React, { useRef } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { auth } from "../firebase";
import * as Firebase from "firebase";

const RegisterScreen = ({ navigation }) => {
  const { control, handleSubmit, errors, watch, register } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  function updateInfo(username) {
    Firebase.firestore()
      .collection("Users")
      .doc(Firebase.auth().currentUser.uid)
      .set({
        username: username,
        firstName: "",
        lastName: "",
        gender: "",
        age: "",
        uid: Firebase.auth().currentUser.uid,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/yeppeo-469e9.appspot.com/o/images%2Fdefault%20profile%20pic.jpg?alt=media&token=ea5b3733-83b8-441b-bc51-2e8192d19fb1",
      })
      .then((ref) => {
        console.log("Information updated");
      });
  }

  const onSubmit = async (data) => {
    const { email, username, password } = data;
    console.log(email, username, password);
    await auth.createUserWithEmailAndPassword(
      email.trim().toLowerCase(),
      password
    );
    updateInfo(username);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#EB8FA4" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Your Email"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(value) => onChange(value)}
                />
              )}
              name="email"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 30,
              },
            ]}
          >
            Username
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Your Username"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(value) => onChange(value)}
                />
              )}
              name="username"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 30,
              },
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Your Password"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={(val) => onChange(val)}
                  value={value}
                  style={styles.textInput}
                  autoCapitalize="none"
                />
              )}
              name="password"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 30,
              },
            ]}
          >
            Confirm Password
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Confirm Your Password"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={(val) => onChange(val)}
                  value={value}
                  style={styles.textInput}
                  autoCapitalize="none"
                />
              )}
              name="password"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={handleSubmit(onSubmit)}
            >
              <LinearGradient
                colors={["#DA3815", "#DA3815"]}
                style={styles.signIn}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Register
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: "#DA3815",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#DA3815",
                  },
                ]}
              >
                Already Have An Account?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EB8FA4",
  },
  errorMsg: {
    marginLeft: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
});
