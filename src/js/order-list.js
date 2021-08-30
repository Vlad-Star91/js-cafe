import cafe from './classCafe.js';
import orderListTmp from '../templates/order-list-tmp.hbs';

export const handleCloseList = parentNode => {
  const removedChild = parentNode.querySelector(`[id]`);
  if (removedChild) {
    parentNode.removeChild(removedChild);
  }
};

const handleSetDishToOrder = e => {
  if (e.target.nodeName !== 'BUTTON' || e.target.dataset.action === 'close')
    return;

  const section = e.target.closest('section');
  const tableNum = +section.id.split('-')[2];
  const item = e.target.closest('li');
  const dishId = item.id;
  const spanQuantity = item.querySelector('.quantity');

  const { action } = e.target.dataset;

  let quantity = Number(spanQuantity.textContent);

  switch (action) {
    case 'add':
      cafe.addDish(tableNum, dishId);
      quantity += 1;
      break;

    case 'remove':
      cafe.removeDish(tableNum, dishId);
      if (quantity > 0) {
        quantity -= 1;
      }
      break;
    case 'reset':
      cafe.resetDish(tableNum, dishId);
      quantity = 0;
      break;
  }
  spanQuantity.textContent = quantity;
};

const createOrderList = (tableNum, parentNode) => {
  const orderTemplateMarkup = orderListTmp({ tableNum, orderList: cafe.menu });

  parentNode.insertAdjacentHTML('beforeend', orderTemplateMarkup);

  const orderListContainer = document.getElementById(`oreder-list-${tableNum}`);
  const btnClose = parentNode.querySelector('[data-action="close"]');

  btnClose.addEventListener('click', e => {
    handleCloseList(parentNode);
  });
  orderListContainer.addEventListener('click', handleSetDishToOrder);
};

export default createOrderList;

// (() => handleCloseList())(event)
// handleCloseList(event)
