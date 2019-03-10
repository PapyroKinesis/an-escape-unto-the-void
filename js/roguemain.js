var Game = {
    display: null,
    map: {},
    engine: null,
    player: null,
    entity: null,

    init: function() {
        this.display = new ROT.Display();
        var screen = document.createElement("div"[id="screen"]);
        document.body.insertBefore(screen, document.getElementById("inv"));
        screen.appendChild(this.display.getContainer());
        this._generateMap();

        var scheduler = new ROT.Scheduler.Speed();
        scheduler.add(this.player, true);
        scheduler.add(this.entity, true);
        this.engine = new ROT.Engine(scheduler);
        this.engine.start();
    },
    _generateMap: function() {
        var room = new ROT.Map.Digger();
        var freeCells = [];
        
        var digCallback = function(x,y,value) {
            if (value) { return; }
    
            var key = x+","+y;
            this.map[key] = ".";
            freeCells.push(key);
        }
        room.create(digCallback.bind(this));
        this._generateItems(freeCells);
        this._drawWholeMap();
        if(this.player == null) {
            this.player = this._createBeing(Player, freeCells);
        }
        this.entity = this._createBeing(entity, freeCells);
    },
    _createBeing: function(what, freeCells) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        return new what(x, y);
    },
    _generateItems: function(freeCells) {
        for(var i = 0; i < 10; i++) {
            var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            var key = freeCells.splice(index, 1)[0];
            this.map[key] = randomItem();
        }
    },
    _drawWholeMap: function() {
        for(var key in this.map) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            this.display.draw(x, y, [".", this.map[key]]);
        }
    }
}