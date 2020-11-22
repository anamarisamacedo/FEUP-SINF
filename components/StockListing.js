import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Input, ListItem } from "react-native-elements";

const list = [
  {
    ref: "10150",
    loc: "A1.1.1",
    name: "AMD Ryzen 5 3600",
    stock: "28/50",
  },
  {
    ref: "10151",
    loc: "A1.1.2",
    name: "AMD Ryzen 5 3600X",
    stock: "12/50",
  },
];

const StockListing = (props) => {
  return (
    <View>
      <View style={styles.main}>
        <Input style={styles.text} placeholder={props.idName} />
      </View>
      <View>
        {list.map((list, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{list.name}</ListItem.Title>
              <ListItem.Subtitle>{list.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderColor: "white",
    borderRadius: 7,
    borderWidth: 1,
    color: "white",
  },
  list: {
    backgroundColor: "black",
  },
  text: {
    color: "white",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontSize: 19,
  },
  main: {
    marginTop: 50,
    marginBottom: 40,
  },
});

export default StockListing;
