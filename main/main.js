$(document).ready(() => {

var myTab = JSON.parse(localStorage.getItem('taches')) || [];


// $('li.add').on('click', () => {$('div.form').addClass('open');});
$('li.add').on('click', () => {open(); $('div.form').addClass('open');});
$('div.close').on('click', () => {$('div.form').removeClass('open');});


// Je crée les variables que je vais réutiliser
var newTask = $('div.form textarea[name="addtask"]');
let newDate = $('div.form input[type="datetime-local"]');
let newCategory = $('div.form input[type="text"]');

let editTask = $('div.formedit textarea[name="edittask"]');
let editDate = $('div.formedit input[type="datetime-local"]');
let editCategory = $('div.formedit input[type="text"]');

let editTaskF = $('div.formedit-f textarea[name="edittask-f"]');
let editDateF = $('div.formedit-f input[type="datetime-local"]');
let editCategoryF = $('div.formedit-f input[type="text"]');

// fonction pour vider mon formulaire
function close() {
	$('div.form').removeClass('open');
	$('div.form').removeClass('open');
    $(newTask).val('');
    $(newDate).val('');
    $(newCategory).val('');
    $(editTask).val('');
    $(editDate).val('');
    $(editCategory).val('');
}

// fonction qui trie mon localStorage par date chronologique pour que je
// puisse l'afficher dans l'ordre
function orderTab() {
    myTab.sort(function(a, b) {
        return a.date - b.date;
    });
    localStorage.setItem('taches', JSON.stringify(myTab));
}

// Vérifier dans ma liste des catégories, si cette catégorie existe ou non. Cela me permet (au moment de modifier la
// catégorie d'une de mes tâches) de rajouter une nouvelle catégorie dans la liste si elle n'y est pas présente
if (!myCategory) {
    var myCategory = [];
}

function testCategory() {
    // Si indexOf renvoi -1, alors cela veut dire que la catégorie n'existe pas dans mon tableau,
    // Si indexOf renvoi une valeur supérieur à -1, alors elle existe, et le résultat est à son index
    for (let i = 0; i < myTab.length; i++){
        let testIfCat = myCategory.indexOf(myTab[i].category.toLowerCase()) === -1;
        if (testIfCat) {
            myCategory.push(myTab[i].category.toLowerCase());
            myCategory.sort();
        }
    }
}

// Cette fonction me permet ensuite de stopper ma fonction newRender(), comme ça, je pourrai afficher un système de
// filtre de catégorie d'une manière qui me convient mieux (c'est totalement un choix personnel, on aurait pu faire
// autremenent.
function Timer(fn, t) {
    let timerObj = setInterval(fn, t);

    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    };

    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    };
}

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

// Début de la partie qui concerne les fonctions de modifications/suppressions lorsque les tâches de ne sont pas triées par catégories
// Permet de récupérer les informations de mon localStorage, et de les afficher dans mon formulaire
function getEditValue(index) {
	$(editTask).val(myTab[index].note);
	$(editDate).val(myTab[index].dateSecond);
	$(editCategory).val(myTab[index].category);
}
// Enregistre les modifications dans le localStorage
function editValue(index) {
	$(myTab)[index].note = $(editTask).val();
	$(myTab)[index].date = Date.parse($(editDate).val());
	$(myTab)[index].dateSecond = $(editDate).val();
	$(myTab)[index].category = $(editCategory).val();
	localStorage.setItem('taches', JSON.stringify(myTab));
}
// J'utilise les fonction getEditValue() et editValue() dans la fonction editLocalStorage
function editLocalStorage() {
	let img = $('.edit-span-img');
	for (let i = 0; i < img.length; i ++) {$(img[i]).on('click', () => {index = i;});} 
	// ma variable index, je l'utilise dans mes fonctions getEditValue() et editValue() pour mettre à jour le localStorage

	// $('.edit-span-img').on('click', () => {$('div.formedit').addClass('open');getEditValue(index);});
	$('.edit-span-img').on('click', () => {open(); $('div.formedit').addClass('open'); getEditValue(index);});

	$('#edit-local-storage').on('click', () => {editValue(index);});

	let filteredTask = JSON.parse(localStorage.getItem('filteredTask')) || [];
	let check = $('img.check');
	for (let j = 0; j < check.length; j++) {
		$(check[j]).on('click', () => {
			if (myTab[j].check === 'false') {
				myTab[j].check = 'true';
			} else if (myTab[j].check === 'true') {
				myTab[j].check = 'false';
			}
			localStorage.setItem('taches', JSON.stringify(myTab));
		});
	}

	$('div.close-edit').on('click', () => {$('div.formedit').removeClass('open')});
}
// Fin de la partie qui concerne les fonctions de modifications/suppressions lorsque les tâches de ne sont pas triées par catégories

