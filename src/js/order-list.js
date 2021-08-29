import cafe from "./classCafe.js"
import orderListTmp from "../templates/order-list-tmp.hbs"


const createOrderList = (tableNum, parentNode) => {
    
    const orderTemplateMarkup = orderListTmp({ tableNum, orderList: cafe.menu });
    parentNode.insertAdjacentHTML("beforeend", orderTemplateMarkup);
};
export default createOrderList
