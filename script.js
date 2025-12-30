// Grab references to DOM elements we will interact with
const saveButton = document.getElementById("submit");
const inputBox = document.getElementById("pokename");
const pokeCard = document.getElementById("pokecard");

// Utility function to clear the input field
// (Note: this currently targets "inputBox" by id, but the actual id is "pokename")
function clearInput() {
  document.getElementById("inputBox").value = "";
}

// Listen for a click on the submit button
saveButton.addEventListener("click", () => {
  // Create a span to hold the Pokémon name entered by the user
  // (This element is created but not currently appended to the DOM)
  let poke_name = document.createElement("span");
  poke_name.textContent = inputBox.value;

  // Fetch Pokémon data from the public PokéAPI using the user input
  fetch(`https://pokeapi.co/api/v2/pokemon/${inputBox.value}`)
    .then((response) => {
      // Convert the HTTP response into a usable JS object
      return response.json();
    })
    .then((data) => {
      // Log full API response for debugging / exploration
      console.log(data);

      // Create and display the Pokémon's name
      const displayName = document.createElement("span");
      displayName.className = "displayName";
      displayName.textContent = `Name: ${data.species.name}`;

      // Create and display the Pokémon's sprite image
      const img = document.createElement("img");
      img.src = data.sprites.front_default;
      img.className = "img";
      img.alt = data.name;

      // Create and display the Pokémon's primary type
      const pokeType = document.createElement("span");
      pokeType.className = "pokeType";
      pokeType.textContent = `Type: ${data.types[0].type.name}`;

      //
      const statOne = document.createElement("span");
      statOne.className = "statOne";
      statOne.textContent = data.moves[0].move.name;

      const statTwo = document.createElement("span");
      statTwo.className = "statTwo";
      statTwo.textContent = data.moves[1].move.name;

      const statThree = document.createElement("span");
      statThree.className = "statThree";
      statThree.textContent = data.moves[2].move.name;

      const statFour = document.createElement("span");
      statFour.className = "statFour";
      statFour.textContent = data.moves[3].move.name;

      const statContainer = document.createElement("div");
      statContainer.className = "statContainer";

      statContainer.append("Moves: ", statOne, statTwo, statThree, statFour);

      // Show all Pokémon info on the card container
      pokeCard.append(displayName, img, pokeType, statContainer);
    });

  // Clear the input field after submission
  inputBox.value = "";

  // Clear the card before rendering new Pokémon data
  // (Note: this runs immediately, before fetch completes)
  pokeCard.innerHTML = "";
});
