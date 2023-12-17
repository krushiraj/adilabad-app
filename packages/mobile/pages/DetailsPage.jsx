import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const DetailsPage = ({ route }) => {
  const { item } = route.params;
  const [user] = useContext(UserContext);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  const itemData = {
    image: { uri: "https://via.placeholder.com/200" }, // Replace with the actual image source
    title: "Item Title", // Replace with the actual item title
    category: "Item Category", // Replace with the actual item category
    description: "Item Description", // Replace with the actual item description
    ...item,
  };

  itemData.media = [{ url: itemData.coverImage }, ...itemData.media];

  const openLink = (link) => {
    Linking.openURL(link);
  };

  const makeCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <>
      <StatusBar style="auto" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Image
          source={{ uri: itemData.media[selectedMediaIndex].url }}
          style={styles.selectedMedia}
        />
        <ScrollView horizontal>
          {itemData.media.map((media, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedMediaIndex(index)}
            >
              <Image
                key={index}
                source={{ uri: media.url }}
                style={[
                  styles.mediaItem,
                  selectedMediaIndex === index && styles.selectedMediaItem,
                ]}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={styles.title}>{itemData.name}</Text>
        <Text style={styles.category}>{itemData.category.name}</Text>
        <Text style={styles.address}>
          <Ionicons name="home-outline" size={16} /> {itemData.address}
        </Text>
        <Text style={styles.description}>{itemData.description}</Text>
        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => openLink(itemData.links.whatsapp)}>
            <Ionicons
              name="logo-whatsapp"
              size={35}
              color="green"
              style={styles.linkIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink(itemData.links.facebook)}>
            <Ionicons
              name="logo-facebook"
              size={35}
              color="blue"
              style={styles.linkIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink(itemData.links.instagram)}>
            <Ionicons
              name="logo-instagram"
              size={35}
              color="purple"
              style={styles.linkIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink(itemData.links.youtube)}>
            <Ionicons
              name="logo-youtube"
              size={35}
              color="red"
              style={styles.linkIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink(itemData.links.twitter)}>
            <Ionicons
              name="logo-twitter"
              size={35}
              color="lightblue"
              style={styles.linkIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink(itemData.links.email)}>
            <Ionicons
              name="mail"
              size={35}
              color="gray"
              style={styles.linkIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink(itemData.links.website)}>
            <Ionicons
              name="globe"
              size={35}
              color="black"
              style={styles.linkIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.linksContainer}>
          {itemData.phoneNumbers.map((phoneNumber, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => makeCall(phoneNumber)}
              style={styles.phoneNumber}
            >
              <Ionicons
                name="call"
                size={24}
                color="green"
                style={styles.linkIcon}
              />
              <Text style={{ fontSize: 20, textDecorationLine: "underline" }}>
                {phoneNumber}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  mediaItem: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  selectedMedia: {
    width: 250,
    height: 250,
    marginVertical: 10,
  },
  selectedMediaItem: {
    borderWidth: 2,
    borderColor: "red",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 5,
  },
  category: {
    fontSize: 18,
    marginBottom: 5,
  },
  address: {
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  linkIcon: {
    marginHorizontal: 5,
  },
  phoneNumber: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
});

export default DetailsPage;
