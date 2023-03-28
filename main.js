const input = document.querySelector('.entered.todo');
const addButton = document.querySelector('.add-todo');
const tasks = document.querySelector('.tasks');
const form = document.querySelector('form');

// Prevent form submission when clicking on the "Add" button. NOT WORKING?
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
})

// Prevent user from submitting if there is no text submitted in the todo field. NOT WORKING..?
addButton.addEventListener('keyup', () => {
  if (input.value.trim() !== '') {
    addButton.classList.add('active')
  }
  else {
    addButton.classList.remove('active')
  }
})

// Add new todo to list. NOT WORKINGGGGG
addButton.addEventListener('click', () => {
  if(input.value.trim() !== '') {
    
    let newItem = document.createElement('div');
    newItem.classList.add('item');
    newItem.innerHTML = `
    <div class="checkbox-item">
    <input type="checkbox" id="checkbox-item" />
    <label class="checkmark" for="checkbox-item">${input.value}</label>
    </div>
    <div class="item-button">
      <div class="edit-icon">
        <i class="fas fa-solid fa-pen"></i>
      </div>
      <div class="delete-icon">
        <i class="fas fa-solid fa-trash"></i>
      </div>
    </div>
    `
    tasks.appendChild(newItem);
    input.value = '';
  }
  else {
    alert("Please enter a task.");
  }
})

// Remove todo from list
tasks.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-solid')) {
    e.target.parentElement.parentElement.remove();
  }
})

// Mark item as completed
tasks.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-pen')) {
    e.target.parentElement.parentElement.classList.toggle('completed');
  }
})




// Whenever a list name is changed in the main content section, this change is reflected in the sidebar.
// list-title = firstInput
// Underlined sidebar text = secondInput
function updateSecondInput() {
  var firstInput = document.getElementById("firstInput");
  var secondInput = document.getElementById("secondInput");
  secondInput.innerHTML = firstInput.value;
}
