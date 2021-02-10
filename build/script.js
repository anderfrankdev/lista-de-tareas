class Task{
	constructor(name){
		this.name = name;
		this.isComplete = false;
	}

	complete(){
		this.isComplete = !this.isComplete; 
	}
}

class TaskList{
	constructor(name){
		this.name = name;
		this.tasks = [];
	}

	addTask(task, element){
		this.tasks.push(task);
		this.renderTasks(element);
	}

	removeTask(i, element){
		this.tasks.splice(i,1);
		this.renderTasks(element)
	}

	renderTasks(element){
		let tasks = this.tasks.map( task => `
			<li class="task ${task.isComplete ? "complete" : ""}">
				<input type="checkbox" class="task_complete-button" ${task.isComplete ? "checked" : ""}>
				<span>${task.name}</span>
				<a href="#" class="task_remove-button">X</a>
			</li>
		`);
		element.innerHTML = tasks.reduce( (a,b) => a + b, "")
	}
}

// Trabajar con el DOM

const addTaskElement = document.getElementById('add-task');
const taskContainerElement = document.getElementById("tasks");

const inbox = new TaskList('inbox')

// Añadir desde el DOM

addTaskElement.addEventListener("keyup", addDOMTask)


function addDOMTask(e, list = inbox){
	// Obterner el texto del input
	if (e.key === 'Enter') {
		// Crear la tarea instanciando la clase
		let task = new Task(this.value);
		// Añadir la tarea a la lista
		list.addTask(task, taskContainerElement);
		// Borra texto del input

		this.value = "";
	}
	
	
}

//Obtener indice de la tarea actual

function getTaskIndex(e){
	let taskItem = e.target.parentElement,
		taskItems = [...taskContainerElement.querySelectorAll('li')];
	return taskItems.indexOf(taskItem);
}

// Eliminar tarea desde el DOM

taskContainerElement.addEventListener("click",removeDOMtask)

function removeDOMtask(e, list = inbox){
	//Detectar que se hizo click en el enlace
	if (e.target.tagName === "A") {
		// remover tarea de la lista (Se necesita el indice)
		list.removeTask(getTaskIndex(e),taskContainerElement)
	}
}

taskContainerElement.addEventListener("click",completeDOMtask)

function completeDOMtask(e, list = inbox){
	//Detectar que se hizo click en el enlace
	if (e.target.tagName === "INPUT") {
		// remover tarea de la lista (Se necesita el indice)
		list.tasks[getTaskIndex(e)].complete();
		e.target.parentElement.classList.toggle("complete");
	}		
}