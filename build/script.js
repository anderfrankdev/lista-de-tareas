const taskInput = document.getElementById('taskInput');
const taskContainer = document.getElementById('taskContainer');

taskInput.addEventListener('keyup',add);

function add(argument) {
	if (argument.key === 'Enter') {
		const task = document.createElement('DIV');
		task.classList.add('task')
		task.innerHTML=`
					<img>
					<span>${taskInput.value}</span>
					<a href='#'>X</a>
		`;
		taskContainer.appendChild(task);
		taskInput.value='';
	}
}

taskContainer.addEventListener('click', checked);

function checked(argument) {
	if (argument.target.tagName === 'SPAN' ) {
		argument.target.parentElement.classList.toggle('checked');
		argument.target.parentElement.className === 'task checked' ? 
		argument.target.previousElementSibling.setAttribute('src','./Imgs/check.png') : 
		argument.target.previousElementSibling.setAttribute('src','');
	}
}

taskContainer.addEventListener('click', remove);

function remove(argument) {
	if(argument.target.tagName === 'A'){
		argument.target.parentElement.setAttribute('id','remove')
		const taskRemoved = document.getElementById('remove')
		taskContainer.removeChild(taskRemoved)
	}
}