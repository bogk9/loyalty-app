import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LoginForm } from "../components/LoginForm";
import { KeyboardAvoidingView } from "react-native";

export const LoginScreen = () => {
  return (
    <>
    <SafeAreaView style={{ flex:0, backgroundColor: '#06D6A0' }} />
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={2}
        style={styles.container}
      >
        <View style={styles.logoSpace}>
          <Image
            style={styles.image}
            source={require("../../assets/logo.png")}
          />
        </View>

        <View style={styles.formSpace}>
        
        <Text style={styles.title}>Join to earn points.</Text>
          <LoginForm />
        </View>

        <View style={styles.textSpace}>
          <Text style={{fontSize: 15, fontWeight: "500" ,textAlign: "center"}}>Learn more</Text>
          <Text style={styles.more}>teatralka.pl</Text>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  logoSpace: {
    flex: 1,
    backgroundColor: "#06D6A0",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignSelf: "stretch"
  },
  textSpace: {
    flex: 0.2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center"
  },
  more: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center"
  },
  image: {
    resizeMode: "contain",
    maxHeight: "100%",
    alignSelf: "center"
  },
  formSpace: {
    flex: 0.7,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignSelf: "stretch",
    paddingLeft: "10%",
    paddingRight: "10%",
    backgroundColor: "#f07f4b",
    top: "-6%",
    borderRadius: 40,
    margin: "4%"
  },
  text: { textAlign: "center" },
});