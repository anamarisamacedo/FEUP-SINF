import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from "react-native";
import BackButton from "../components/BackButton";
import Navbar from '../components/Navbar';

const accountKey = "242968"; // TODO: put your account key here
const subscriptionKey = "242968-0001"; // TODO: put your account key here
const urlJ = "https://my.jasminsoftware.com/";
const accessToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDY3NDk3OTUsImV4cCI6MTYwNjc2NDE5NSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.Zhc0-5xPiNiuI---U-nq72UhFEBsKpv_qMWSnGUisUGn5umR35H9bk35UZwwBjZfNSnPXRJQjxlE5T_taEF7refWavrewpTuXCdelFGhcSo5AdJLpcVLEAUrBgjHbPRe23Z1g_c2GABYgiwrUg5LrIc64CZs0mhSG4VyOHcQZr8Qin7MPy9CRm0WpDHcgDj2c_gggOY80eP2tgtxpQlFXiN-nqgCkKLlqmJIJe413jgqFGQpkFfTEo1HPFMFMT1fpaGbIlZQN3z2HKOBkMCu55Yz9iWLjon4S2l2fsizddG6YLQ7OgW20h0yhym_nWFApaBFyp5m-RCnpRJ2QMIrpw"; // TODO: put the authorization access token here (this should be obtained previously)

const items = [
  {
    ref: "10150",
    loc: "A.1.1.1",
    name: "AMD Ryzen 5 3600",
    pqty: "3/3",
  },
  {
    ref: "10151",
    loc: "A.1.1.2",
    name: "AMD Ryzen 5 3600X",
    pqty: "0/4",
  },
  {
    ref: "10152",
    loc: "A.1.1.3",
    name: "AMD Ryzen 7 3700",
    pqty: "2/3",
  },
  {
    ref: "10153",
    loc: "A.1.1.4",
    name: "AMD Ryzen 7 3700X",
    pqty: "2/2",
  },
];

export default function OrderDetails({ navigation, route }) {
  const {id, order} = route.params;

  const [orderJ, setOrder] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const title = "Order Details";
  const accessToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDY3NDk3OTUsImV4cCI6MTYwNjc2NDE5NSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORjA0WUFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.Zhc0-5xPiNiuI---U-nq72UhFEBsKpv_qMWSnGUisUGn5umR35H9bk35UZwwBjZfNSnPXRJQjxlE5T_taEF7refWavrewpTuXCdelFGhcSo5AdJLpcVLEAUrBgjHbPRe23Z1g_c2GABYgiwrUg5LrIc64CZs0mhSG4VyOHcQZr8Qin7MPy9CRm0WpDHcgDj2c_gggOY80eP2tgtxpQlFXiN-nqgCkKLlqmJIJe413jgqFGQpkFfTEo1HPFMFMT1fpaGbIlZQN3z2HKOBkMCu55Yz9iWLjon4S2l2fsizddG6YLQ7OgW20h0yhym_nWFApaBFyp5m-RCnpRJ2QMIrpw"; // TODO: put the authorization access token here (this should be obtained previously)
  //const accessToken = token.getToken();
  useEffect(() => {
    const apiUrl = urlJ+"/api/" + accountKey+ "/" + subscriptionKey + "/sales/orders/" + order.orderId;
    fetch(apiUrl, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + accessToken
      }})
      .then((response) => response.json())
      .then((orderJ) => {setOrder(orderJ), console.log(orderJ)})
      .finally(setLoading(false));
  }, [])

  const title = "Order " + orderJ.naturalKey + " " + id + " " + order.id;
  const subtitle = "Date: " + order.date + " Status: " + order.status;
  const items = orderJ.documentLines.
  return (
    <View style={styles.main}>
      <Navbar navigation={navigation}/>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.subtitle}>
          <Text style={styles.subtext}>{subtitle}</Text>
        </View>
        <View>
          <View style={styles.row}>
            <View style={styles.refColumn}>
              <Text style={styles.header}>{"Ref"}</Text>
            </View>
            <View style={styles.locColumn}>
              <Text style={styles.header}>{"Loc"}</Text>
            </View>
            <View style={styles.nameColumn}>
              <Text style={styles.header}>{"Name"}</Text>
            </View>
            <View style={styles.pqtyColumn}>
              <Text style={[styles.header, {textAlign: 'center'}]}>{"P/Qty"}</Text>
            </View>
          </View>
          {items.map((i) => {
            return (
              <View style={styles.row} key={i}>
                <View style={styles.refColumn}>
                  <Text style={styles.textTable}>{i.ref}</Text>
                </View>
                <View style={styles.locColumn}>
                  <Text style={styles.textTable}>{i.loc}</Text>
                </View>
                <View style={styles.nameColumn}>
                  <Text style={styles.textTable}>{i.name}</Text>
                </View>
                <View style={styles.pqtyColumn}>
                  <Text style={[styles.textTable, {textAlign: 'center'}]}>{i.pqty}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.bottom}>
        <BackButton onPress={() => navigation.goBack()}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    alignItems: "center",
  },
  main: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "black",
  },
  container: {
    justifyContent: "space-evenly",
    marginHorizontal: 15,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
    alignItems: "center",
  },
  list: {
    backgroundColor: "black",
  },
  text: {
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 19,
  },
  subtext: {
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontSize: 15,
  },
  title: {
    marginTop: 50,
    marginBottom: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  subtitle: {
    marginBottom: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  header: {
    textAlign: "left",
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontWeight: "bold",
    fontSize: 16,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  textTable: {
    textAlign: "left",
    color: "#d3d3d3",
    fontFamily: "Corbel",
    fontStyle: "normal",
    fontSize: 16,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  row: {
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "darkgray",
    marginTop: 4,
  },
  refColumn: { flexDirection: "column", flex: 0.6 },
  locColumn: { flexDirection: "column", flex: 0.6 },
  nameColumn: { flexDirection: "column", flex: 1.5 },
  pqtyColumn: { flexDirection: "column", flex: 0.5 },
});
