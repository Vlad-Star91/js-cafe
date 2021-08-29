import cafe from "./classCafe.js"
import createOrderList from "./order-list.js"
import tablesTmp from "../templates/table-tmp.hbs"


const refs = {
    body: document.body,
    servicePanel: document.createElement('section'),
    tableList: document.createElement('ul'),
}
refs.servicePanel.insertAdjacentElement("afterbegin", refs.tableList);
refs.body.insertAdjacentElement("afterbegin", refs.servicePanel);
console.log(refs.body);

cafe.checkTables()

const tables = cafe.presentWorkers[0].tables;
console.log(tables);

const itemsMarkup = tablesTmp({ tables: tables })

const handleOpenOrder = (e) => {
    if (e.target.nodeName !== "BUTTON") return;
    const item = e.target.closest("li");
    const tableNum = item.dataset.id
     createOrderList(tableNum, refs.servicePanel)
}

refs.tableList.insertAdjacentHTML("afterbegin", itemsMarkup)

refs.tableList.addEventListener('click', handleOpenOrder)