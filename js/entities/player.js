var Player = function(x, y) {
    this._x = x;
    this._y = y;
    this._draw();
    this.inventory = [ ];
}
Player.prototype.getSpeed = function() { return 100; }
Player.prototype.getX = function() { return this._x; }
Player.prototype.getY = function() { return this._y; }
Player.prototype.act = function() {
    Game.engine.lock();
    window.addEventListener("keydown", this);
}
Player.prototype.handleEvent = function(e) {
    var code = e.keyCode;
    switch(code) {
        case 13: //Enter
        case 32: //Space
            this._checkItem(); 
            return;
        case 186: //Semicolon
            this._pickUp();
            return;
        case 73: //I
            this._inventory();
            return;
    }
    var keyMap = {};
    keyMap[38] = 0;
    keyMap[33] = 1;
    keyMap[39] = 2;
    keyMap[34] = 3;
    keyMap[40] = 4;
    keyMap[35] = 5;
    keyMap[37] = 6;
    keyMap[36] = 7;

    if(!(code in keyMap)) { return; }
    
    var dir = ROT.DIRS[8][keyMap[code]];
    var newX = this._x+dir[0];
    var newY = this._y+dir[1];
    var newKey = newX + "," + newY;
    if(!(newKey in Game.map)) { return; }

    Game.display.draw(this._x, this._y, [".", Game.map[this._x+","+this._y]]);
    this._x = newX;
    this._y = newY;
    this._draw();
    window.removeEventListener("keydown", this);
    Game.engine.unlock();
}
Player.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "@", "#ff0");
}
Player.prototype._checkItem = function() {
    var key = this._x +","+this._y;
    for(var i = 0; i < itemNames.length; i++) {
        if(Game.map[key] == itemNames[i].getSymbol()) {
            chat(`There's a ${itemNames[i].name}.`);
            return;
        }
    }
    chat("There's nothing.");
}
Player.prototype._pickUp = function() {
    var key = this._x+","+this._y;
    for(var i = 0; i < itemNames.length; i++) {
        if(Game.map[key] == itemNames[i].getSymbol()) {
            this.inventory.push(itemNames[i]);
            chat(`You picked up the ${itemNames[i].name}.`);
            Game.map[key] = ".";
            return;
        }
    }
    chat(`There's nothing.`);
}
Player.prototype._inventory = function() {
    for(var i = 0; i < itemNames.length; i++) {
        var count = 0;
        for(var j = 0; j < this.inventory.length; j++) {
            if(this.inventory[j].name == itemNames[i].name) {
                count++;
            }
        }
        if(count > 0) {
            addToLog(`${itemNames[i].name}(s): ${count}`);
        }
    }
}