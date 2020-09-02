!function(e){var n={};function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)r.d(t,o,function(n){return e[n]}.bind(null,o));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=0)}({"./src/js/script.js":
function(module,exports){eval("var form = document.querySelector('.js-upload-form');\nvar submitBtn = form && form.querySelector('.js-form-submit');\nvar uploadBox = form && form.querySelector('.js-upload-box');\nvar comment = form && form.querySelector('.js-comment');\nvar checkbox = document.getElementById('ba-upload-agree');\nvar filesAdded = false;\nvar wasError = false;\n/**\r\n * Popup\r\n */\n\nfunction popupEvents() {\n  var btns = document.querySelectorAll('.js-popup-open');\n  var popups = document.querySelectorAll('.js-popup');\n\n  if (btns && btns.length) {\n    btns.forEach(function (btn) {\n      btn.addEventListener('click', function (event) {\n        event.preventDefault();\n        var id = btn.dataset.id;\n\n        if (id) {\n          var target = document.getElementById(id);\n\n          if (target) {\n            target.classList.add('open');\n          }\n        }\n      });\n    });\n  }\n\n  function closePopup(clickTarget, targetClass) {\n    if (clickTarget) {\n      clickTarget.addEventListener('click', function () {\n        clickTarget.closest(targetClass).classList.remove('open');\n      });\n    }\n  }\n\n  if (popups && popups.length) {\n    popups.forEach(function (popup) {\n      if (popup) {\n        var btn = popup.querySelector('.js-popup-close');\n        closePopup(btn, '.js-popup');\n      }\n    });\n  }\n}\n/**\r\n * Open comment field on focus\r\n */\n\n\nif (comment) {\n  comment.addEventListener('focus', function (e) {\n    e.target.classList.add('open');\n  });\n}\n/**\r\n * Check privacy checkbox enabled/disabled\r\n */\n\n\nfunction checkPolicy() {\n  var checked = true;\n\n  if (checkbox) {\n    checkbox.addEventListener('change', function (e) {\n      if (filesAdded) {\n        if (!e.target.checked) {\n          submitBtn.disabled = true;\n        } else {\n          submitBtn.disabled = false;\n        }\n      }\n    });\n  }\n\n  return checked;\n}\n/**\r\n * Form functinality\r\n */\n\n\nfunction uploadForm() {\n  if (form) {\n    var previewNode = document.querySelector('#template');\n\n    if (previewNode) {\n      previewNode.id = '';\n    }\n\n    var previewTemplate = previewNode.parentNode.innerHTML;\n\n    if (previewTemplate) {\n      previewNode.parentNode.removeChild(previewNode);\n    }\n\n    var myDropzone = new Dropzone(document.querySelector('.js-upload-form'), {\n      // url: 'http://backstage/ba-upload/dist/upload.php',\n      thumbnailWidth: 80,\n      thumbnailHeight: 80,\n      parallelUploads: 20,\n      acceptedFiles: 'image/*',\n      previewTemplate: previewTemplate,\n      autoQueue: false,\n      previewsContainer: '#previews',\n      clickable: '.js-upload-btn',\n      uploadMultiple: false,\n      uploadprogress: function uploadprogress(file, progress, bytesSent) {\n        var progressElement = file.previewElement.querySelector(\"[data-dz-uploadprogress]\");\n        progressElement.style.width = progress + \"%\";\n        file.previewElement.querySelector(\".progress-text\").textContent = Math.trunc(progress) + \"%\";\n      }\n    });\n    myDropzone.on(\"queuecomplete\", function (progress) {\n      var url = window.location.href + '/thank-you.html';\n      window.location = url;\n    });\n    myDropzone.on('addedfile', function () {\n      filesAdded = true;\n      submitBtn.disabled = false;\n    });\n    myDropzone.on(\"complete\", function (file) {\n      file.previewElement.querySelector(\"[data-dz-size]\").classList.remove('d-none');\n      file.previewElement.querySelector(\".progress-text\").classList.add('d-none');\n      file.previewElement.querySelector(\"[data-dz-remove]\").disabled = true;\n    }); // myDropzone.on('processing', () => {\n    // \tconst preloader = form.querySelector('.js-preloader');\n    // \tif (preloader) {\n    // \t\tpreloader.classList.remove('d-none');\n    // \t}\n    // });\n\n    myDropzone.on('error', function (event) {\n      if (!wasError) {\n        var errorBox = document.querySelector('.js-message');\n\n        if (errorBox) {\n          var html = '<p>Щось пішло не так. Оновіть сторінку і спробуйте ще раз!</p>';\n          errorBox.insertAdjacentHTML('afterbegin', html);\n        }\n      }\n\n      wasError = true;\n    });\n    myDropzone.on('removedfile', function () {\n      if (!myDropzone.files.length) {\n        filesAdded = false;\n        submitBtn.disabled = true;\n      }\n    });\n\n    if (form) {\n      form.addEventListener('submit', function (event) {\n        event.preventDefault();\n        myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));\n      });\n    }\n  }\n}\n/**\r\n * LOAD EVENTS\r\n */\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  popupEvents();\n  uploadForm();\n  checkPolicy();\n});\n\n//# sourceURL=webpack:///./src/js/script.js?")},0:
function(module,exports,__webpack_require__){eval('module.exports = __webpack_require__(/*! D:\\OSPanel\\domains\\backstage\\ba-upload\\src\\js\\script.js */"./src/js/script.js");\n\n\n//# sourceURL=webpack:///multi_./src/js/script.js?')}});