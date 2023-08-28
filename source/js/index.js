var TxtType = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtType.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

	var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  	this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  	this.isDeleting = false;
  	this.loopNum++;
  	delta = 500;
  }

	setTimeout(function() {
  	that.tick();
	}, delta);
};

window.onload = function() {
	var elements = document.getElementsByClassName('typewrite');
  	for (var i=0; i<elements.length; i++) {
    	var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
      	new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

// Tabs
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all tab buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.style.animation = 'zoomOut');
    tabContents.forEach(content => content.style.animationDuration = "1s");
    tabContents.forEach(content => content.style.display = 'none');

    // Add active class to the clicked button and show the corresponding content
    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).style.display = 'block';
    document.getElementById(tabId).style.animation = 'zoomIn';
    document.getElementById(tabId).style.animationDuration = '1s';
  });
});

// Anchors
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const blockID = anchor.getAttribute('href').substr(1);

    // Добавляем класс активной ссылке и убираем у остальных
    anchors.forEach(link => {
      link.classList.remove('nav-link__active');
    });
    anchor.classList.add('nav-link__active');

    // Плавно скроллируем к блоку
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

/* Burger menu */
const menuButton = document.querySelector(".toggle");
const mainMenu = document.querySelector('.header-nav__list');

menuButton.addEventListener('click', () => {
  mainMenu.classList.toggle('open');

  if (mainMenu.classList.contains('open')) {
    menuButton.style.backgroundImage = 'url("img/svg/burger-close.svg")';
  } else {
    menuButton.style.backgroundImage = 'url("img/svg/burger-toggle.svg")';
  }
});
