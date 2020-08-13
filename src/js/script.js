function toggleNotificstions() {
	const toggle = document.querySelector('.js-notif-toggle');
	const box = document.querySelector('.js-notif-box');

	if (toggle && box) {
		toggle.addEventListener('click', () => {
			if (box.classList.contains('open')) {
				box.classList.remove('open');
			} else {
				box.classList.add('open');
				box.classList.remove('new');
			}
		});
	}
}

function popupEvents() {
	const btns = document.querySelectorAll('.js-popup-open');
	const popups = document.querySelectorAll('.js-popup');

	if (btns && btns.length) {
		btns.forEach(btn => {
			btn.addEventListener('click', () => {
				const {
					id
				} = btn.dataset;

				if (id) {
					const target = document.getElementById(id);

					if (target) {
						target.classList.add('open');
					}
				}
			})
		});
	}

	if (popups && popups.length) {
		popups.forEach(popup => {
			if (popup) {
				const btn = popup.querySelector('.js-popup-close');

				function closePopup(clickTarget, targetClass) {
					if (clickTarget) {
						clickTarget.addEventListener('click', () => {
							clickTarget.closest(targetClass).classList.remove('open');
						});
					}
				}
				closePopup(btn, '.js-popup');
			}
		})
	}
}

function swiperInit() {
	const mySwiper = new Swiper('.js-swiper', {
		centeredSlides: true,
		slidesPerView: 1,
		speed: 700,
		spaceBetween: 10,
		observer: true,
		slideToClickedSlide: true,

		// preloadImages: false,
		// lazy: {
		// 	loadPrevNext: true,
		// },

		breakpoints: {
			1200: {
				slidesPerView: 2.5
			}
		},

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
}

/**
 * LOAD EVENTS
 */
document.addEventListener('DOMContentLoaded', () => {
	toggleNotificstions();
	popupEvents();
	swiperInit();
});

window.addEventListener('load', () => {

});

document.addEventListener('scroll', () => {

});

window.addEventListener('resize', () => {

});