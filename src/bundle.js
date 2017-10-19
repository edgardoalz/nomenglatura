/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mapa__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__calculo__ = __webpack_require__(2);



var mapa = document.getElementById("mapa");
// window.cargarMapa = crearMapa(mapa);
window.cargarMapa = () => {};
console.log(__WEBPACK_IMPORTED_MODULE_1__calculo__["c" /* cuadrantes */]);

var latitud = Object(__WEBPACK_IMPORTED_MODULE_1__calculo__["b" /* crearValor */])(26, 42, 33);
var longitud = Object(__WEBPACK_IMPORTED_MODULE_1__calculo__["b" /* crearValor */])(-108, 19, 19);

console.log(Object(__WEBPACK_IMPORTED_MODULE_1__calculo__["a" /* buscarCuadrante */])(latitud, longitud));

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export crearMapa */
/* unused harmony export crearMarcador */
/* unused harmony export crearPosicion */
var crearMapa = (elemento) => {
  return () => {
    return new google.maps.Map(elemento, {
      center: crearPosicion(25.8197105,-108.9799387),
      zoom: 15,
    });
  }
}

var crearMarcador = (mapa, posicion) => {
  var marcardor = new google.maps.Marker({
    position: posicion,
    animation: google.maps.Animation.BOUNCE
  });
    
  marcardor.setMap(mapa);
  return marcardor;
}

var crearPosicion = (lat, lng) => {
  return new google.maps.LatLng(lat, lng);
}



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return cuadrantes; });
/* unused harmony export gradosMinutosSegundosADecimales */
/* unused harmony export gradosDecimalesAMinutosSegundos */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return crearValor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buscarCuadrante; });
/* unused harmony export calcularSimboloBanda */
/* unused harmony export tipos */
/* unused harmony export escalas */
var cuadrantes = [...Array(6).keys()].map(huso => {
    return [...Array(6).keys()].map(banda => {
        return {
            huso: {
                simbolo: huso+11, 
                inicial: (huso*6)-120, 
                final: ((huso+1)*6)-120
            }, 
            banda: {
                simbolo: String.fromCharCode(banda+68), 
                inicial: (banda*4)+12, 
                final: ((banda+1)*4)+12 
            }
        }
    });
});

var gradosMinutosSegundosADecimales = (valor) => {
    var negative = valor.grados < 0;
    return (negative ? -1 : 1) * (Math.abs(valor.grados) + 1*(valor.minutos/60) + 1*(valor.segundos/3600));
}

var gradosDecimalesAMinutosSegundos = (valor) => {
    var negative = valor < 0;
    var resto = Math.abs(valor);
    var grados = Math.floor(resto);
    resto = (resto - grados) * 60;
    var minutos = Math.floor(resto);
    var segundos = Math.round((resto-minutos)*60);
    return {grados: (negative ? -1 : 1) * grados, minutos: minutos, segundos: segundos};
}
var crearValor = (grados, minutos, segundos) => {
    return {grados: grados, minutos: minutos, segundos: segundos};
}

var buscarCuadrante = (latitud, longitud) => {
    var latitudDecimal = gradosMinutosSegundosADecimales(latitud);
    var longitudDecimal = gradosMinutosSegundosADecimales(longitud);
    return cuadrantes.reduce((acumulado, cuadrante) => {
        return cuadrante.filter((cuadro) => {
            return (cuadro.huso.inicial <= longitudDecimal 
                && cuadro.huso.final >= longitudDecimal) &&
            (cuadro.banda.inicial <= latitudDecimal && 
                cuadro.banda.final >= latitudDecimal);
        }).concat(acumulado);
    }, []);
}

// Para calculo global
var calcularSimboloBanda = (indice) => {
    var bandasNoUsadas = ['I', 'O'];
    var bandaInicial = 67; // C
    var resultado = bandaInicial + indice;
    return resultado + bandasNoUsadas.reduce((acumulado, banda) => {
        return acumulado + ((resultado + acumulado) >= banda.charCodeAt() ? 1 : 0);
    }, 0);
}

var tipos = {'cadena': 0, 'CADENA': 1, 'numero': 2};
var escalas = {valor: 1000000, callback: buscarCuadrante};


/***/ })
/******/ ]);