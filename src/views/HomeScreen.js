import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { fetchUserData } from "../redux/actions/dataActions";
import QRCode from "react-qr-code";
import * as Haptics from "expo-haptics";

export const HomeScreen = () => {
  const access_token = useSelector((state) => state.user.access_token);
  const username = useSelector((state) => state.data.username);
  const points = useSelector((state) => state.data.points);
  const dispatch = useDispatch();

  // When access_token changes (mostly during log-in), fetch user info to display.
  useEffect(() => {
    dispatch(fetchUserData());
    access_token &&
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [access_token]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={2}
        style={styles.container}
      >
        <View style={styles.codeSpace}>
          <QRCode style={styles.image} value="+48507189848" />
        </View>

        <View style={styles.logoSpace}>
          <View style={styles.titleSpace}>
            <Text style={styles.title}>
              Pokaz kod pracownikowi podczas składania zamówienia.
            </Text>
          </View>

          <View style={styles.pointsSpace}>
            <Text style={styles.points}>Masz {points} punktów 🌟 </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: "4%",
    position: "relative"
  },
  codeSpace: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#06D6A0",
    borderRadius: 40,
  },
  logoSpace: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderRadius: 10,
  },

  titleSpace: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    borderRadius:40,
    backgroundColor: "lightblue",
    marginTop: "4%"
  },

  pointsSpace: {
    flex: 1,
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
    borderRadius: 40,
    marginTop: "4%"
  },

  title: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  points: {
    fontWeight: "500",
    fontSize: 30,
    textAlign: "center",
  },
  image: {
    resizeMode: "contain",
    maxHeight: "100%",
    width: 100,
    height: 100,
  },
  text: { textAlign: "center" },
});

