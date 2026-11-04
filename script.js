const submitButton = document.getElementById("add-btn");
const questList = document.getElementById("quest-list");

const totalCountEl = document.getElementById("total-quest");
const finishedCountEl = document.getElementById("finished-count");
const unfinishedCountEl = document.getElementById("unfinished-count");
let tasks = [
  { id: 1, title: "wash up", done: false },
  { id: 2, title: "do laundry", done: true },
];

function renderTask() {
  if (!questList) return;
  questList.innerHTML = "";

  let finishedCount = 0;
  let unfinishedCount = 0;

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    if (task.done) {
      finishedCount++;
    } else {
      unfinishedCount++;
    }

    const questItem = document.createElement("div");
    questItem.classList.add("quest-item");

    const textSpan = document.createElement("span");
    textSpan.textContent = task.title;

    if (task.done) {
      textSpan.style.textDecoration = "Line-through";
    }

    const toggleButton = document.createElement("button");
    toggleButton.textContent = task.done ? "Unfinished" : "finished";
    toggleButton.addEventListener("click", function () {
      task.done = !task.done;
      renderTask();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter((t) => t.id !== task.id);
      renderTask();
    });

    questItem.appendChild(textSpan);
    questItem.appendChild(toggleButton);
    questItem.appendChild(deleteButton);
    questList.appendChild(questItem);
  }
  if (totalCountEl) totalCountEl.textContent = `Total quest:${tasks.length}`;
  if (finishedCountEl)
    finishedCountEl.textContent = `Quest finished: ${finishedCount}`;
  if (unfinishedCountEl)
    unfinishedCountEl.textContent = `Quest unfinished: ${unfinishedCount}`;
}

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  const inputField = document.getElementById("add");
  const text = inputField.value.trim();

  if (text === "") return;

  const newTask = {
    id: Date.now(),
    title: text,
    done: false,
  };
  tasks.push(newTask);

  inputField.value = "";
  console.log("New task:", tasks);

  renderTask();
});

renderTask();
