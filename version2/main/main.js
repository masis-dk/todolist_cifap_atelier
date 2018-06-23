// task form
let formOne = document.querySelector('div.form-one');
let formTwo = document.querySelector('div.form-two');
let openFormOne = document.querySelector('img.open-form-one');
let addSiteForm = document.querySelector('div.form-add-site');
let editSiteForm = document.querySelector('div.form-edit-site');
let openFormSite = document.querySelector('img[src="img/web.png"]');

let body = document.querySelector('body');
let notes = document.querySelector('div.notes');
let sites = document.querySelector('div.sites');
let resize = document.querySelector('img.resize');

resize.addEventListener('click', (e) => {
    changeSize();
});

function changeSize() {
    body.addEventListener('mousemove', () => {
        if (count < 2) {
            sites.style.width = event.offsetX + 'px';
            let size = sites.style.width = event.offsetX + 'px';
        } else {
            return false;
        }
    });
    let count = 0;
    body.addEventListener('click', () => {
        if (count > 1) {
            count = 0;
        }
        count++;
        console.log(count);
    });
}

// open form for add task
openFormOne.addEventListener('click', () => {
	OpenForm();
	CloseForm();
	formOne.classList.toggle('open');
});

// function for toggle form
function OpenForm() {
	let tabForm = [formOne, formTwo, addSiteForm, editSiteForm];
	tabForm.map(function(e) {e.classList.remove('open');});
}

//function close form
function CloseForm() {
	let close = document.querySelectorAll('div.close');
	for (let i = 0; i < close.length; i++) {
		close[i].addEventListener('click', () => {OpenForm();});
	}
}

// site form
openFormSite.addEventListener('click', () => {
	OpenForm();
	CloseForm();
	addSiteForm.classList.toggle('open');
});

// open form for edit task
function openFormTwo() {
	let openFormTwo = document.querySelectorAll('img[src="img/tooltip-edit.png"]');
	for (var i = 0; i < openFormTwo.length; i++) {
		openFormTwo[i].addEventListener('click', () => {
			OpenForm();
			CloseForm();
			formTwo.classList.toggle('open');
		});
	}
	getTheValues(i);
}

// fonction pour récupérer les values
function getTheValues(index) {
	let openFormTwo = document.querySelectorAll('img[src="img/tooltip-edit.png"]');
	
	for (let i = 0; i < openFormTwo.length; i++) {
		document.querySelector('#edit-task').innerHTML = myTab[i].task;
		document.querySelector('#edit-date').value = myTab[i].datebis;
		document.querySelector('#edit-categorie').value = myTab[i].category;
	}
}

// edit site
let editSite = document.querySelectorAll('div.edition');
for (let i = 0; i < editSite.length; i++) {
	editSite[i].addEventListener('click', () => {
		OpenForm();
		CloseForm();
		editSiteForm.classList.toggle('open');
	});
}

// je set dans le storage mon tableau JSON
var myTab = JSON.parse(localStorage.getItem('tasks')) || [];

// Cette fonction crée mon compte à rebours
function getTimeRemaining(endtime) {
    let t = new Date(endtime) - new Date();
    let seconds = Math.floor( (t/1000) % 60 );
    let minutes = Math.floor( (t/1000/60) % 60 );
    let hours = Math.floor( (t/(1000*60*60)) % 24 );
    let days = Math.floor( t/(1000*60*60*24) );
	return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
	};
}

// je déclare les variables de mon formulaire d'ajout de tâches à faire
let addTask = document.querySelector('div.form-one input[type="submit"]');
let addForm = document.querySelector('div.form-one form');
let taskValue = document.querySelector('textarea#task');
let taskDate = document.querySelector('input#date');
let taskCategory = document.querySelector('input#categorie');


// je déclare les variables de mon formulaire d'édition de tâches à faire
let editTask = document.querySelector('div.form-two input[type="submit"]');
let editForm = document.querySelector('div.form-two form');
let editValue = document.querySelector('textarea#edit-task');
let editDate = document.querySelector('input#edit-date');
let editCategory = document.querySelector('input#edit-categorie');

// TODO edition des taches à faire


// FIN de TODO

// fonction pour vider les champs du formulaire après ajout
function close() {
	taskValue.value = '';
	taskDate.value = '';
	taskCategory.value = '';
}

// fonction pour trier mon storage par date
function orderTab() {
    myTab.sort(function(a, b) {
        return a.date - b.date;
    });
    localStorage.setItem('tasks', JSON.stringify(myTab));
}

addForm.addEventListener('submit', (e) => {
	e.preventDefault();
	myTab.push({
		task: taskValue.value,
		date: Date.parse(taskDate.value),
		datebis: taskDate.value,
		category: taskCategory.value,
		check: 'false'
	});	

	orderTab();
	OpenForm();
	close();
});

function render() {
	// je map mon tableau pour créer mes <li> 
	for (let i = 0; i < myTab.length; i++) {
		let li = document.createElement('li');
		var time = getTimeRemaining(myTab[i].date);
		li.innerHTML = 	'<img src="img/list-check.png" alt"">' +
						'<img src="img/tooltip-edit.png" alt="">' +
						'<div class="note">' + myTab[i].task + '</div>' +
					    '<div class="category">' + myTab[i].category + '</div>' +
    					'<div class="countdown">' + time.days + 
    						' jours ' + time.hours + 
    						' heures ' + time.minutes + 
    						' minutes ' + time.seconds + 
    						' secondes' + 
						'</div>';
		document.querySelector('ul.taches').append(li);
	}
	openFormTwo();
}
render();

setInterval(function(){ 
	let ul = document.querySelector('ul.taches');
	ul.innerHTML = '';
	render(); 
},1000);