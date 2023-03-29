// Array that is provided by the user
const todos = [];
const todoList = document.querySelector(".todo-items");
const todoForm = document.querySelector(".list")
const toName = document.querySelector("#todo-name")

// Prevents default form submission
function addTodoItem(e) {
  e.preventDefault();

  const todoName = toName.value;
  todos.push(todoName);
  renderList(todos, todoList);
  todoForm.reset();
}

// Adds user inputted text as a todo in the list
function renderList(items, itemsList) {

  while (itemsList.firstChild) {
    itemsList.removeChild(itemsList.firstChild);
  }
  for (let i = 0; i < items.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = items[i];

    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.classList.add("delete-button");
    btn.dataset.index = i;
    btn.onclick = function () {
      const itemIndex = this.dataset.index; // Gets the index of the current item
      const listItem = this.parentNode; // Gets the parent node
      listItem.parentNode.removeChild(listItem); // Removes the parent node
    };
    
    listItem.appendChild(btn); // Appends the button

    if (i === items.length - 1) {
      listItem.classList.add("new-item-annimate");
    }

    itemsList.appendChild(listItem);
  }
}

todoForm.addEventListener("submit", addTodoItem);

renderList(todos, todoList);

// Whenever a list name is changed in the main content section, this change is reflected in the sidebar.
// list-title = firstInput
// Underlined sidebar text = secondInput
function updateSecondInput() {
  var firstInput = document.getElementById("firstInput");
  var secondInput = document.getElementById("secondInput");
  secondInput.innerHTML = firstInput.value;
}
