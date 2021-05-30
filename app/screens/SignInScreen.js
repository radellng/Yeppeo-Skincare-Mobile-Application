import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    auth.signInWithEmailAndPassword(email.trim().toLowerCase(), password);
  };

  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#EB8FA4" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Yeppeo!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}
        >
          Username
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Your Email"
                placeholderTextColor="#666666"
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />

          {/* {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null} */}
        </View>
        {/* {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )} */}

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Your Password"
                placeholderTextColor="#666666"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
              />
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />
          <TouchableOpacity>
            {/* {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )} */}
          </TouchableOpacity>
        </View>
        {/* {data.isValidPassword ? null : (
          // <Animatable.View animation="fadeInLeft" duration={500}>
          //   <Text style={styles.errorMsg}>
          //     Password must be 8 characters long.
          //   </Text>
          // </Animatable.View>
        )} */}

        <TouchableOpacity>
          <Text style={{ color: "#B6727A", marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
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
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("register")}
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
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              styles.button,
              {
                borderColor: "#009387",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          ></TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EB8FA4",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
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
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
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
});

//   return (
//     <View style={styles.authFormContainer}>
//       <Controller
//         control={control}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <TextInput
//             label="Email"
//             mode="outlined"
//             onBlur={onBlur}
//             onChangeText={(value) => onChange(value)}
//             value={value}
//             style={styles.formInput}
//           />
//         )}
//         name="email"
//         rules={{ required: true }}
//         defaultValue=""
//       />
//       {/* <View style={styles.errorMsg}>
//         {errors.email && (
//           <Text style={styles.errorText}>You must fill in your email</Text>
//         )}
//       </View> */}

//       <Controller
//         control={control}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <TextInput
//             label="Password"
//             mode="outlined"
//             secureTextEntry
//             onBlur={onBlur}
//             onChangeText={(value) => onChange(value)}
//             value={value}
//             style={styles.formInput}
//           />
//         )}
//         name="password"
//         rules={{ required: true }}
//         defaultValue=""
//       />
//       {/* <View style={styles.errorMsg}>
//         {errors.password && (
//           <Text style={styles.errorText}>You must fill in your password</Text>
//         )}
//       </View> */}
//       <View>
//         <Button
//           mode="contained"
//           compact={false}
//           onPress={handleSubmit(onSubmit)}
//           icon="account-arrow-right"
//           style={styles.submitButton}
//         >
//           Sign in
//         </Button>
//       </View>
//       <View style={styles.switchScreenText}>
//         <Text>Don't have an account yet?</Text>
//       </View>
//       <Button
//         mode="outlined"
//         style={styles.switchBtn}
//         icon="account-plus"
//         compact
//         onPress={() => navigation.navigate("register")}
//       >
//         Register Account
//       </Button>
//     </View>
//   );
// };

// export default LoginScreen;
