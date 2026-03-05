  let nextId = 1;
  function createId() {
    return "id_" + nextId++;
  }
  
  let tasks = [
    { id: createId(), name: "Java Homework", priority: "High", status: "Progress" },
    { id: createId(), name: "Korean Homework", priority: "Medium", status: "Progress" },
    { id: createId(), name: "Java Project", priority: "Low", status: "Progress" }
  ];

  let editTask = null;
  let priority = "";
  let status = "";
  let deleteTaskId = null;

  const taskBody = document.getElementById("taskBody");
  const taskModal = document.getElementById("taskModal");
  const confirmModal = document.getElementById("confirmModal");
  const btnOpenAdd = document.getElementById("btnOpenAdd");
  const btnCloseModal = document.getElementById("btnCloseModal");
  const btnSaveTask = document.getElementById("btnSaveTask");
  const modalTitle = document.getElementById("modalTitle");
  const inputTask = document.getElementById("inputTask");
  const btnConfirmYes = document.getElementById("btnConfirmYes");
  const btnConfirmNo = document.getElementById("btnConfirmNo");
  const btnHigh = document.getElementById("btnHigh");
  const btnMedium = document.getElementById("btnMedium");
  const btnLow = document.getElementById("btnLow");
  const btnTodo = document.getElementById("btnTodo");
  const btnProgress = document.getElementById("btnProgress");
  const btnDone = document.getElementById("btnDone");


  taskTable();
  btnOpenAdd.addEventListener("click", openAddModal);
  btnCloseModal.addEventListener("click", () => closeModal(taskModal));
  btnSaveTask.addEventListener("click", saveTask);

  btnHigh.addEventListener("click", () => setPriority("High"));
  btnMedium.addEventListener("click", () => setPriority("Medium"));
  btnLow.addEventListener("click", () => setPriority("Low"));

  btnTodo.addEventListener("click", () => setStatus("To Do"));
  btnProgress.addEventListener("click", () => setStatus("Progress"));
  btnDone.addEventListener("click", () => setStatus("Done"));

  btnConfirmNo.addEventListener("click", () => {
    deleteTaskId = null;
    closeModal(confirmModal);
  });
  btnConfirmYes.addEventListener("click", deleteTaskNow);

  taskModal.addEventListener("click", (e) => {
    if (e.target == taskModal) closeModal(taskModal);
  });

  confirmModal.addEventListener("click", (e) => {
    if (e.target == confirmModal) closeModal(confirmModal);
  });


  function taskTable() {
    taskBody.innerHTML = "";

    tasks.forEach((task) => {
      const tr = document.createElement("tr");
      tr.className = "h-16 flex justify-around items-center mt-4 rounded-tl-lg rounded-br-lg bg-white shadow-lg";

      const tdName = document.createElement("td");
      tdName.className = "px-3 w-1/4 text-left font-semibold";
      tdName.textContent = task.name;

      const tdPriority = document.createElement("td");
      tdPriority.className = "px-3 w-1/4 text-center font-bold " + getPriorityClass(task.priority);
      tdPriority.textContent = task.priority;

      const tdStatus = document.createElement("td");
      tdStatus.className = "px-3 w-1/4 text-center font-semibold";
      tdStatus.textContent = task.status;

      const tdActions = document.createElement("td");
      tdActions.className = "px-3 w-1/4 text-center";

      const editBtn = document.createElement("button");
      editBtn.className = "mr-4 text-blue-600 text-2xl";
      editBtn.title = "Edit";
      editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
      editBtn.addEventListener("click", () => openEditModal(task.id));

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "text-red-600 text-2xl";
      deleteBtn.title = "Delete";
      deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
      deleteBtn.addEventListener("click", () => askDelete(task.id));

      tdActions.appendChild(editBtn);
      tdActions.appendChild(deleteBtn);

      tr.appendChild(tdName);
      tr.appendChild(tdPriority);
      tr.appendChild(tdStatus);
      tr.appendChild(tdActions);

      taskBody.appendChild(tr);
    });
  }

  function openAddModal() {
    editTask = null;
    modalTitle.textContent = "Add Task";
    inputTask.value = "";

    priority = "";
    status = "";
    resetPriorityButtons();
    resetStatusButtons();

    openModal(taskModal);
  }

  function openEditModal(taskId) {
    const task = findTaskById(taskId);
    if (!task) return;

    editTask = taskId;
    modalTitle.textContent = "Edit Task";
    inputTask.value = task.name;

    priority = task.priority;
    status = task.status;
    updatePriorityButtons();
    updateStatusButtons();

    openModal(taskModal);
  }

  function saveTask() {
    const taskName = inputTask.value.trim();
    console.log("Save : ",taskName)

    if (taskName == "") {
      alert("Please enter task name.");
      return;
    }
    if (priority == "") {
      alert("Please choose Priority.");
      return;
    }
    if (status == "") {
      alert("Please choose Status.");
      return;
    }

    if (editTask == null) {
      tasks.push({
        id: createId(),
        name: taskName,
        priority: priority,
        status: status
      });
    } else {
      const task = findTaskById(editTask);
      if (task) {
        console.log("updating task id:", editTask);
        task.name = taskName;
        task.priority = priority;
        task.status = status;
      }
    }

    taskTable();
    closeModal(taskModal);
  }

  function askDelete(taskId) {
    deleteTaskId = taskId;
    openModal(confirmModal);
  }

  function deleteTaskNow() {
    if (deleteTaskId == null) return;

    tasks = tasks.filter((t) => t.id !== deleteTaskId);

    deleteTaskId = null;
    taskTable();
    closeModal(confirmModal);
  }

  function setPriority(p) {
    priority = p;
    updatePriorityButtons();
  }

  function setStatus(s) {
    status = s;
    updateStatusButtons();
  }

  function getPriorityClass(priority) {
    if (priority == "High") return "text-red-600";
    if (priority == "Medium") return "text-yellow-500";
    return "text-green-600";
  }

  function findTaskById(taskId) {
    return tasks.find((t) => t.id == taskId) || null;
  }

  function openModal(modalEl) {
    modalEl.classList.remove("hidden");
    modalEl.classList.add("flex");
  }

  function closeModal(modalEl) {
    modalEl.classList.add("hidden");
    modalEl.classList.remove("flex");
  }

  function resetPriorityButtons() {
    btnHigh.classList.remove("bg-red-500", "text-white");
    btnMedium.classList.remove("bg-yellow-500", "text-white");
    btnLow.classList.remove("bg-green-500", "text-white");

    btnHigh.classList.add("text-red-500");
    btnMedium.classList.add("text-yellow-500");
    btnLow.classList.add("text-green-500");
  }

  function updatePriorityButtons() {
    resetPriorityButtons();

    if (priority == "High") {
      btnHigh.classList.add("bg-red-500", "text-white");
      btnHigh.classList.remove("text-red-500");
    }
    if (priority == "Medium") {
      btnMedium.classList.add("bg-yellow-500", "text-white");
      btnMedium.classList.remove("text-yellow-500");
    }
    if (priority == "Low") {
      btnLow.classList.add("bg-green-500", "text-white");
      btnLow.classList.remove("text-green-500");
    }
  }

  function resetStatusButtons() {
    btnTodo.classList.remove("bg-cyan-400", "text-white");
    btnProgress.classList.remove("bg-cyan-400", "text-white");
    btnDone.classList.remove("bg-cyan-400", "text-white");

    btnTodo.classList.add("text-cyan-400");
    btnProgress.classList.add("text-cyan-400");
    btnDone.classList.add("text-cyan-400");
  }

  function updateStatusButtons() {
    resetStatusButtons();

    if (status == "To Do") {
      btnTodo.classList.add("bg-cyan-400", "text-white");
      btnTodo.classList.remove("text-cyan-400");
    }
    if (status == "Progress") {
      btnProgress.classList.add("bg-cyan-400", "text-white");
      btnProgress.classList.remove("text-cyan-400");
    }
    if (status == "Done") {
      btnDone.classList.add("bg-cyan-400", "text-white");
      btnDone.classList.remove("text-cyan-400");
    }
  }


