import { StyleSheet, TextInput, View, Text } from "react-native";
import {
  Button,
  FormControl,
} from "native-base";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestOTP, userLogin } from "../redux/actions/userActions";
import * as Haptics from "expo-haptics";

export const LoginForm = ({ navigation }) => {
  const [formNumber, setFormNumber] = useState("");
  const [formOTP, setFormOTP] = useState("");
  const [numberValid, setNumberValid] = useState(true);

  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.user.access_token);
  const loading = useSelector((state) => state.user.loading);
  const sentOTP = useSelector((state) => state.user.sentOTP);

  const onLoginClick = () => {
    dispatch(userLogin({ otp: formOTP, phone_number: `+48${formNumber}`}));
  };

  const onSendClick = () => {
    dispatch(requestOTP(`+48${formNumber}`));
  };

  const onNumberChange = (text) => {
    setFormNumber(text);
    setNumberValid(formNumber.match(/\d{8}/));
  };

  useEffect(() => {
    sentOTP &&
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    access_token &&
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [sentOTP, access_token]);

  return (
    <View style={styles.container}>
      {!sentOTP && (
        <FormControl isInvalid={!numberValid}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder={"prefix"}
              value={"+48"}
              editable={false}
              style={styles.numberPrefix}
            />
            <TextInput
              keyboardType="numeric"
              style={styles.number}
              size="lg"
              variant="rounded"
              placeholder={"Phone number"}
              onChangeText={onNumberChange}
            />
          </View>
          <FormControl.ErrorMessage>
            Provided phone number seems to be incorrect.
          </FormControl.ErrorMessage>
          <Button
            style={styles.button}
            size="lg"
            isLoading={loading}
            isDisabled={sentOTP || !numberValid}
            onPress={() => onSendClick()}
            _loading={{
              bg: "#06D6A0",
              _text: {
                color: "#06D6A0",
              },
            }}
            _spinner={{
              color: "white",
            }}
            isLoadingText="Loading..."
          >
            <Text style={{ fontWeight: "bold", fontSize: 21 }}>
              Get SMS code
            </Text>
          </Button>
        </FormControl>
      )}

      {sentOTP && (
        <View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.number}
              size="lg"
              variant="rounded"
              placeholder={"Kod z SMS"}
              keyboardType="numeric"
              onChangeText={(value) => setFormOTP(value)}
            />
          </View>
          <Button
            style={styles.button}
            size="lg"
            isLoading={loading}
            isDisabled={!sentOTP}
            onPress={() => onLoginClick()}
            _loading={{
              bg: "amber.400:alpha.70",
              _text: {
                color: "coolGray.700",
              },
            }}
            _spinner={{
              color: "white",
            }}
            isLoadingText="Ladowanie..."
          >
            <Text style={{ fontWeight: "bold", fontSize: 21 }}>Login</Text>
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "stretch",
  },
  formSpace: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  numberPrefix: {
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 15,
    borderRadius: 30,
    height: 50,
    fontSize: 25,
  },
  number: {
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 10,
    fontSize: 25,
    height: 50,
    flexGrow: 1,
    marginLeft: "2%",
  },
  button: {
    borderRadius: 25,
    marginTop: "3%",
    height: 50,
    backgroundColor: "#06D6A0",
    fontSize: 25
  },
  image: {
    resizeMode: "contain",
    maxHeight: "100%",
  },
  formSpace: {
    flex: 1,
  },
  buttonView: {},
  text: { textAlign: "center" },
});