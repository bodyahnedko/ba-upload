const form = document.querySelector('.js-upload-form');
const submitBtn = form && form.querySelector('.js-form-submit');
const uploadBox = form && form.querySelector('.js-upload-box');
const comment = form && form.querySelector('.js-comment');
const checkbox = document.getElementById('ba-upload-agree');

let filesAdded = false;
let wasError = false;

function popupEvents() {
	const btns = document.querySelectorAll('.js-popup-open');
	const popups = document.querySelectorAll('.js-popup');

	if (btns && btns.length) {
		btns.forEach((btn) => {
			btn.addEventListener('click', (event) => {
				event.preventDefault();
				const { id } = btn.dataset;

				if (id) {
					const target = document.getElementById(id);

					if (target) {
						target.classList.add('open');
					}
				}
			});
		});
	}

	function closePopup(clickTarget, targetClass) {
		if (clickTarget) {
			clickTarget.addEventListener('click', () => {
				clickTarget.closest(targetClass).classList.remove('open');
			});
		}
	}

	if (popups && popups.length) {
		popups.forEach((popup) => {
			if (popup) {
				const btn = popup.querySelector('.js-popup-close');
				closePopup(btn, '.js-popup');
			}
		});
	}
}

if (comment) {
	comment.addEventListener('focus', (e) => {
		e.target.classList.add('open');
	});
}

function checkPolicy() {
	let checked = true;

	if (checkbox) {
		checkbox.addEventListener('change', (e) => {
			if (filesAdded) {
				if (!e.target.checked) {
					submitBtn.disabled = true;
				} else {
					submitBtn.disabled = false;
				}
			}
		});
	}

	return checked;
}

function uploadForm() {
	if (form) {
		const previewNode = document.querySelector('#template');
		if (previewNode) {
			previewNode.id = '';
		}

		const previewTemplate = previewNode.parentNode.innerHTML;

		if (previewTemplate) {
			previewNode.parentNode.removeChild(previewNode);
		}

		const myDropzone = new Dropzone(
			document.querySelector('.js-upload-form'),
			{
				thumbnailWidth: 80,
				thumbnailHeight: 80,
				parallelUploads: 20,
				acceptedFiles: 'image/*',
				previewTemplate: previewTemplate,
				autoQueue: false,
				previewsContainer: '#previews',
				clickable: '.js-upload-btn',
				uploadMultiple: true,
			}
		);

		myDropzone.on('successmultiple', () => {
			const url = window.location.href + '/thank-you.html';
			window.location = url;
		});

		myDropzone.on('addedfile', () => {
			filesAdded = true;
			submitBtn.disabled = false;
		});

		myDropzone.on('processingmultiple', () => {
			const preloader = form.querySelector('.js-preloader');

			if (preloader) {
				preloader.classList.remove('d-none');
			}
		});

		myDropzone.on('error', (event) => {
			if (!wasError) {
				const errorBox = document.querySelector('.js-message');

				if (errorBox) {
					const html =
						'<p>Щось пішло не так. Оновіть сторінку і спробуйте ще раз!</p>';
					errorBox.insertAdjacentHTML('afterbegin', html);
				}
			}

			wasError = true;
		});

		myDropzone.on('removedfile', () => {
			if (!myDropzone.files.length) {
				filesAdded = false;
				submitBtn.disabled = true;
			}
		});

		if (form) {
			form.addEventListener('submit', (event) => {
				event.preventDefault();

				myDropzone.enqueueFiles(
					myDropzone.getFilesWithStatus(Dropzone.ADDED)
				);
			});
		}
	}
}

/**
 * LOAD EVENTS
 */
document.addEventListener('DOMContentLoaded', () => {
	popupEvents();
	uploadForm();
	checkPolicy();
});