// Début de la partie qui concerne les fonctions de modifications/suppressions lorsque les tâches sont triées par catégories
function getEditValueF(indexF) {
	let filteredTask = JSON.parse(localStorage.getItem('filteredTask')) || [];
	$(editTaskF).val(filteredTask[indexF].note);
	$(editDateF).val(filteredTask[indexF].dateSecond);
	$(editCategoryF).val(filteredTask[indexF].category);
}

function editValueF(indexFF) {
	$(myTab)[indexFF].note = $(editTaskF).val();
	$(myTab)[indexFF].date = Date.parse($(editDateF).val());
	$(myTab)[indexFF].dateSecond = $(editDateF).val();
	$(myTab)[indexFF].category = $(editCategoryF).val();
	localStorage.setItem('taches', JSON.stringify(myTab));
}

function editFilteredStorage(indexFF) {
	let filteredTask = JSON.parse(localStorage.getItem('filteredTask')) || [];
	let imgF = $('.edit-task-filtered');
	
	for (let f = 0; f < imgF.length; f++) {$(imgF[f]).on('click', () => {indexF = f;});}

	$('.edit-task-filtered').on('click', (indexFF) => {
		open();
		$('div.formedit-f').addClass('open');
		for (let h = 0; h < myTab.length; h++) {
			if (filteredTask[indexF].note === myTab[h].note ) {
				indexFF = h;
			}
		}
		getEditValueF(indexF);

		// Je supprime une tache
		$('#delete-task-f').on('click', () => {myTab.splice(indexFF, 1); localStorage.setItem('taches', JSON.stringify(myTab));});
		// Je modifie une tache
		$('#edit-local-storage-f').on('click', () => {editValueF(indexFF);});
	});
	
	let checkF = $('img.check-f');
	for (let i = 0; i < checkF.length; i ++) {
		$(checkF[i]).on('click', () => {
			if (filteredTask[i].check === 'true') {
				filteredTask[i].check = 'false';
			} else if (filteredTask[i].check === 'false') {
				filteredTask[i].check = 'true';
			}
			localStorage.setItem('filteredTask', JSON.stringify(filteredTask));
			rayerF();
		});
	}

	$('.close-edit-f').on('click', () => {$('div.formedit-f').removeClass('open');});
}

function rayer() {
	for (let i = 0; i < myTab.length; i++) {
		if (myTab[i].check === 'true') {
			$('div.task>ul>li:nth-of-type('+ (i + 1) +') div.note').css('textDecoration', 'line-through');
			$('div.task>ul>li:nth-of-type('+ (i + 1) +') div.countdown').css('textDecoration', 'line-through');
  			$('div.task>ul>li:nth-of-type('+ (i + 1) +') div.category').css('textDecoration', 'line-through');
		} else if (myTab[i].check === 'false') {
			$('div.task>ul>li:nth-of-type('+ (i + 1) +') div.note').css('textDecoration', 'none');
			$('div.task>ul>li:nth-of-type('+ (i + 1) +') div.countdown').css('textDecoration', 'none');
  			$('div.task>ul>li:nth-of-type('+ (i + 1) +') div.category').css('textDecoration', 'none');
		}
	}
}
function rayerF() {
	let filteredTask = JSON.parse(localStorage.getItem('filteredTask')) || [];
	for (let i = 0; i < filteredTask.length; i++) {
		if (filteredTask[i].check === 'true') {
			$('div.task-filtered>ul>li:nth-of-type('+ (i + 1) +') div.note').css('textDecoration', 'line-through');
			$('div.task-filtered>ul>li:nth-of-type('+ (i + 1) +') div.countdown').css('textDecoration', 'line-through');
  			$('div.task-filtered>ul>li:nth-of-type('+ (i + 1) +') div.category').css('textDecoration', 'line-through');
		} else if (filteredTask[i].check === 'false') {
			$('div.task-filtered>ul>li:nth-of-type('+ (i + 1) +') div.note').css('textDecoration', 'none');
			$('div.task-filtered>ul>li:nth-of-type('+ (i + 1) +') div.countdown').css('textDecoration', 'none');
  			$('div.task-filtered>ul>li:nth-of-type('+ (i + 1) +') div.category').css('textDecoration', 'none');
		}
	}
}
// Fin de la partie qui concerne les fonctions de modifications/suppressions lorsque les tâches sont triées par catégories


