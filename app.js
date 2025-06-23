const BASE_URL = "https://randombrawl.vercel.app"; 

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function loadData() {
  try {
    // Obtenemos todos los brawlers
    const brawlers = await fetch(`${BASE_URL}/brawlers`).then(r => r.json());

    // Elegimos uno al azar
    const randomBrawler = pickRandom(brawlers.items);
    const details = await fetch(`${BASE_URL}/brawlers/${randomBrawler.id}`).then(r => r.json());

    const starPower = pickRandom(details.starPowers)?.name ?? "Sin habilidad estelar";
    const gadget = pickRandom(details.gadgets)?.name ?? "Sin gadget";
    const gear = pickRandom(details.gears)?.name ?? "Sin refuerzos";

    // Elegimos un mapa al azar
    const events = await fetch(`${BASE_URL}/events`).then(r => r.json());
    const randomEvent = pickRandom(events.items.filter(event => event.slot.name.includes("Trophies")));

    // Mostramos en la página
    document.getElementById("brawler-name").innerText = randomBrawler.name;
    document.getElementById("star-power").innerText = `Habilidad estelar: ${starPower}`;
    document.getElementById("gadget").innerText = `Gadget: ${gadget}`;
    document.getElementById("gear").innerText = `Refuerzo: ${gear}`;
    document.getElementById("event-name").innerText = `Modo de juego: ${randomEvent.slot.name}`;
    document.getElementById("map-name").innerText = `Mapa actual: ${randomEvent.map.name}`;
  } catch (error) {
    console.error(error);
    document.getElementById("brawler-name").innerText = "Error al cargar datos.";
    document.getElementById("star-power").innerText = error.message;
  }
}

document.getElementById("reload").addEventListener("click", loadData);

// Carga inicial
loadData();