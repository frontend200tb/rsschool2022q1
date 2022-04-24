import pets from "./../../assets/js/pets.js";

const buttons = document.querySelectorAll('.ripple');

buttons.forEach(button => {
	button.addEventListener('click', function (e) {
		const x = e.pageX;
		const y = e.pageY;

		const buttonTop = e.target.offsetTop//позиция  кнопки относ wrapper
		const buttonLeft = e.target.offsetLeft

		let xInside = x - buttonLeft
		const yInside = y - buttonTop

		let circle = document.createElement('span');
		circle.classList.add('circle');
		circle.style.top = yInside + 'px';
		circle.style.left = xInside + 'px';

		this.appendChild(circle);
		setTimeout(() => {
			circle.remove();
		}, 500);
	});
});

const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');
const bodyHidden = document.body;
const logo = document.querySelector('.header__logo-and-discribe');

burger.addEventListener("click", function () {
	burger.classList.toggle("is-active");
	menu.classList.toggle("open");
	logo.classList.toggle("header__logo-and-discribe_open-menu");
	bodyHidden.classList.toggle("menu-opened");
});

menu.addEventListener("click", function (event) {
	if (event.target.closest('.menu__item')) { //closest поднимается вверх от элемента и проверяет каждого из родителей
		burger.classList.remove("is-active");
		menu.classList.remove("open");
		logo.classList.remove("header__logo-and-discribe_open-menu");
		bodyHidden.classList.remove("menu-opened");
	}
});

document.addEventListener("click", function (event) {
	if (!event.target.closest('.header__wrapper')) {
		burger.classList.remove("is-active");
		menu.classList.remove("open");
		logo.classList.remove("header__logo-and-discribe_open-menu");
		bodyHidden.classList.remove("menu-opened");
	}
});

document.addEventListener("click", function (event) {
	if (event.target.classList.contains('header__wrapper')) {
		burger.classList.remove("is-active");
		menu.classList.remove("open");
		logo.classList.remove("header__logo-and-discribe_open-menu");
		bodyHidden.classList.remove("menu-opened");
	}
});

const sliderItemCollection = document.querySelectorAll('.item-card');
const buttonLeft = document.querySelector('.slider__button-left');
const buttonRight = document.querySelector('.slider__button-right');

const sliderState = {
	countPets: pets.length,
	prevPets: [],
	currentPets: []
}

function generateNoRepeatCard() {
	let rnd = Math.floor(Math.random() * sliderState.countPets);
	while (sliderState.currentPets.includes(rnd) || sliderState.prevPets.includes(rnd)) {
		rnd = Math.floor(Math.random() * sliderState.countPets);
	}
	return rnd;
}

const itemBody = document.querySelector('.slider__item-body');

function setRndAndNoRepeatCard (event) {
	const prewCollection = document.querySelector('.slider__item-body').cloneNode(true);
	
 	prewCollection.children[0].classList.add("new-card");
	prewCollection.children[1].classList.add("new-card");
	prewCollection.children[2].classList.add("new-card");
	
	sliderItemCollection.forEach((item, index) => {
		let rnd = generateNoRepeatCard();
		item.setAttribute('data-index', rnd);// устанавливаем атрибут
		item.querySelector('img').src = pets[rnd].img;
		item.querySelector('.item-card__name').textContent = pets[rnd].name;
		sliderState.currentPets[index] = rnd;
		if (index === 2) {sliderState.prevPets = [...sliderState.currentPets]};
	});
	
	if (event?.currentTarget === buttonRight) {
		itemBody.prepend(prewCollection.children[2]);
		itemBody.prepend(prewCollection.children[1]);
		itemBody.prepend(prewCollection.children[0]);
		
		itemBody.classList.add("carousel-right");
		itemBody.addEventListener('animationend', () => {
			itemBody.classList.remove("carousel-right");
			const newCard = itemBody.querySelectorAll('.new-card');
			newCard.forEach(item => {
				item.remove();
			})
		}); 
	}
	if (event?.currentTarget === buttonLeft) {
		const cld0 = prewCollection.children[0].cloneNode(true);
		const cld1 = prewCollection.children[1].cloneNode(true);
		const cld2 = prewCollection.children[2].cloneNode(true);
		itemBody.append(cld0);
		itemBody.append(cld1);
		itemBody.append(cld2);

		itemBody.classList.add("carousel-left");
		itemBody.addEventListener('animationend', () => {
			itemBody.classList.remove("carousel-left");
			const newCard = itemBody.querySelectorAll('.new-card');
			newCard.forEach(item => {
				item.remove();
			})
		});
	}
}

setRndAndNoRepeatCard()

buttonLeft.addEventListener('click', setRndAndNoRepeatCard);
buttonRight.addEventListener('click', setRndAndNoRepeatCard);

const sliderBody = document.querySelector('.slider__item-body');

sliderBody.addEventListener("click", function (event) {
	if (event.target.closest('.item-card')) {
		let indexPets = event.target.closest('.item-card').dataset.index;
		createPopup(indexPets)
	}
});


const pageHelp = document.querySelector('.page__popup');

function createPopup(index) {
	pageHelp.querySelector('.description__tittle').textContent = pets[index].name;
	pageHelp.querySelector('.description__type').textContent = pets[index].type;
	pageHelp.querySelector('.description__bread').textContent = pets[index].breed;
	pageHelp.querySelector('.description__text').textContent = pets[index].description;
	pageHelp.querySelector('img').src = pets[index].img;
	pageHelp.querySelector('.description__age').textContent = pets[index].age;
	pageHelp.querySelector('.description__inoculations').textContent = pets[index].inoculations.join(", ");
	pageHelp.querySelector('.description__diseases').textContent = pets[index].diseases.join(", ");
	pageHelp.querySelector('.description__parasites').textContent = pets[index].parasites.join(", ");
	pageHelp.classList.add("visible");
	let width = document.body.clientWidth;
	document.body.classList.add("popup-opened");
	document.body.clientWidth > width ? document.body.style.paddingRight = `${document.body.clientWidth - width}px` : null;
}


pageHelp.addEventListener("click", function (event) {
	if (!event.target.closest('.popup__main') || event.target.closest('.popup__buttonX')) {
		pageHelp.classList.remove("visible");
		document.body.classList.remove("popup-opened");
		document.body.style.paddingRight = "";
	}
});

