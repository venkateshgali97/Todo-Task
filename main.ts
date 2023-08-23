interface TodoItem {
    [key: string]: string;
  }
  
  const todoItems: TodoItem[] = [{}];
  
  const addToDom = (i: string): void => {
    const template = `
      <li class="todo-items-container" id=${i}>
       <div><input type="checkbox" id=${i + 'checkbox'} disabled><span class="todo-item-name" id=${i + 'span'}>${i}</span></div>
      <select class="todo-item-options" id=${i + 'select'} onchange='checkBoxHandler(this.id)'>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed </option>
      </select>
      <i class="fa-solid fa-trash-arrow-up todo-item-delete-button" id=${i} onclick='deleteItem(this.id)'></i>
   </li>
   `;
    const container = document.getElementById("todo-items-main-container");
    if (container) {
      container.innerHTML += template;
    }
  };
  
  const submitHandler = (): void => {
    const userInput = document.getElementById('todo-user-input-value') as HTMLInputElement;
  
    if (userInput.value !== "") {
      if (todoItems[0][userInput.value] === undefined || todoItems[0][userInput.value] === "Completed") {
        todoItems[0][userInput.value] = "To do";
        addToDom(userInput.value);
        userInput.value = "";
      } else {
        alert("Todo already exists");
      }
    } else {
      alert("Todo item cannot be empty");
    }
  };
  
  // Deleting item
  const deleteItem = (id: string): void => {
    const container = document.getElementById("todo-items-main-container");
    if (container) {
      container.innerHTML = "";
    }
    delete todoItems[0][id];
    for (const i in todoItems[0]) {
      if (i) {
        addToDom(i);
      }
    }
  };
  
  // complete status check box handler
  const checkBoxHandler = (id: string): void => {
    const checkBoxId = id.slice(0, -6);
    const selectItem = document.getElementById(id) as HTMLSelectElement;
    const checkBoxItem = document.getElementById(checkBoxId + 'checkbox') as HTMLInputElement;
  
    if (selectItem.value === 'Completed') {
      checkBoxItem.checked = true;
      const spanElement = document.getElementById(checkBoxId + 'span') as HTMLElement;
      if (spanElement) {
        spanElement.classList.add('cross');
      }
      todoItems[0][checkBoxId] = "Completed";
      console.log(todoItems);
    } else {
      checkBoxItem.checked = false;
      const spanElement = document.getElementById(checkBoxId + 'span') as HTMLElement;
      if (spanElement) {
        spanElement.classList.remove('cross');
      }
    }
  };
  
  // Filtering feature
  const searchButton = document.getElementById('todo-search') as HTMLInputElement;
  searchButton.addEventListener('input', () => {
    const container = document.getElementById("todo-items-main-container");
    if (container) {
      container.innerHTML = "";
    }
    for (const i in todoItems[0]) {
      if (i && i.includes(searchButton.value)) {
        addToDom(i);
      }
    }
  });
  