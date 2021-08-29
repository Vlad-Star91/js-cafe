import cafe from "./classCafe.js"
import createOrderList from "./order-list.js"

const refs = {
    body: document.body,
    servicePanel: document.createElement('section'),
    tableList: document.createElement('ul'),
}
refs.servicePanel.insertAdjacentElement("afterbegin", refs.tableList);
refs.body.insertAdjacentElement("afterbegin", refs.servicePanel);
console.log(refs.body);

cafe.checkTables()


const getTableMarkup = (tableNum) => {
    return `
<li class="table" data-id="${tableNum}">
  <h3 class="table-title">Table - ${tableNum}</h3>
  <button class="table-btn" data-action="open-order">Open order list</button>
</li>
`
}
console.log(getTableMarkup(3));

const tables = cafe.presentWorkers[0].tables;
// console.log(cafe.presentWorkers);
// console.log(cafe.presentWorkers[0].tables);

// const itemsMarkup = tables.map((elem) => {
//     return getTableMarkup(elem)
// }).join("");
// console.log(itemsMarkup);

const itemsMarkup = tables.reduce((acc, el) => {
    return acc + getTableMarkup(el);
}, '')

const handleOpenOrder = (e) => {
    if (e.target.nodeName !== "BUTTON") return;
    const item = e.target.closest("li");
    const tableNum = item.dataset.id
     createOrderList(tableNum, refs.servicePanel)
}

refs.tableList.insertAdjacentHTML("afterbegin", itemsMarkup)

refs.tableList.addEventListener('click', handleOpenOrder)