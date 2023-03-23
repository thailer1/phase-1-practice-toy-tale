let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
function fetchToys() {
  fetch('http://localhost:3000/toys')
	.then(response => response.json())
	.then(toyArray => toyArray.forEach((toy) => makeToyCard(toy)))
}

fetchToys()

function makeToyCard(toys) {
    
    const div = document.createElement("div")
    div.className = "card"
  
    const h2 = document.createElement("h2")
    h2.textContent = toys.name
  
    const image = document.createElement("img")
    image.src = toys.image
    image.className = "toy-avatar";
    
    const pLikes = document.createElement("p")
    pLikes.textContent = toys.likes
  
    const likeButton = document.createElement("button")
    likeButton.textContent = "like"
    likeButton.className = "like-btn"
    likeButton.setAttribute("id", toys.id)
    likeButton.addEventListener("click", () => {
      const newLikes = +pLikes.textContent + 1
      pLikes.textContent = newLikes
    })
  
    div.append(h2,image, pLikes, likeButton)

    const toyCardContainer = document.querySelector("#toy-collection")

    toyCardContainer.append(div)
  
}

const newToyForm = document.querySelector(".add-toy-form")
newToyForm.addEventListener("submit", handleAddNewToy)

function handleAddNewToy(event) {
  const newToyName = event.target["name"].value
  const newToyImage = event.target["image"].value

  const newToyCard = {
    name: newToyName,
    image: newToyImage,
  }
  event.preventDefault()
  makeToyCard(newToyCard)

  event.target.reset()
}