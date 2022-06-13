import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    FlatList,
  } from "react-native";
  import { VStack } from "native-base";
  import { LoginForm } from "../components/LoginForm";
  import { KeyboardAvoidingView } from "react-native";
  
  const ListItem = (props) => {
    return (
      <View style={styles.listItem}>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
          {props.amount}🌟 arrived on {props.date}{" "}
        </Text>
      </View>
    );
  };
  
  export const OrdersScreen = () => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={2}
          style={styles.container}
        >
          <View style={styles.logoSpace}>
            <Image
              style={styles.image}
              source={require("../../assets/orders.png")}
            />
          </View>
  
  
          <View style={styles.formSpace}>
            <FlatList
              data={[
                { amount: "8.99", date: "2022-02-02", key: "item1" },
                { amount: "8.99", date: "2022-02-02", key: "item2" },
                { amount: "4.50", date: "2022-01-04", key: "item3" },
                { amount: "3.99", date: "2019-02-02", key: "item4" },
                { amount: "6.00", date: "2019-02-01", key: "item5" },
                { amount: "0.99", date: "2019-02-02", key: "item6" },
              ]}
              renderItem={({ item, index, separators }) => (
                <ListItem amount={item.amount} date={item.date} key={index} />
              )}
            />
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
      flex: 0.8,
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
        backgroundColor: "#80DED9",
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
  