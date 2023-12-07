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

/***/ "./src/js/añadirFavorito.js":
/*!**********************************!*\
  !*** ./src/js/añadirFavorito.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\r\n\r\n    const token = document.querySelector('meta[name=\"csrf-token\"]').getAttribute('content')\r\n    const favorito = document.querySelectorAll('.favorito')\r\n    const nuevaComparacionLaptop = document.querySelector('.otra-comparacion-laptop')\r\n    const nuevaComparacionTelefono = document.querySelector('.otra-comparacion-telefono')\r\n    const nuevaComparacionTablet = document.querySelector('.otra-comparacion-tablet')\r\n\r\n    favorito.forEach(boton => {\r\n        boton.addEventListener('click', agregarFavoritoComparacion)\r\n    })\r\n\r\n    async function agregarFavoritoComparacion(e) {\r\n        const {  productoId } = e.target.dataset\r\n        try {\r\n            const url = '/agregarFavorito'\r\n            const body = {\"productoId\": productoId }\r\n            const respuesta = await fetch(url, {\r\n                method: 'POST',\r\n                headers:{\r\n                    'CSRF-Token': token,\r\n                     Accept: 'application/json',\r\n                    'Content-Type': 'application/json',\r\n                },\r\n                body: JSON.stringify(body, undefined, 2)\r\n            })\r\n\r\n            const { operacion } = await respuesta.json()\r\n            //console.log(await respuesta.json())\r\n\r\n            if( operacion === 'añadir'){\r\n                e.target.classList.add('bg-red-600', 'text-black')\r\n                e.target.classList.remove('bg-yellow-600', 'text-white')\r\n                e.target.textContent = 'Quitar de Favoritos'\r\n            } else if( operacion === 'eliminar'){\r\n                e.target.classList.add('bg-yellow-600', 'text-black')\r\n                e.target.classList.remove('bg-red-600', 'text-white')\r\n                e.target.textContent = 'Añadir a favoritos'\r\n            }\r\n            \r\n        } catch (error) {\r\n            console.log(error)\r\n        }\r\n    }\r\n\r\n    favoritosComparacion()\r\n\r\n    async function favoritosComparacion() {\r\n        try {\r\n            const url = '/favoritos'\r\n            const respuesta = await fetch(url, {\r\n                method: 'POST',\r\n                headers:{\r\n                    'CSRF-Token': token,\r\n                },\r\n            })\r\n\r\n            const favoritos  = await respuesta.json()\r\n\r\n            favorito.forEach(boton => {\r\n                for(let i = 0; i < favoritos.length; i++) {\r\n                    if(boton.getAttribute('data-producto-id') === favoritos[i].idProducto.toString()){\r\n                        boton.classList.add('bg-red-600', 'text-black')\r\n                        boton.classList.remove('bg-yellow-600', 'text-white')\r\n                        boton.textContent = 'Quitar de Favoritos'\r\n                     }\r\n                }\r\n            })\r\n\r\n        } catch (error) {\r\n            console.log(error)\r\n        }\r\n    }\r\n\r\n    nuevaComparacionLaptop?.addEventListener('click', e => {\r\n        localStorage.getItem('compararLaptop')\r\n        localStorage.setItem('compararLaptop','')\r\n        document.cookie = 'compararLaptop=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'\r\n        window.location.href = '/laptops?pagina=1&precio=75000'\r\n    })\r\n\r\n    nuevaComparacionTelefono?.addEventListener('click', e => {\r\n        localStorage.getItem('compararTelefono')\r\n        localStorage.setItem('compararTelefono','')\r\n        document.cookie = 'compararTelefono=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'\r\n        window.location.href = '/telefonos?pagina=1&precio=65000'\r\n    })\r\n\r\n    nuevaComparacionTablet?.addEventListener('click', e => {\r\n        localStorage.getItem('compararTablet')\r\n        localStorage.setItem('compararTablet','')\r\n        document.cookie = 'compararTablet=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'\r\n        window.location.href = '/tablets?pagina=1&precio=65000'\r\n    })\r\n\r\n})()\n\n//# sourceURL=webpack://comparador/./src/js/a%C3%B1adirFavorito.js?");

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
/******/ 	__webpack_modules__["./src/js/añadirFavorito.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;