// Cette fonction sert à afficher le contenu de mon le LocalStorage, et contient la fonction editLocalStorage()
// qui permet de faire la modification des tâches
function render() {
	for (let i = 0; i < myTab.length; i++) {
		let t = getTimeRemaining(myTab[i].date);
		let li = document.createElement('li');
		let span = document.createElement('span');
		li.setAttribute('class', 'font-size');
		
		if (t.days > 1) {
			$(span).html(
				'<img class="check" src="img/check.png">' +
				'<div class="note">'+ myTab[i].note +'</div>' +
				'<div class="countdown">' +
					'<span class="small-size">'+ t.days + ' days ' +'</span>' +
					'<span class="small-size">'+ t.hours +' hours ' +'</span>' +
					'<span class="small-size">'+ t.minutes +' minutes ' +'</span>' +
					'<span class="small-size">'+ t.seconds +' seconds ' +'</span>' +
				'</div>' +
				'<div class="category">'+ myTab[i].category +'</div>' +
				'<span class="edit-span-img"><img class="edit-task" src="img/pencil.png"></span>'
			)
			$(li).append(span);
		} else if (t.days === 1 || t.days === 0) {
			$(span).html(
				'<img class="check" src="img/check.png">' +
				'<div class="note">'+ myTab[i].note +'</div>' +
				'<div class="countdown">' +
					'<span class="small-size">'+ t.days + ' day ' +'</span>' +
					'<span class="small-size">'+ t.hours +' hours ' +'</span>' +
					'<span class="small-size">'+ t.minutes +' minutes ' +'</span>' +
					'<span class="small-size">'+ t.seconds +' seconds ' +'</span>' +
				'</div>' +
				'<div class="category">'+ myTab[i].category +'</div>' +
				'<span class="edit-span-img"><img class="edit-task" src="img/pencil.png"></span>'
			)
			$(li).append(span);
		} else if (t.total <= 0) {
			$(span).html(
				'<img class="check" src="img/check.png">' +
				'<div class="note grey">'+ myTab[i].note +'</div>' +
				'<div class="countdown grey">' +
					'<span class="small-size grey">'+ ' 0 day ' +'</span>' +
					'<span class="small-size grey">'+ ' 0 hours ' +'</span>' +
					'<span class="small-size grey">'+ ' 0 minutes ' +'</span>' +
					'<span class="small-size grey">'+ ' 0 seconds ' +'</span>' +
				'</div>' +
				'<div class="category grey">'+ myTab[i].category +'</div>' +
				'<span class="edit-span-img"><img class="edit-task" src="img/pencil.png"></span>'
			)
			$(li).append(span);
		 }
		$('div.task>ul').append(li);
	}

	if (myTab.length === 0) {
		$('p.list').html('');
		$('div.task ul').css('display', 'none');
	} else {
		$('p.list').html('Liste des catégories');
		$('div.task ul').css('display', 'block');

	}
	editLocalStorage();
	rayer();
}

