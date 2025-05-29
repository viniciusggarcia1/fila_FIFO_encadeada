//Creating a new node
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

//Creating a new queue
class Queue {
  constructor() {
    this.start = null;
    this.end = null;
    this.size = 0;
  }

  //This function will add elements (nodes) to the queue
  enqueue(value) {
    const node = new Node(value);
    if (this.start === null) {
      this.start = node;
      this.end = node;
    } else {
      this.end.next = node;
      this.end = node;
    }
    this.size++;
  }

  //This function will remove elements (nodes) from the queue
  dequeue() {
    if (this.start === null) {
      return null;
    }
    const value = this.start.value;
    this.start = this.start.next;
    this.size--;

    if (this.size === 0) {
      this.end = null;
    }
    return value;
  }

  //This function will return the size of the queue
  getSize() {
    return this.size;
  }

  //This function will check if the queue is empty or not
  isEmpty() {
    return this.size === 0;
  }

  //This function will return the first element of the queue
  showStart() {
    if (this.start) {
      return this.start.value;
    } else {
      return null;
    }
  }
}

// This function will print all elements from the queue
function printQueue(queue) {
    let current = queue.start;
    const elements = [];
    while (current) {
        elements.push(current.value);
        current = current.next;
    }
    console.log(elements);
}

// Now we will develop the Rick and Morty Queue, usind the Rick and Morty API

const charsContainer = document.querySelector(".chars-container");
const API = "https://rickandmortyapi.com/api";

const defaultFilters = {
    name: "",
    species: "",
    gender: "",
    status: "",
    page: 1
};

async function getCharacters({name, species, gender, status, page=1}) {
    const response = await fetch(
        `${API}/character/?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`
    );

    const characters = await response.json();

    return characters.results;
}

const charsContainerQueue = document.querySelector(".chars-queue");

const myQueue = new Queue();

function updateQueueDisplay() {
    charsContainerQueue.innerHTML = "";
    let current = myQueue.start;
    while (current) {
        charsContainerQueue.innerHTML += `
            <div class="chars">
                ${current.value}
            </div>
        `;
        current = current.next;
    }
}

async function render(characters) {
    charsContainer.innerHTML = ""; 
    characters.forEach((character) => {
        const card = document.createElement("div");
        card.classList.add("char");
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <div class="char-info">
                <h3>${character.name}</h3>
                <span>${character.species}</span>
            </div>
        `;

        // ao clicar no card, adiciona na fila (enqueue) e atualiza display
        card.addEventListener("click", () => {
            myQueue.enqueue(character.name);
            updateQueueDisplay();
        });

        charsContainer.appendChild(card);
    });
}

attendButton.addEventListener("click", () => {
    const attended = myQueue.dequeue();
    if (attended) {
        console.log(`Atendido: ${attended}`);
    } else {
        console.log("Fila vazia!");
    }
    updateQueueDisplay();
});

async function main() {
    const characters = await getCharacters(defaultFilters);
    render(characters);
}

function getFilterValues() {
  return {
    name: nameInput.value.trim(),
    species: speciesSelect.value,
    gender: genderSelect.value,
    status: statusSelect.value,
  };
}

const speciesSelect = document.querySelector("#species");
const genderSelect = document.querySelector("#gender");
const statusSelect = document.querySelector("#status");

speciesSelect.addEventListener("change", (event) => {
  defaultFilters.species = speciesSelect.value;
  main ();
});

genderSelect.addEventListener("change", (event) => {
  defaultFilters.gender = genderSelect.value;
  main ();
});

statusSelect.addEventListener("change", (event) => {
  defaultFilters.status = statusSelect.value;
  main ();
});

main ();

