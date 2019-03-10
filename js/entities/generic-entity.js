var entity = function(x,y) {
    this._x = x;
    this._y = y;
    this._draw();
    this._speed = 75;
}
entity.prototype.getSpeed = function() { return this._speed; }
entity.prototype.setSpeed = function(set) { this._speed = set };
entity.prototype.act = function() {
    var x = Game.player.getX();
    var y = Game.player.getY();
    var passableCallback = function(x,y) {
        return (x+","+y in Game.map);
    }
    var astar = new ROT.Path.AStar(x,y,passableCallback, {topology:4});
    var path = [];
    var pathCallback = function(x,y) {
        path.push([x,y]);
    }
    astar.compute(this._x, this._y,pathCallback);
    path.shift();
    if(path.length <= 1) {
        Game.engine.lock();
        addToLog(`<b>Game over!</b>`);
    } else {
        x = path[0][0];
        y = path[0][1];
        Game.display.draw(this._x,this._y, [".", Game.map[this._x+","+this._y]]);
        this._x = x;
        this._y = y;
        this._draw();
    }
}
entity.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "e", "red");
}