// Cette fonction sert à afficher les catégories et à les filtrer lorsqu'on clique sur l'une des catégories
// Elle contient la fonction editFilteredStorage() qui permet de modifier une tâche quand elles sont filtrées par catégories
function listCategory() {
	testCategory();
	$('div.categories>ul').html('');
	for (let i = 0; i < myCategory.length; i++) {
		let li = document.createElement('li');
		let span = document.createElement('span');
		$(span).attr('class' ,'category-list');
		$(span).html(myCategory[i]);
		$(li).append(span);
		$('div.categories>ul').append(li);
	}

	if (!filteredTask) {
		var filteredTask = [];
	}

	let lis = $('.category-list');

	for (let i = 0; i < lis.length; i++) {
		$(lis[i]).on('click', () => {

			$(lis).removeClass();
			$(lis).addClass('disable');
			$(lis[i]).addClass('activ');

			filteredTask = [];

			$('div.close-list').addClass('open');

			var value = $(lis[i]).html().toUpperCase();

			$('div.task>ul').html('');
			$('div.task>ul').css('display', 'none');

			newRender.stop();
			
			$('div.task-filtered>ul').html('');

			for (let j = 0; j < myTab.length; j++) {
				if (value === myTab[j].category.toUpperCase()) {
					filteredTask.push(myTab[j]);
					localStorage.setItem('filteredTask', JSON.stringify(filteredTask));

					rayerF();

					let t = getTimeRemaining(myTab[j].date);
					let li = document.createElement('li');
					let span = document.createElement('span');

					if (t.days > 1) {
						$(span).html(
							'<img class="check-f" src="img/check.png">' +
							'<div class="note">'+ myTab[j].note +'</div>' +
							'<div class="countdown">' +
								'<span class="small-size">'+ t.days + ' days ' +'</span>' +
								'<span class="small-size">'+ t.hours +' hours ' +'</span>' +
								'<span class="small-size">'+ t.minutes +' minutes ' +'</span>' +
								'<span class="small-size">'+ t.seconds +' seconds ' +'</span>' +
							'</div>' +
							'<div class="category">'+ myTab[j].category +'</div>' +
							'<span class="edit-span-img-f"><img class="edit-task-filtered" src="img/pencil.png"></span>'
						)
						$(li).append(span);
					} else if (t.days === 1 || t.days === 0) {
						$(span).html(
							'<img class="check-f" src="img/check.png">' +
							'<div class="note">'+ myTab[j].note +'</div>' +
							'<div class="countdown">' +
								'<span class="small-size">'+ t.days + ' day ' +'</span>' +
								'<span class="small-size">'+ t.hours +' hours ' +'</span>' +
								'<span class="small-size">'+ t.minutes +' minutes ' +'</span>' +
								'<span class="small-size">'+ t.seconds +' seconds ' +'</span>' +
							'</div>' +
							'<div class="category">'+ myTab[j].category +'</div>' +
							'<span class="edit-span-img-f"><img class="edit-task-filtered" src="img/pencil.png"></span>'
						)
						$(li).append(span);
					} else if (t.total <= 0) {
						$(span).html(
							'<img class="check-f" src="img/check.png">' +
							'<div class="note grey">'+ myTab[j].note +'</div>' +
							'<div class="countdown grey">' +
								'<span class="small-size grey">'+ ' 0 day ' +'</span>' +
								'<span class="small-size grey">'+ ' 0 hours ' +'</span>' +
								'<span class="small-size grey">'+ ' 0 minutes ' +'</span>' +
								'<span class="small-size grey">'+ ' 0 seconds ' +'</span>' +
							'</div>' +
							'<div class="category grey">'+ myTab[j].category +'</div>' +
							'<span class="edit-span-img-f"><img class="edit-task-filtered" src="img/pencil.png"></span>'
						)
						$(li).append(span);
					}
					$('div.task-filtered>ul').append(li);
				}
			}
			
			// Cette fonction permet de faire la modification quand les tâches apparaissent filtrées
			editFilteredStorage();

			$('div.close-list').on('click', () => {
				$('div.close-list').removeClass('open');
				$(lis).removeClass('disable');
				$(lis).removeClass('activ');
				let filteredTask = JSON.parse(localStorage.getItem('filteredTask')) || [];
				for (let q = 0; q < myTab.length; q++) {
					for (let s = 0; s < filteredTask.length; s++) {
						if (myTab[q].note === filteredTask[s].note) {
							myTab[q].check = filteredTask[s].check;
						}
					}
					localStorage.setItem('taches', JSON.stringify(myTab));
				}
				newRender.start();
				localStorage.removeItem('filteredTask');
			});
			rayerF();
		});
	}
}

// J'écoute le formulaire et j'enregistre dans mon localStorage les valeurs des champs input et textarea
$('div.form form').on('submit', () => {
	myTab.push({
        note: newTask.val(),
        date: Date.parse(newDate.val()), 
        dateSecond: newDate.val(),
        category: newCategory.val(),
        check: 'false'
    });
    orderTab();
    close();
});

