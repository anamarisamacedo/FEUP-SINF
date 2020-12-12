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

    filterDeliveries(deliveries, orderRef){
        return deliveries.filter(delivery => delivery.sourceDocKey == orderRef)
    },

    generateDeliveryNote(orderRef){
        var deliveries = this.getWaitingDeliveries;
        deliveries = this.filterDeliveries(deliveries, orderRef);

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