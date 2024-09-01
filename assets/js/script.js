let taskList = [];
let nextId = 1;

function generateTaskId() {
  const id = nextId;
  nextId++;
  localStorage.setItem("nextId", nextId);
  return id;
}

function createTaskCard(task) {
  const deadline = dayjs(task.deadline);
  const today = dayjs();
  const daysUntilDeadline = deadline.diff(today, "day");

  let cardClass = "";
  if (deadline.isBefore(today, "day")) {
    cardClass = "bg-danger";
  } else if (daysUntilDeadline <= 5) {
    cardClass = "bg-warning";
  } else {
    cardClass = "bg-light";
  }

  const taskCard = $(`
    <div class="card task-card mb-2 ${cardClass}" data-task-id="${task.id}">
      <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description}</p>
        <p class="card-text">Deadline: ${dayjs(task.deadline).format(
          "YYYY-MM-DD"
        )}</p>
        <button class="btn btn-danger delete-task" data-task-id="${
          task.id
        }">Delete</button>
      </div>
    </div>
  `);

  taskCard.draggable({
    containment: "#task-board",
    revert: "invalid",
    helper: "clone",
    start: function (event, ui) {
      ui.helper.addClass("dragging");
    },
    stop: function (event, ui) {
      ui.helper.removeClass("dragging");
    },
  });

  return taskCard;
}

function renderTaskList() {
  taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  nextId = JSON.parse(localStorage.getItem("nextId")) || 1;
  taskList.forEach((task) => {
    const taskCard = createTaskCard(task);
    $(`#${task.status}-cards`).append(taskCard);
  });
}

function handleAddTask(event) {
  event.preventDefault();
  const title = $("#task-title").val();
  const description = $("#task-description").val();
  const deadline = $("#task-deadline").val();

  const newTask = {
    id: generateTaskId(),
    title: title,
    description: description,
    deadline: deadline,
    status: "to-do",
  };

  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  localStorage.setItem("nextId", nextId);

  const taskCard = createTaskCard(newTask);
  $("#todo-cards").append(taskCard);

  $("#task-modal").modal("hide");
}

function handleDeleteTask(event) {
  const taskId = $(event.target).data("task-id");
  taskList = taskList.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  $(event.target).closest(".task-card").remove();
}

function handleDrop(event, ui) {
  const taskId = $(ui.draggable).data("task-id");
  const newStatus = $(this).attr("id");
  taskList = taskList.map((task) => {
    if (task.id === taskId) {
      task.status = newStatus;
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(taskList));
  $(ui.draggable).detach().appendTo(`#${newStatus}-cards`);
}

$(document).ready(function () {
  $("#task-deadline").datepicker({
    dateFormat: "yy-mm-dd",
  });
  $(".lane").droppable({
    accept: ".task-card",
    drop: handleDrop,
  });
  renderTaskList();
  $("#task-form").on("submit", handleAddTask);
  $(document).on("click", ".delete-task", handleDeleteTask);
});