{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
                done: false,
            },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="tasks__item">
                    <button class="js-done tasks__button">${task.done ? "✓" : ""}</button>
                        <span${task.done ? " class=\"tasks__item--done\"" : ""}>${task.content}</span>
                    <button class="tasks__button tasks__button--delete js-remove">×</button>
                </li>`;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-hideShowTasksButtons");

        if (tasks.length > 0) {
            buttonsElement.innerHTML = `
            <button class="js-hideShowDoneTasks">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="js-allTasksDone">
                Ukończ wszystkie
            </button>
            `;
        } else {
            buttonsElement.innerHTML = ``;
        }
    };

    const bindButtonsEvents = () => {
        const hideShowDoneTasksElement = document.querySelector(".js-hideShowDoneTasks");
        if (hideShowDoneTasksElement) {
            hideShowDoneTasksElement.addEventListener("click", () => {
                hideDoneTasks = !hideDoneTasks;
                render();
            });
        };

        const allTasksDoneElement = document.querySelector(".js-allTasksDone");
        if (allTasksDoneElement) {
            allTasksDoneElement.addEventListener("click", () => {
                tasks = tasks.map((task) => ({
                    ...task,
                    done: true,
                }));
                render();
            });
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-form__input").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        document.querySelector(".js-form__input").value = "";
        document.querySelector(".js-form__input").focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}