import { colors, StarWarsURL } from "./constants.js";
import { StarWars } from "./StarWars.js";

const swContainer = document.querySelector(".sw-container");
const searchInput = document.querySelector("#search-input");
const StarWars = new StarWars(starwarsURL);

window.addEventListener('load', loadNextPageAndRender);
document.querySelector("#load-button").addEventListener("click", loadNextPageAndRender);
searchInput.addEventListener("input", () => {
  swContainer.innerHTML = "";
  StarWars.findCharachtersByName(searchInput.value).forEach(createStarWarsBox);
});

async function loadNextPageAndRender() {
  const charachters = await StarWars.getNextPage();
  charachters.forEach(createStarWarsBox);
}

function createStarWarsBox(StarWars) {
  const { name, weight } = StarWars;
  const id = StarWars.id.toString().padStart(3, "0");
  const type = StarWars.types[0].type.name

  const StarWarsEl = document.createElement("div");
StarWarsEl.classList.add("sw-box");
StarWarsEl.style.backgroundColor = colors[type];
StarWarsEl.innerHTML = buildHtmlOfPokemon(id, name, weight, type)
  swContainer.appendChild(StarWarsEl);
}

function buildHtmlOfCharachter(id, name, weight, type) {
  return `
  <img
    class="sw-img"
    src="https://assets.charachter.com/assets/cms2/img/StarWars/full/${id}.png"
    alt="${name} Character"
  />
  <h3 class="sw-name">${name}</h3>
  <p class="sw-id"># ${id}</p>
  <p class="sw-weight">${weight} kg</p>
  <p class="sw-type">Type : ${type}</p>
  `
}
