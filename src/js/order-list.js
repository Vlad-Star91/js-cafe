import cafe from "./classCafe.js"

const orderItemsMarkup = cafe.menu.reduce((acc, el) => {
    return (acc + `<li id="${el.id}">
        <span> ${el.name} </span>
        <span> 0 </span>
        <button type="button" data-action="add">+</button>
        <button type="button" data-action="remove">-</button>
        <button type="button" data-action="reset">reset</button>
    </li>`);
}, '')
 
const createOrderList = (tableNum, parentNode) => {
    const markup = `
<h2> Stol - ${tableNum} </h3>
<ul>
   ${orderItemsMarkup}
</ul>
`;
    parentNode.insertAdjacentHTML("beforeend", markup);
};
export default createOrderList
