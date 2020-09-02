const form = document.querySelector('.js-upload-form');
const submitBtn = form && form.querySelector('.js-form-submit');
const uploadBox = form && form.querySelector('.js-upload-box');
const comment = form && form.querySelector('.js-comment');
const checkbox = document.getElementById('ba-upload-agree');

let filesAdded = false;
let wasError = false;

/**
 * Popup
 */
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

/**
 * Open comment field on focus
 */
if (comment) {
	comment.addEventListener('focus', (e) => {
		e.target.classList.add('open');
	});
}

/**
 * Check privacy checkbox enabled/disabled
 */
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

/**
 * Form functinality
 */
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
				// url: 'http://backstage/ba-upload/dist/upload.php',
				thumbnailWidth: 80,
				thumbnailHeight: 80,
				parallelUploads: 20,
				acceptedFiles: 'image/*',
				previewTemplate: previewTemplate,
				autoQueue: false,
				previewsContainer: '#previews',
				clickable: '.js-upload-btn',
				uploadMultiple: false,
				
				uploadprogress: function(file, progress, bytesSent) {
					var progressElement = file.previewElement.querySelector("[data-dz-uploadprogress]");
					progressElement.style.width = progress + "%";
					file.previewElement.querySelector(".progress-text").textContent = Math.trunc(progress) + "%";
				}
			}
		);
		
		myDropzone.on("queuecomplete", function(progress) {
			const url = window.location.href + '/thank-you.html';
			window.location = url;
		});

		myDropzone.on('addedfile', () => {
			filesAdded = true;
			submitBtn.disabled = false;
		});

		myDropzone.on("complete", function(file) {
			file.previewElement.querySelector("[data-dz-size]").classList.remove('d-none');
			file.previewElement.querySelector(".progress-text").classList.add('d-none');
			file.previewElement.querySelector("[data-dz-remove]").disabled = true;
		 });

		// myDropzone.on('processing', () => {
		// 	const preloader = form.querySelector('.js-preloader');

		// 	if (preloader) {
		// 		preloader.classList.remove('d-none');
		// 	}
		// });

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