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

/***/ "./src/js/navegacion.js":
/*!******************************!*\
  !*** ./src/js/navegacion.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\r\n\r\nconst nav = document.querySelector('.navegacion')\r\nconst res = document.querySelector('.responsive')\r\n\r\nnav.addEventListener('click', e => {\r\n    res.classList.toggle('hidden');\r\n})\r\n\r\nconst rangeLaptop = document.querySelector('.rango-laptop')\r\nconst rangeTelefono = document.querySelector('.rango-telefono')\r\nconst rangeTablet = document.querySelector('.rango-tablet')\r\n\r\n\r\nrangeLaptop?.addEventListener('change', e => {\r\n    const a = document.createElement('a')\r\n    a.href=`/laptops?pagina=1&precio=${rangeLaptop.value}`\r\n    a.click()\r\n})\r\n\r\nrangeTelefono?.addEventListener('change', e => {\r\n    const a = document.createElement('a')\r\n    a.href=`/telefonos?pagina=1&precio=${rangeTelefono.value}`\r\n    a.click()\r\n})\r\n\r\nrangeTablet?.addEventListener('change', e => {\r\n    const a = document.createElement('a')\r\n    a.href=`/tablets?pagina=1&precio=${rangeTablet.value}`\r\n    a.click()\r\n})\r\n\r\n})()\n\n//# sourceURL=webpack://comparador/./src/js/navegacion.js?");

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
/******/ 	__webpack_modules__["./src/js/navegacion.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;