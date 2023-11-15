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

eval("__webpack_require__.r(__webpack_exports__);\n(function () {\r\n\r\nconst nav = document.querySelector('.navegacion')\r\nconst res = document.querySelector('.responsive')\r\nconst formLaptop = document.querySelector('.form-laptop')\r\n\r\nnav.addEventListener('click', e => {\r\n    res.classList.toggle('hidden');\r\n})\r\n\r\nconst rangeLaptop = document.querySelector('.rango-laptop')\r\n\r\n// rangeLaptop.addEventListener('change', async e => {\r\n//         const input = document.createElement(\"input\");\r\n//         input.type = \"number\"\r\n//         input.name = \"precio\"\r\n//         let rango = Number(rangeLaptop.value)\r\n//         let precio\r\n//         switch (rango) {\r\n//             case 0:\r\n//                 precio = 0\r\n//                 break;\r\n//             case 1:\r\n//                 precio = 10000\r\n//                 break;\r\n//             case 2:\r\n//                 precio = 25000\r\n//                 break;\r\n//             case 3:\r\n//                 precio = 35000\r\n//                 break;\r\n//             case 4:\r\n//                 precio = 55000\r\n//                 break;\r\n//             case 5:\r\n//                 precio = 75000\r\n//                 break;\r\n//             default:\r\n//                 precio = 0\r\n//                 break;\r\n//         }\r\n//         input.value = precio\r\n//         formLaptop.append(input)\r\n//         formLaptop.submit()\r\n// })\r\n\r\n\r\n})()\n\n//# sourceURL=webpack://comparador/./src/js/navegacion.js?");

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