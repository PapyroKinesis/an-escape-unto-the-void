var tiles = document.createElement("img");
tiles.src = "img/s_tileset.png";

var tilemap = {
    layout: "tile",
    bg: "transparent",
    tileWidth: 16,
    tileHeight: 16,
    tileSet: tiles,
    tileMap: {
        "@": [0, 0],
        ".": [0, 16],
        "e": [16, 0],
        "*": [16, 16]
    },
    forceSquareRatio:true
}