// Ici, je supprime une tâche 
$('#delete-task').on('click', (e) => {myTab.splice(index, 1); localStorage.setItem('taches', JSON.stringify(myTab));});
// ici, je supprime tout le storage
$('.delete-all').on('click', () => {localStorage.removeItem('taches'); window.location.reload();});

render();
orderTab();
listCategory();
testCategory();
let newRender = new Timer(() => {
	$('div.task>ul').html('');
    render();
},1000);

// window.onload = newRender.start();

});





// La partie qui concerne les sites 
let mes_sites = JSON.parse(localStorage.getItem('sites')) || [];

if (mes_sites.length > 0){
	$('p.titre').html('Mes sites favoris');
}

function openPopup() {
	let popup = document.querySelector('div.s-add-popup');
	popup.classList.toggle('open');

	let sURL = document.querySelector('input[placeholder="URL du site"]');
	let sName = document.querySelector('input[placeholder="Nom du site"]');
	if (popup.classList.contains('open')) {
		sURL.value = '';
		sName.value = '';
	}
}
$('li.add-s>img').on('click', () => {open();openPopup();});

$('div.close-popup').on('click', () => {openPopup();});

function addToStorage() {
	let sURL = document.querySelector('input[placeholder="URL du site"]').value;
	let sName = document.querySelector('input[placeholder="Nom du site"]').value;

	if (sURL.slice(0, 12) === "https://www.") {
        sURL = sURL.slice(12);
    }
    if (sURL.slice(0, 11) === "http://www.") {
        sURL = sURL.slice(11);
    }
    if (sURL.slice(0, 8) === "https://") {
        sURL = sURL.slice(8);
    }
    if (sURL.slice(0, 7) === "http://") {
        sURL = sURL.slice(7);
    }

	mes_sites.push({
		url: sURL,
		name: sName,
		position: 0
	});

	localStorage.setItem('sites', JSON.stringify(mes_sites));
}

function onLoad() {
	document.querySelector('.sites ul').innerHTML = '';

	for (let i = 0; i < mes_sites.length; i++) {
		let sName = document.querySelector('input[placeholder="Nom du site"]').value;
		let sURL = document.querySelector('input[placeholder="URL du site"]').value;
		let li = document.createElement('li');
		li.setAttribute('data-id', i);
		li.setAttribute('class', 'connectedSortable');
		let div = document.createElement('div');
		let p = document.createElement('p');
		p.setAttribute('class', 's-name');
		p.innerHTML = mes_sites[i].name;
		div.classList.add('s-edit');
		div.innerHTML = '. .'
		let a = document.createElement('a');
		a.setAttribute('href', 'http://'+mes_sites[i].url);
		a.setAttribute('target', '_blank');

		a.innerHTML = '<img src="https://logo.clearbit.com/'+ mes_sites[i].url +'?size=60x60" alt="">';
		document.querySelector('.sites ul').appendChild(li);
		li.appendChild(a);
		li.appendChild(div);
		li.appendChild(p);
	}


	let sEditBtn = document.getElementsByClassName('s-edit');
	let modifier = document.querySelector('div.trois input');
	let supprimer = document.querySelector('div.quatre input');
	let popin = document.querySelector('div.s-popin');
	for (let i = 0; i < sEditBtn.length; i ++) {
		sEditBtn[i].addEventListener('click', () => {
			openPopin(); 
			getStorageValue(i);
			modifier.addEventListener('click', ()  => {editLocalStorage(i); onload(); popin.classList.remove('open'); reload();});
			supprimer.addEventListener('click', () => {deleteLocalStorage(i); onload(); popin.classList.remove('open'); reload();});
		});
	}
}

let ajouter = document.querySelector('.wrap input[type="submit"]');
ajouter.addEventListener('click', () => {openPopup(); addToStorage(); onLoad();});

function openPopin() {
	let popin = document.querySelector('div.s-popin');
	popin.classList.toggle('open');
}

function reload() {
	setTimeout(() => {window.location.reload();},200);
}

