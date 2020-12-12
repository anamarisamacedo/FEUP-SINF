import token from '../services/token';
import jasminConstants from '../services/jasminConstants';

const shipping = {
    async getWaitingDeliveries(){
        const [deliveries, setDeliveries] = useState([]);
        const [isLoading, setLoading] = useState(true);
        const accessToken = token.getToken();
        const apiUrl = jasminConstants.url + "/api/" + jasminConstants.accountKey + "/" + jasminConstants.subscriptionKey + "/shipping/processOrders/1/200?company=SINFP"


        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + accessToken
            }
        };
        const response = await fetch(apiUrl, requestOptions);
        const deliveries = await response.json();
        return deliveries
    },

    async getOP(){
        const accessToken = token.getToken();
        const apiUrl = jasminConstants.url + "/api/" + jasminConstants.accountKey + "/" + jasminConstants.subscriptionKey + "/materialscore/materialsitems";

        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + accessToken
            }
        };
        const response = await fetch(apiUrl, requestOptions);
        const stock = await response.json();

        const [op, setOp] = useState([]);

        stock.map((i) => {
            var opItems=false;
              i.materialsItemWarehouses.map((j) => {
                if (j.warehouse == warehouseName) {
                  opItems=true;
                  currentStock = j.stockBalance;
                }
              });
              if(opItems==true){
                  setOp(op.concat({id: i.itemKey, quantity: currentStock}))
              }
        });

        return op;
    },

    filterDeliveries(deliveries, orderRef){
        return deliveries.filter(delivery => delivery.sourceDocKey == orderRef)
    },

    filterByOP(deliveries, op){
        const [res, setRes] = useState([]);

        deliveries.map((item) => {
            var element = null;
            op.map((opItem) =>{
                if (opItem.id == item.item)
                    element = opItem;
            })
            if (element != null){
                setRes(res.concat({sourceDocKey: item.sourceDocKey, sourceDocLineNumber: item.sourceDocLineNumber, id: element.id, quantity: element.quantity}))
            }
        });

        return res;
    },

    generateDeliveryNote(orderRef){
        var deliveries = this.getWaitingDeliveries;
        deliveries = this.filterDeliveries(deliveries, orderRef);

        var op = this.getOP();
        deliveries.filterByOP(deliveries, OP);

        const [body, setBody] = useState([]);

        deliveries.map((delivery) => {
            setBody(body.concat({
                "companyKey": "SINFP",
                "sourceDocKey": delivery.sourceDocKey,
                "sourceDocLineNumber": delivery.sourceDocLineNumber,
                "quantity": delivery.quantity
            }))
        });

        const apiUrl = jasminConstants.url + "/api/" + jasminConstants.accountKey + "/" + jasminConstants.subscriptionKey + "/shipping/processOrders/SINFP"

        useEffect(() => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + accessToken
                },
                body: JSON.stringify(body)
            };
            fetch(apiUrl, requestOptions)
            .then(response => response.json());
        }, []);
    },

    async getWaitingGoods(){
        const [isLoading, setLoading] = useState(true);
        const accessToken = token.getToken();
        const apiUrl = jasminConstants.url + "/api/" + jasminConstants.accountKey + "/" + jasminConstants.subscriptionKey + "/goodsReceipt/processOrders/1/200?company=SINFP"


        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + accessToken
            }
        };
        const response = await fetch(apiUrl, requestOptions);
        const goods = await response.json();
        return goods
    },

    filterGoods(goods, orderRef){
        return goods.filter(good => good.sourceDocKey == orderRef)
    },

    generateGoodsReceipt(orderRef){
        var goods = this.getWaitingGoods();
        goods = this.filterGoods(goods, orderRef);

        const [body, setBody] = useState([]);

        deliveries.map((delivery) => {
            setBody(body.concat({
                "companyKey": "SINFP",
                "sourceDocKey": delivery.sourceDocKey,
                "sourceDocLineNumber": delivery.sourceDocLineNumber,
                "quantity": delivery.quantity
            }))
        });

        const apiUrl = jasminConstants.url + "/api/" + jasminConstants.accountKey + "/" + jasminConstants.subscriptionKey + "/shipping/processOrders/SINFP"

        useEffect(() => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + accessToken
                },
                body: JSON.stringify(body)
            };
            fetch(apiUrl, requestOptions)
            .then(response => response.json());
        }, []);
    }
}

export default shipping;