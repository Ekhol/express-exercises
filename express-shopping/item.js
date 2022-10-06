const items = require("./fakeDb")

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;

        items.push(this);
    }

    static listAll() {
        return items;
    }

    static updateItem(name, data) {
        let item = Item.find(name);
        if (item === undefined) {
            throw { message: "Not Found", status: 404 }
        }
        item.name = data.name;
        item.price = data.price;

        return item;
    }

    static find(name) {
        const item = items.find(i => i.name === name);
        if (item === undefined) {
            throw { message: "Not Found", status: 404 }
        }
        return item;
    }

    static delete(name) {
        let found = items.findIndex(i => i.name === name);
        if (found === -1) {
            throw { message: "Not Found", status: 404 }
        }
        items.splice(found, 1);
    }
}

module.exports = Item;