let siteName = document.querySelector('div.un input');
let siteUrl = document.querySelector('div.deux input');
function getStorageValue(i) {
	siteName.value = mes_sites[i].name;
	siteUrl.value = mes_sites[i].url;
}

function editLocalStorage(i) {
	mes_sites[i].name = siteName.value;
	mes_sites[i].url = siteUrl.value;
	localStorage.setItem('sites', JSON.stringify(mes_sites));
}

function deleteLocalStorage(i) {
	mes_sites.splice(i, 1);
	localStorage.setItem('sites', JSON.stringify(mes_sites));	
}

let sCloseBtn = document.querySelector('div.close-popin');
sCloseBtn.addEventListener('click', open, openPopin);

window.onload = onLoad;

function open() {
	let formUn = document.querySelector('div.form');
	let formDeux = document.querySelector('div.formedit');
	let formTrois = document.querySelector('div.formedit-f');
	let addSite = document.querySelector('div.s-add-popup');
	let editSite = document.querySelector('div.s-popin');
	let tab = [formUn, formDeux, formTrois, addSite, editSite];

	for (let i = 0; i < tab.length; i++) {
		if (tab[i].classList.contains('open')) {
			tab[i].classList.remove('open');
		}
	}
}

// Le drag and drop
$(function(){
	$('#sortable').sortable({
    	connectWith: '.connectedSortable',
    	distance: 10,
    	// delay: 200,
    	placeholder: 'highlight'
    }).bind('sortupdate', (e, ui) => {
		for (let i = 0; i < mes_sites.length ; i++) {
    		let position = $('#sortable li:nth-of-type('+ (i + 1) +')').index();
    		$('#sortable li:nth-of-type('+(i+1)+')').attr('data-id', position);

    		mes_sites[i].position = position;

    		let newURL = mes_sites[i].url = $('#sortable li:nth-of-type('+(i+1)+') a').attr('href');
    		let newName = mes_sites[i].url = $('#sortable li:nth-of-type('+(i+1)+') p').html();

    		if (newURL.slice(0, 12) === "https://www.") {
		        newURL = newURL.slice(12);
		    }
		    if (newURL.slice(0, 11) === "http://www.") {
		        newURL = newURL.slice(11);
		    }
		    if (newURL.slice(0, 8) === "https://") {
		        newURL = newURL.slice(8);
		    }
		    if (newURL.slice(0, 7) === "http://") {
		        newURL = newURL.slice(7);
		    }

		    mes_sites[i].url = newURL;
		    mes_sites[i].name = newName;

    		localStorage.setItem('sites', JSON.stringify(mes_sites));
		}
    });
});



// Si localStorage vide
if (!localStorage.getItem('sites') || !localStorage.getItem('taches')) {
	$('div.firststart').addClass('open');
	$('div.blur').addClass('open');
}

let firstStart = document.querySelector('div.firststart');
let blur = document.querySelector('div.blur');
let closeStart = document.querySelectorAll('div.close-start');
for (let i = 0; i < closeStart.length; i++) {
	closeStart[i].addEventListener('click', () => {
		firstStart.classList.remove('open');
		blur.classList.remove('open');
	});
}

// Carousel
let slider = document.querySelector('ul.slider');
let left = document.querySelectorAll('.left');
let right = document.querySelectorAll('.right');
let slides = document.querySelectorAll('ul.slider>li').length;

let count = 0;
let width = 400;
slider.style.width = slides * width + 'px';

for (let i = 0; i < right.length; i++) {
	right[i].addEventListener('click', () => {
		count++;
		if (count === slides) {
			count = 0;
			slider.style.left = 0;
		}
		slider.style.left = -width * count + 'px';
	});
}

for (let j = 0; j < left.length; j++) {
	left[j].addEventListener('click', () => {		
		count--;
		slider.style.left = -width * count + 'px';
		if (count < 0) {
			count = slides - 1;
			slider.style.left = -width * (slides - 1) + 'px';
		}
	});
}
// Fin carousel


// function fontSize() {
// 	let count = 1;
// 	let lili = document.querySelectorAll('div.task ul li');
// 	for (let i = 0; i < lili.length; i++) {
// 		lili[i].style.fontSize = count + 'rem';
// 	}
// }

// let font = document.querySelector('li.settings');
// font.addEventListener('click', () => {fontSize();});
