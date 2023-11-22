import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserContext } from "../contexts/UserContext";

const AboutPage = () => {
  const [user] = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.centeredText}>
        Hello <Text style={styles.boldText}>{user?.name || "Adilbadi"}</Text>.
        This will be your one stop solution for all available services in{" "}
        <Text style={styles.boldText}>Adilabad</Text>
      </Text>
      <Text style={styles.centeredText}>
        Adilabad App made with ❤️ for Adilabad People
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  centeredText: {
    textAlign: "center",
    marginVertical: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default AboutPage;
