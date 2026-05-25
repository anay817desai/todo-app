// =============================================
// PHASE 1: This works with local storage only.
// In Phase 2 you will replace this URL with
// your real API Gateway URL.
// =============================================

const API_URL = "https://8ggjg29zii.execute-api.us-east-1.amazonaws.com/prod"; // <-- You will fill this in later

// Load todos when the page opens
window.onload = function () {
  loadTodos();
};

// Load all to-dos from the API (or local storage for now)
async function loadTodos() {
  let todos = [];

  if (API_URL) {
    // Phase 2+: fetch from real API
    try {
      const res = await fetch(API_URL + "/todos");
      todos = await res.json();
    } catch (err) {
      console.error("Could not load from API:", err);
    }
  } else {
    // Phase 1: use browser local storage
    todos = JSON.parse(localStorage.getItem("todos") || "[]");
  }

  renderTodos(todos);
}

// Add a new to-do
async function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();
  if (!text) return;

  const newTodo = {
    todoId: Date.now().toString(),
    text: text,
    done: false
  };

  if (API_URL) {
    // Phase 2+: save to real API
    await fetch(API_URL + "/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo)
    });
  } else {
    // Phase 1: save to local storage
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  input.value = "";
  loadTodos();
}

// Mark a to-do as done/undone
async function toggleDone(todoId) {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  const todo = todos.find(t => t.todoId === todoId);
  if (todo) {
    todo.done = !todo.done;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  loadTodos();
}

// Delete a to-do
async function deleteTodo(todoId) {
  if (API_URL) {
    // Phase 2+: delete via API
    await fetch(API_URL + "/todos/" + todoId, { method: "DELETE" });
  } else {
    // Phase 1: delete from local storage
    let todos = JSON.parse(localStorage.getItem("todos") || "[]");
    todos = todos.filter(t => t.todoId !== todoId);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  loadTodos();
}

// Draw the to-do list on screen
function renderTodos(todos) {
  const list = document.getElementById("todoList");

  if (todos.length === 0) {
    list.innerHTML = '<p class="empty">No to-dos yet. Add one above!</p>';
    return;
  }

  list.innerHTML = todos.map(todo => `
    <li class="${todo.done ? 'done' : ''}">
      <span>${todo.text}</span>
      <div class="todo-actions">
        <button class="btn-done" onclick="toggleDone('${todo.todoId}')">
          ${todo.done ? 'Undo' : 'Done'}
        </button>
        <button class="btn-delete" onclick="deleteTodo('${todo.todoId}')">
          Delete
        </button>
      </div>
    </li>
  `).join("");
}
