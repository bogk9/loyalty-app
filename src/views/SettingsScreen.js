import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    FlatList,
  } from "react-native";
  import { Button} from "native-base";
  import { LoginForm } from "../components/LoginForm";
  import { KeyboardAvoidingView } from "react-native";
  import { useDispatch } from "react-redux";
  import { userLogout } from "../redux/actions/userActions";
  
  const ListItem = (props) => {
    return (
      <View style={styles.listItem}>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
          Amount: {props.amount}, date: {props.date}{" "}
        </Text>
      </View>
    );
  };
  
  export const SettingsScreen = () => {

    const dispatch = useDispatch();
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={2}
          style={styles.container}
        >
          <View style={styles.logoSpace}>
          <Button
            style={styles.button}
            size="lg"
            onPress={() => dispatch(userLogout())}
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
              Log out
        </Button>

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
      justifyContent: "center",
      alignItems: "center",
      padding: "5%",
    },
    logoSpace: {
      alignSelf: "stretch",
      backgroundColor: "#06D6A0",
      borderRadius: 40
    },
    textSpace: {
      flex: 0.2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    listItem: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlignVertical: "center",
        borderRadius:15,
        backgroundColor: "grey",
        marginTop: "2%",
        padding: "2.5%"

    },
    title: {
      fontWeight: "bold",
      fontSize: 20,
    },
    image: {
      resizeMode: "contain",
      maxHeight: "100%",
      maxWidth: "100%"
    },
    formSpace: {
      flex: 1,
      alignSelf: "stretch",
    },
    text: { textAlign: "center" },
  });
  