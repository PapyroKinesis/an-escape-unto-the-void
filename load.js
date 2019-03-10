function loadScript(url)
{    
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}
loadScript('js/vendor/rot.js');
loadScript('js/vendor/jquery-3.3.1.min.js');
loadScript('js/ui/logger.js');
loadScript('js/items/item.js');
loadScript('js/entities/player.js');
loadScript('js/entities/generic-entity.js');
loadScript('js/gfx/tile.js');
loadScript('js/roguemain.js');