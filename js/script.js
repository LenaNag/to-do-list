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
        tasks = tasks.filter((task, index) => index !== taskIndex);
        //tasks = [
        //    ...tasks.slice(0, taskIndex),
        //    ...tasks.slice(taskIndex + 1),
        //];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) =>
            taskIndex === index ? { ...task, done: !task.done } : task
        );
        render();
    };

    const hideShowDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const allTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class=${(task.done && hideDoneTasks) ? "tasks__item--hidden" : "tasks__item"}>
                    <button class="js-done tasks__button">${task.done ? "✓" : ""}</button>
                        <span${task.done ? " class=\"tasks__item--done\"" : ""}>${task.content}</span>
                    <button class="tasks__button tasks__button--delete js-remove">×</button>
                </li>`;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-hideShowTasksButtons");
        let buttonsHTMLContent = "";

        if (tasks.length > 0) {
            buttonsHTMLContent = `
                <button class="section__button js-hideShowDoneTasks">
                    ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
                </button>
                <button class="section__button js-allTasksDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                    Ukończ wszystkie
                </button>
            `;
        }

        buttonsElement.innerHTML = buttonsHTMLContent;
    };

    const bindButtonsEvents = () => {
        const hideShowDoneTasksElement = document.querySelector(".js-hideShowDoneTasks");
        if (hideShowDoneTasksElement) {
            hideShowDoneTasksElement.addEventListener("click", hideShowDoneTasks);
        };

        const allTasksDoneElement = document.querySelector(".js-allTasksDone");
        if (allTasksDoneElement) {
            allTasksDoneElement.addEventListener("click", allTasksDone);
        };
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

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            document.querySelector(".js-form__input").value = "";
        }
        document.querySelector(".js-form__input").focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}