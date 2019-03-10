const node = document.getElementById("log");
let current = false;

function add(arguments) {
    // let str = String.format.apply(String, arguments);
	// while (1) {
	// 	let matched = false;
	// 	str = str.replace(/%([cb]?){([^}]*)}/, (match, type, color) => {
	// 		matched = true;
	// 		type = {c:"color", b:"background-color"}[type];
	// 		return (color ? `<span style="${type}: ${color}">` : "</span>");
	// 	});
	// 	if (!matched) { break; }
	// }
	
	let item = document.createElement("span");
	item.className = "hidden";
	item.innerHTML = arguments;
	current.appendChild(item);
	//item.offsetWidth;
	item.className = "visible";
}
function pause() {
	if (current && current.childNodes.length == 0) { return; }
	current = document.createElement("p");
	node.appendChild(current);
	
	while (node.childNodes.length > 20) {
		node.removeChild(node.firstChild);
	}
}
function addToLog(arg) {
	for (let i=0;i<arguments.length;i++) {
		add(`<span class="fade-in">${arg}</span>`);
	}
	pause();
}
function chat(name, message) {
	if(message != null) {
		addToLog(`<b>${name}</b>:<br>${message}`);
	}
	else {
		addToLog(`<b>Self</b>:<br>${name}`);
	}
}
pause();
addToLog(`Use arrows keys to move.`);
addToLog(`Enter/Space to inspect.`);
addToLog(`Press ';' to pick up items.`);
addToLog(`Press I to show your inventory.`);