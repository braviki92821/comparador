/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/activeModal.js":
/*!*******************************!*\
  !*** ./src/js/activeModal.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\r\n    const btnActivarModal = document.querySelector('.modal-click')\r\n    const btnDesactivarModal = document.querySelector('.modal-close')\r\n    const procesador = document.querySelector('.procesador')\r\n    const tarjetaGrafica = document.querySelector('.tarjeta-grafica')\r\n    const memoriaRam = document.querySelector('.memoriaRam')\r\n\r\n    const modalProcesador = document.querySelectorAll('.modal-procesador')\r\n    const modalTarjetaGrafica = document.querySelectorAll('.modal-tarjeta-grafica')\r\n    const modalMemoriaRam = document.querySelectorAll('.modal-memoriaRam')\r\n\r\n    modalProcesador.forEach(boton => {\r\n        boton.addEventListener('click', e =>{\r\n            btnActivarModal.click()\r\n            procesador.classList.remove('hidden')\r\n        })\r\n    })\r\n\r\n    modalTarjetaGrafica.forEach(boton => {\r\n        boton.addEventListener('click', e =>{\r\n            btnActivarModal.click()\r\n            tarjetaGrafica.classList.remove('hidden')\r\n        })\r\n    })\r\n\r\n    modalMemoriaRam.forEach(boton => {\r\n        boton.addEventListener('click', e => {\r\n            btnActivarModal.click()\r\n            memoriaRam.classList.remove('hidden')\r\n        })\r\n    })\r\n\r\n    btnDesactivarModal.addEventListener('click', e => {\r\n        procesador.classList.add('hidden');\r\n        tarjetaGrafica.classList.add('hidden');\r\n        memoriaRam.classList.add('hidden')\r\n    })\r\n\r\n})()\n\n//# sourceURL=webpack://comparador/./src/js/activeModal.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/activeModal.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;