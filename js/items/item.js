function randomItem() {
    var symbol = "";
    symbol = itemNames[Math.floor(Math.random()*itemNames.length)].symbol;
    return symbol;
}
class Item {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
        this.weight = 1;
    }
    name = "";
    symbol = "";
    weight = "";
    getName() {
        return this.name;
    }
    getSymbol() {
        return this.symbol;
    }
}
var itemNames = [
    new Item("grail", "*"),
    new Item("potion", "p")
];

class Chest extends Item {
    constructor() {
        super("chest", "c");
        this.createContent();
    }
    createContent() {

    }
    contents = { };
}
itemNames.push(new Chest());
class Weapon extends Item {
    constructor(name) {
        super(name, "x");
    }
    weaponNames = [
        "shortsword", "claymore", "longsword",
        "machete", "dao",
        "dagger", "knife", "gauntlets"
    ];
}