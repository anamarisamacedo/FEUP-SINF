import token from "../services/token";
import jasminConstants from "../services/jasminConstants";
const axios = require("axios");
const accessToken = token.getToken();
const shipping = {
  async getWaitingDeliveries() {
    const apiUrl =
      jasminConstants.url +
      "/api/" +
      jasminConstants.accountKey +
      "/" +
      jasminConstants.subscriptionKey +
      "/shipping/processOrders/1/200?company=SINFP";

    var deliveries;
    await axios
      .get(apiUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => (deliveries = response.data));

    return deliveries;
  },

  async getOP() {
    const apiUrl =
      jasminConstants.url +
      "/api/" +
      jasminConstants.accountKey +
      "/" +
      jasminConstants.subscriptionKey +
      "/materialscore/materialsitems";

    var stock;
    await axios
      .get(apiUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => (stock = response.data));

    var op = [];
    var key;
    stock.map((i) => {
      key = i.itemKey;
      i.materialsItemWarehouses.map((j) => {
        if (j.warehouse == "OP") {
          op.push({ id: key, quantity: j.stockBalance });
        }
      });
    });
    return op;
  },

  filterDeliveries(deliveries, orderRef) {
    return deliveries.filter((delivery) => delivery.sourceDocKey == orderRef);
  },

  filterByOP(deliveries, op) {
    var res = [];

    deliveries.map((item) => {
      var element = null;
      op.map((opItem) => {
        if (opItem.id == item.item) element = opItem;
      });
      if (element != null) {
        res.push({
          sourceDocKey: item.sourceDocKey,
          sourceDocLineNumber: item.sourceDocLineNumber,
          id: element.id,
          quantity: element.quantity,
        });
      }
    });

    return res;
  },

  async generateDeliveryNote(orderRef) {
    var deliveries = await this.getWaitingDeliveries();

    deliveries = await this.filterDeliveries(deliveries, orderRef);

    var op = await this.getOP();
    deliveries = await this.filterByOP(deliveries, op);
    
    var body = [];

    deliveries.map((delivery) => {
      body.push({
        companyKey: "SINFP",
        sourceDocKey: delivery.sourceDocKey,
        sourceDocLineNumber: delivery.sourceDocLineNumber,
        quantity: delivery.quantity,
      });
    });

    const apiUrl =
      jasminConstants.url +
      "/api/" +
      jasminConstants.accountKey +
      "/" +
      jasminConstants.subscriptionKey +
      "/shipping/processOrders/SINFP";

    await axios({
    method: "POST",
    url: apiUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    data: JSON.stringify(body)}).then((response) => console.log(response.status));
  },

  async getWaitingGoods() {
    const apiUrl =
      jasminConstants.url +
      "/api/" +
      jasminConstants.accountKey +
      "/" +
      jasminConstants.subscriptionKey +
      "/goodsReceipt/processOrders/1/200?company=SINFP";

    var goods;
    await axios.get(apiUrl, {headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      }})
      .then((response) => goods = response.data)
    return goods;
  },

  filterGoods(goods, orderRef) {
    return goods.filter((good) => good.sourceDocKey == orderRef);
  },

  async generateGoodsReceipt(orderRef) {
    var goods = await this.getWaitingGoods();
    goods = await this.filterGoods(goods, orderRef);

    var body = [];

    goods.map((good) => {
      body.push({
        companyKey: "SINFP",
        sourceDocKey: good.sourceDocKey,
        sourceDocLineNumber: good.sourceDocLineNumber,
        quantity: good.quantity,
      });
    });

    const apiUrl =
      jasminConstants.url +
      "/api/" +
      jasminConstants.accountKey +
      "/" +
      jasminConstants.subscriptionKey +
      "/shipping/processOrders/SINFP";
    axios({
        method: "POST",
        url: apiUrl,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      data: JSON.stringify(body)
    }).then((response) => console.log(response.status));
  },
};

export default shipping;
