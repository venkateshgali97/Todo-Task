var todoItems = [{}];
var addToDom = function (i) {
    var template = "\n      <li class=\"todo-items-container\" id=".concat(i, ">\n       <div><input type=\"checkbox\" id=").concat(i + 'checkbox', " disabled><span class=\"todo-item-name\" id=").concat(i + 'span', ">").concat(i, "</span></div>\n      <select class=\"todo-item-options\" id=").concat(i + 'select', " onchange='checkBoxHandler(this.id)'>\n          <option value=\"To Do\">To Do</option>\n          <option value=\"In Progress\">In Progress</option>\n          <option value=\"Completed\">Completed </option>\n      </select>\n      <i class=\"fa-solid fa-trash-arrow-up todo-item-delete-button\" id=").concat(i, " onclick='deleteItem(this.id)'></i>\n   </li>\n   ");
    var container = document.getElementById("todo-items-main-container");
    if (container) {
        container.innerHTML += template;
    }
};
var submitHandler = function () {
    var userInput = document.getElementById('todo-user-input-value');
    if (userInput.value !== "") {
        if (todoItems[0][userInput.value] === undefined || todoItems[0][userInput.value] === "Completed") {
            todoItems[0][userInput.value] = "To do";
            addToDom(userInput.value);
            userInput.value = "";
        }
        else {
            alert("Todo already exists");
        }
    }
    else {
        alert("Todo item cannot be empty");
    }
};
// Deleting item
var deleteItem = function (id) {
    var container = document.getElementById("todo-items-main-container");
    if (container) {
        container.innerHTML = "";
    }
    delete todoItems[0][id];
    for (var i in todoItems[0]) {
        if (i) {
            addToDom(i);
        }
    }
};
// complete status check box handler
var checkBoxHandler = function (id) {
    var checkBoxId = id.slice(0, -6);
    var selectItem = document.getElementById(id);
    var checkBoxItem = document.getElementById(checkBoxId + 'checkbox');
    if (selectItem.value === 'Completed') {
        checkBoxItem.checked = true;
        var spanElement = document.getElementById(checkBoxId + 'span');
        if (spanElement) {
            spanElement.classList.add('cross');
        }
        todoItems[0][checkBoxId] = "Completed";
        console.log(todoItems);
    }
    else {
        checkBoxItem.checked = false;
        var spanElement = document.getElementById(checkBoxId + 'span');
        if (spanElement) {
            spanElement.classList.remove('cross');
        }
    }
};
// Filtering feature
var searchButton = document.getElementById('todo-search');
searchButton.addEventListener('input', function () {
    var container = document.getElementById("todo-items-main-container");
    if (container) {
        container.innerHTML = "";
    }
    for (var i in todoItems[0]) {
        if (i && i.includes(searchButton.value)) {
            addToDom(i);
        }
    }
});
