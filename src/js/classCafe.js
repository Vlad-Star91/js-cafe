import menu from './db/menu.js';
import tables from './db/tables.js';
import workers from './db/workers.js';

// Нужно реализовать работу кафе:
//
// 1. Написать функцию, которая из списка официантов(массив объектов) выбрает официантов,
// которые  есть на смене по свойству isPresent: true; и записывает их всех в массив, который
// хранится в переменной presentWorkers = [].
// Пример:
// concole.log(presentWorkers); // [{name: "Ann", isPresent: true, tables: [], tips: 0},
// {name: "Bob", isPresent: true, tables: [], tips: 0}]
//

class Cafe {
  constructor({ menu, tables, workers }) {
    this.menu = menu;
    this.tables = tables;
    this.workers = workers;
  }

  getPresentWorkers() {
    this.presentWorkers = this.workers.filter(worker => worker.isPresent);
  }
  checkTables() {
    this.getPresentWorkers();
    this.tables.forEach((table, idx) => {
      const workerIndex = idx % this.presentWorkers.length;
      table.service = this.presentWorkers[workerIndex].name;
      this.presentWorkers[workerIndex].tables.push(table.table);
    });
  }
  getOrder(tableNum, dishId, quantity) {
    const curTable = this.findTable(tableNum);
    if (!curTable.currentOrder) {
      curTable.currentOrder = {};
    }
    if (curTable.currentOrder[dishId]) {
      return (curTable.currentOrder[dishId] += quantity);
    }
    curTable.currentOrder = { ...curTable.currentOrder, [dishId]: quantity };
  }

  findTable(tableNum) {
    return this.tables.find(table => table.table === tableNum);
  }

  addDish(tableNum, dishId) {
    const curTable = this.findTable(tableNum);
    if (!curTable.currentOrder) {
      curTable.currentOrder = {};
    }
    if (curTable.currentOrder[dishId]) {
      return (curTable.currentOrder[dishId] += 1);
    }
    curTable.currentOrder = { ...curTable.currentOrder, [dishId]: 1 };
  }

  removeDish(tableNum, dishId) {
    const curTable = this.findTable(tableNum);
    if (!curTable.currentOrder || !curTable.currentOrder[dishId]) {
      return;
    }
    return (curTable.currentOrder[dishId] -= 1);

    curTable.currentOrder = { ...curTable.currentOrder, [dishId]: 0 };
  }

  resetDish(tableNum, dishId) {
    const curTable = this.findTable(tableNum);
    if (!curTable.currentOrder) return;
    if (!curTable.currentOrder[dishId]) return;
    delete curTable.currentOrder[dishId];
  }

  prepareDish(tableNum) {
    const curTable = this.findTable(tableNum);
    if (!curTable.currentOrder) return;
    const menuMap = this.setMenuMap();
    console.log(menuMap);
    const res = Object.entries(curTable.currentOrder);
    const newRes = res.map(
      ([dishId, quantity]) => `${menuMap[dishId].name} - ${quantity}`,
    );

    curTable.prepearing = newRes;
  }

  findDish(dishId) {
    return this.menu.find(dish => dish.id === dishId);
  }

  setMenuMap() {
    const menuMap = menu.reduce((acc, el) => {
      acc[el.id] = el;
      return acc;
    }, {});
    return menuMap;
  }

  removeDishFinish(tableNum, dishName, quantity) {
    const curTable = this.findTable(tableNum);
    console.log(curTable);
    curTable.prepearing = curTable.prepearing
      .map(el => {
        const [name, quant] = el.split(' - ');
        if (name === dishName) {
          const newQuantity = Number(quant) - quantity;
          return name + ' - ' + newQuantity;
        }
        return el;
      })
      .filter(el => Number(el.split(' - ')[1]) > 0);
  }
}

const cafe = new Cafe({ menu, tables, workers });
export default cafe;
