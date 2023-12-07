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

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\r\n    const btnActivarModal = document.querySelector('.modal-click')\r\n    const btnDesactivarModal = document.querySelector('.modal-close')\r\n    const procesador = document.querySelector('.procesador')\r\n    const tarjetaGrafica = document.querySelector('.tarjeta-grafica')\r\n    const memoriaRam = document.querySelector('.memoriaRam')\r\n    const almacenamiento = document.querySelector('.almacenamiento')\r\n\r\n    const modalProcesador = document.querySelectorAll('.modal-procesador')\r\n    const modalTarjetaGrafica = document.querySelectorAll('.modal-tarjeta-grafica')\r\n    const modalMemoriaRam = document.querySelectorAll('.modal-memoriaRam')\r\n    const modalAlmacenamiento = document.querySelectorAll('.modal-almacenamiento')\r\n\r\n    const h3 = document.createElement('h3')\r\n    h3.classList.add('text-lg','leading-6','font-medium','text-gray-900')\r\n    const p = document.createElement('p')\r\n    p.classList.add('text-gray-900')\r\n\r\n    modalProcesador.forEach(boton => {\r\n        boton.addEventListener('click', e => {\r\n            const { puntosProcesador } = e.target.dataset\r\n            h3.textContent = `Puntos de este procesador: ${puntosProcesador}`\r\n            btnActivarModal.click()\r\n            procesador.classList.remove('hidden')\r\n            if(puntosProcesador <= 3){\r\n                p.textContent= \"El procesador de esta computadora es apto para aplicaciones de trabajo docente como lo son la paqueteria Office\"\r\n            } else if(puntosProcesador <= 6){\r\n                p.textContent= \"El procesador de esta computadora es apto para aplicaciones de trabajo Docente: Paqueteria Office, Diseñador: Photoshop y Canvas, Programador: IDE Apache netbeans\"\r\n            } else if(puntosProcesador <= 10){\r\n                p.textContent= \"El procesador de esta computadora es apto para aplicaciones de trabajo Docente: Paqueteria Office, Diseñador: Adobe Pro, Sony Vegas y Photoshop , Programador: IDE Apache netbeans, SQL SERVER, Apache Server, Visual Studio 2023\"\r\n            } \r\n            procesador.append(h3)\r\n            procesador.append(p)\r\n        })\r\n    })\r\n\r\n    modalTarjetaGrafica.forEach(boton => {\r\n        boton.addEventListener('click', e =>{\r\n            const { puntosGrafica } = e.target.dataset\r\n            h3.textContent = `Puntos de esta grafica: ${puntosGrafica}`\r\n            btnActivarModal.click()\r\n            tarjetaGrafica.classList.remove('hidden')\r\n            if(puntosGrafica <= 3){\r\n                p.textContent=\"La grafica de esta computadora es apta para juegos de graficos bajos o 2D\"\r\n            } else if(puntosGrafica <= 6){\r\n                p.textContent=\"La grafica de esta computadora es apta para juegos de graficos medios, Diseño 3D y herramientas de renderizado como Render o Unity\"\r\n            } else if(puntosGrafica <= 10){\r\n                p.textContent=\"La grafica de esta computadora es apta para juegos de graficos Altos y probablemente conpatible con Ray Tracing, Diseño 3D, Diseño de juegos en motores graficos como unreal engine 4 o 5\"\r\n            }\r\n            tarjetaGrafica.append(h3)\r\n            tarjetaGrafica.append(p)\r\n        })\r\n    })\r\n\r\n    modalMemoriaRam.forEach(boton => {\r\n        boton.addEventListener('click', e => {\r\n            const { puntosMemoria } = e.target.dataset\r\n            h3.textContent = `Puntos de memoria Ram: ${puntosMemoria}`\r\n            btnActivarModal.click()\r\n            memoriaRam.classList.remove('hidden')\r\n            if(puntosMemoria <= 3){\r\n                p.textContent=\"La memoria Ram de esta computadora debe ser capaz de mantener abierta al menos 2 programas a la vez\"\r\n            } else if(puntosMemoria <= 6){\r\n                p.textContent=\"La memoria Ram de esta computadora debe ser capaz de mantener abierta al menos 4 programas a la vez\"\r\n            } else if(puntosMemoria <= 10){\r\n                p.textContent=\"La memoria Ram de esta computadora debe ser capaz de mantener abierta al menos 8 programas a la vez\"\r\n            }\r\n            memoriaRam.append(h3)\r\n            memoriaRam.append(p)\r\n        })\r\n    })\r\n    \r\n    modalAlmacenamiento.forEach(boton => {\r\n        boton.addEventListener('click', e => {\r\n            const { puntosAlmacenamiento } = e.target.dataset\r\n            h3.textContent = `Puntos del almacenamiento: ${puntosAlmacenamiento}`\r\n            btnActivarModal.click()\r\n            almacenamiento.classList.remove('hidden')\r\n            if(puntosAlmacenamiento <= 5){\r\n                p.textContent=\"El almacenamiento de esta laptop no es muy recomendable debido al poco espacio que posse\"\r\n            } else if(puntosAlmacenamiento <= 8){\r\n                p.textContent=\"El almacenamiento de esta laptop es recomendable, debido a que puede o no tener dos discos duros (HDD y SSD) de considerable tamaño\"\r\n            } else if(puntosAlmacenamiento <= 10){\r\n                p.textContent=\"El almacenamiento de esta laptop es muy recomendable, debido a que posee dos discos duros (HDD y SSD) de considerable tamaño\"\r\n            }\r\n            almacenamiento.append(h3)\r\n            almacenamiento.append(p)\r\n        })\r\n    })\r\n\r\n    btnDesactivarModal.addEventListener('click', e => {\r\n        procesador.classList.add('hidden');\r\n        tarjetaGrafica.classList.add('hidden');\r\n        memoriaRam.classList.add('hidden')\r\n        if(procesador.contains(h3) && procesador.contains(p)){\r\n            procesador.removeChild(h3)\r\n            procesador.removeChild(p)\r\n        }\r\n        if(tarjetaGrafica.contains(h3) && tarjetaGrafica.contains(p)){\r\n            tarjetaGrafica.removeChild(h3)\r\n            tarjetaGrafica.removeChild(p)\r\n        }\r\n        if(almacenamiento.contains(h3) && almacenamiento.contains(p)){\r\n            almacenamiento.removeChild(h3)\r\n            almacenamiento.removeChild(p)\r\n        }\r\n    })\r\n\r\n})()\n\n//# sourceURL=webpack://comparador/./src/js/activeModal.js?");

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