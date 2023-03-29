// Array that is provided by the user
const todos = [];
const todoList = document.querySelector(".todo-items");
const todoForm = document.querySelector(".list");
const toName = document.querySelector("#todo-name");
const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form')
const newListInput = document.querySelector('[data-new-list-input')
const listTitleElement = document.querySelector('[data-list-title]')

// Prevents default form submission
function addTodoItem(e) {
  e.preventDefault();

  const todoName = toName.value;
  todos.push ({
    name: todoName,
    isDone: false,
  });
  renderList(todos, todoList);
  todoForm.reset();
}

// Adds user inputted text as a todo in the list
function renderList(items, itemsList) {
  while (itemsList.firstChild) {
    itemsList.removeChild(itemsList.firstChild);
  }

  // Loops to create list items. Any code inside the for loop determines what is in an item. textContent and innerHTML help accomplish this.
  for (let i = 0; i < items.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = items[i].name;

    // COMPLETE BUTTON
    // Marks items as complete/incomplete
    if (todos[i].isDone === true) {
      listItem.classList.add("done");
    }

    // Creates the button used to check if an item has been completed or not.
    const checkmarkButton = document.createElement("button");

    if (todos[i].isDone === true) {
      // Sets the checkmark icon to display as the button
      checkmarkButton.textContent = "Incomplete";
      checkmarkButton.classList.add("incomplete");
    } else {
      // Sets the square icon to display as the button
      checkmarkButton.textContent = "Complete";
      checkmarkButton.classList.add("complete");
    }

    checkmarkButton.dataset.index = i;
    checkmarkButton.addEventListener("click", doneTodo);
    listItem.appendChild(checkmarkButton);

    // DELETE BUTTON
    // Removes list items
    const deleteButton = document.createElement("button");
    // Sets the trash icon to display as the button
    deleteButton.innerHTML = `
    <div class="delete-icon">
      <i class="fas fa-solid fa-trash"></i>
    </div>
    `
    deleteButton.classList.add("delete-button");
    deleteButton.dataset.index = i;
    deleteButton.onclick = function () {
      const itemIndex = this.dataset.index; // Gets the index of the current item
      const listItem = this.parentNode; // Gets the parent node
      listItem.classList.add("remove-item-annimate");
      setTimeout (function() {
        listItem.parentNode.removeChild(listItem); // Removes the parent node
      }, 300); // The time for the delay so the delete animation can play out
    };
    
    listItem.appendChild(deleteButton); // Appends the button

    if (i === items.length - 1) {
      listItem.classList.add("new-item-annimate");
    }

    itemsList.appendChild(listItem);
  }
}

function doneTodo(event) {
  console.log("Marked as done");

  const todoDoneIndex = event.target.dataset.index;

  console.log("INDEX: ", todoDoneIndex);

  todos[todoDoneIndex].isDone = !todos[todoDoneIndex].isDone;

  console.log(todos);

  renderList(todos, todoList);
}

todoForm.addEventListener("submit", addTodoItem);

renderList(todos, todoList);

let lists = [];

// Prevents default form submission
newListForm.addEventListener('submit', e => {
  e.preventDefault()
// Prevents users from submitting empty text as a list
  const listName = newListInput.value
  if (listName == null || listName === '') return
  const list = createList(listName)
  newListInput.value = null
  lists.push(list)
  render()
})

// Prevents users from submitting empty text as a list
function createList(name) {
  return { id: Date.now().toString(), name: name, tasks: [] }
}

// Renders Create New List
function render() {
  clearElement(listsContainer)

  lists.forEach (list => {
    const listElement = document.createElement("li")
    listElement.dataset.listId = list.id
    listElement.classList.add("list-names")
    listElement.classList.add("underline")
    listElement.classList.add("secondInput")
    listElement.innerText = list.name
    listsContainer.appendChild(listElement)
  })
}

// Clears any previous lists in the sidebar
function clearElement(element) {
  while (element.firstChild)
  element.removeChild(element.firstChild)
}

// Whenever a list name is changed in the main content section, this change is reflected in the sidebar.
// list-title = firstInput
// Underlined sidebar text = secondInput
function updateSecondInput() {
  var firstInput = document.getElementById("firstInput");
  var secondInput = document.getElementById("secondInput");
  secondInput.innerHTML = firstInput.value;
}
