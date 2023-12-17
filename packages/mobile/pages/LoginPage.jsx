import React, { useContext, useRef, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha-patch/firebase-recaptcha/modal";
import firebase from "firebase/compat/app";

import { firebaseConfig } from "../firebaseConfig";
import { UserContext } from "../contexts/UserContext";
import { saveUserData } from "../utils";

const LoginPage = () => {
  const [user, setUser] = useContext(UserContext);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const [showOtpField, setShowOtpField] = useState(false);

  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const signInWithPhoneNumber = async (phoneNumber) => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then((result) => {
        setVerificationId(result);
      });
  };

  const confirmCode = async (otp) => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      otp
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        setOtp("");
        setPhoneNumber("");
        setShowOtpField(false);

        const {
          user: { phoneNumber },
        } = result;

        setUser({ phoneNumber });
        saveUserData({ phoneNumber });
        Alert.alert("OTP Confirmed");
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  const getOtp = () => {
    // logic to get OTP goes here
    // validate otp, strip spaces, etc.
    // if already has +91 or 91 prefix we just make sure we have +91 + 10 digits
    // else we add +91 prefix and 10 digits
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid mobile number");
      return;
    }
    let formattedPhoneNumber = phoneNumber.replace(/\s/g, "");
    if (!formattedPhoneNumber.startsWith("+91")) {
      formattedPhoneNumber = "+91" + formattedPhoneNumber;
    }

    setShowOtpField(true);
    signInWithPhoneNumber(formattedPhoneNumber);
  };

  const submitOtp = () => {
    // logic to submit OTP goes here
    // validate otp, strip spaces, etc.
    const formattedOtp = otp.replace(/\s/g, "");
    if (formattedOtp.length !== 6) {
      alert("Please enter a valid OTP");
      return;
    }
    confirmCode(formattedOtp);
  };

  return user ? (
    <View style={styles.container}>
      <Text>You are logged in as {user.phoneNumber}</Text>
    </View>
  ) : (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.inputWrapper}>
            <FirebaseRecaptchaVerifierModal
              ref={recaptchaVerifier}
              firebaseConfig={firebaseConfig}
            />
            <Text>Mobile number</Text>
            <TextInput
              placeholder="Enter 10 digit mobile no."
              style={styles.textInput}
              value={phoneNumber}
              onChangeText={(value) => {
                setPhoneNumber(value);
                setShowOtpField(false);
              }}
              keyboardType="phone-pad"
              autoCompleteType="tel"
            />
          </View>
          {!showOtpField && (
            <Button
              title="Get OTP"
              disabled={!/\d{10}/.test(phoneNumber)}
              onPress={getOtp}
            />
          )}
          {showOtpField && (
            <View style={styles.inputWrapper}>
              <Text>OTP</Text>
              <TextInput
                placeholder="Enter OTP"
                style={styles.textInput}
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
              />
            </View>
          )}
          {showOtpField && (
            <View>
              {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <Button
                  title="Submit OTP"
                  onPress={submitOtp}
                  disabled={isLoading}
                />
              )}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrapper: {
    marginBottom: 20,
  },
  textInput: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});
