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
console.log(__WEBPACK_IMPORTED_MODULE_1__calculo__["c" /* grilla */]);

var latitud = Object(__WEBPACK_IMPORTED_MODULE_1__calculo__["a" /* crearValor */])(26, 42, 33);
var longitud = Object(__WEBPACK_IMPORTED_MODULE_1__calculo__["a" /* crearValor */])(-108, 19, 19);

console.log(__WEBPACK_IMPORTED_MODULE_1__calculo__["b" /* escalas */][500](latitud, longitud));

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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return escalas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return grilla; });
/* unused harmony export gradosMinutosSegundosADecimales */
/* unused harmony export gradosDecimalesAMinutosSegundos */
/* harmony export (immutable) */ __webpack_exports__["a"] = crearValor;
var escalas = {
    1000000: primerCuadrante,
    500000: segundoCuadrante,
    250000: tercerCuadrante,
    100000: cuartoCuadrante,
    50000: quintoCuadrante,
    20000: sextoCuadrante,
    10000: septimoCuadrante,
    5000: octavoCuadrante,
    2000: novenoCuadrante,
    1000: decimoCuadrante,
    500: onceavoCuadrante
};

var grilla = [...Array(6).keys()].map(huso => {
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
            },
            simboloUnico: false
        }
    });
});

function gradosMinutosSegundosADecimales (valor) {
    var negative = valor.grados < 0;
    return (negative ? -1 : 1) * (Math.abs(valor.grados) + 1*(valor.minutos/60) + 1*(valor.segundos/3600));
}

function gradosDecimalesAMinutosSegundos (valor) {
    var negative = valor < 0;
    var resto = Math.abs(valor);
    var grados = Math.floor(resto);
    resto = (resto - grados) * 60;
    var minutos = Math.floor(resto);
    var segundos = Math.round((resto-minutos)*60);
    return crearValor((negative ? -1 : 1) * grados, minutos, segundos);
}
function crearValor (grados, minutos, segundos) {
    return {grados: grados, minutos: minutos, segundos: segundos};
}

function encontrarCuadrante (cuadrantes, latitud, longitud) {
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
function primerCuadrante (latitud, longitud) {
    return obtenerCuadrante(grilla, latitud, longitud);
}

function obtenerCuadrante (cuadrante, latitud, longitud) {
    var cuadrantes = encontrarCuadrante(cuadrante, latitud, longitud);
    if (!cuadrantes.length) {
        throw new Error("No se encontro el cuadrante buscado");
    }
    return cuadrantes[0];
}

function segundoCuadrante (latitud, longitud) {
    var simboloInicial = 67; // C
    var divisiones = 2;
    var simboloUnico = true;
    var cuadrante = obtenerCuadrante(grilla, latitud, longitud);
    var subCuadrantes = calcularSubCuadrantes(cuadrante, simboloInicial, latitud, longitud, divisiones, divisiones, simboloUnico, x => String.fromCharCode(x));
    var resultado = obtenerCuadrante(subCuadrantes, latitud, longitud);
    resultado.padre = cuadrante;
    resultado.simboloUnico = simboloUnico;
    return resultado;
}

function tercerCuadrante (latitud, longitud) {
    var simboloInicial = 10;
    var divisionesBanda = 4;
    var divisionesHuso = 3;
    var simboloUnico = true;
    var cuadrante = obtenerCuadrante(grilla, latitud, longitud);
    var subCuadrantes = calcularSubCuadrantes(cuadrante, simboloInicial, latitud, longitud, divisionesBanda, divisionesHuso, simboloUnico, x => x);
    var resultado = obtenerCuadrante(subCuadrantes, latitud, longitud);
    resultado.padre = cuadrante;
    resultado.simboloUnico = simboloUnico;
    return resultado;
}

function cuartoCuadrante (latitud, longitud) {
    var simboloInicial = 68; // D
    var divisionesBanda = 2;
    var divisionesHuso = 3;
    var simboloUnico = true;
    var cuadrante = tercerCuadrante(latitud, longitud);
    var subCuadrantes = calcularSubCuadrantes(cuadrante, simboloInicial, latitud, longitud, divisionesBanda, divisionesHuso, simboloUnico, x => String.fromCharCode(x));
    var resultado = obtenerCuadrante(subCuadrantes, latitud, longitud);
    resultado.padre = cuadrante;
    resultado.simboloUnico = simboloUnico;
    return resultado;
}

function quintoCuadrante (latitud, longitud) {
    var simboloInicial = 1;
    var divisionesBanda = 8;
    var divisionesHuso = 9;
    var simboloUnico = false;
    var cuadrante = segundoCuadrante(latitud, longitud);
    var subCuadrantes = calcularSubCuadrantes(cuadrante, simboloInicial, latitud, longitud, divisionesBanda, divisionesHuso, simboloUnico, x => x);
    var resultado = obtenerCuadrante(subCuadrantes, latitud, longitud);
    resultado.padre = cuadrante;
    resultado.simboloUnico = simboloUnico;
    return resultado;
}

function sextoCuadrante (latitud, longitud) {
    var simboloInicial = 100; // d
    var divisionesBanda = 2;
    var divisionesHuso = 3;
    var simboloUnico = true;
    var cuadrante = quintoCuadrante(latitud, longitud);
    var subCuadrantes = calcularSubCuadrantes(cuadrante, simboloInicial, latitud, longitud, divisionesBanda, divisionesHuso, simboloUnico, x => String.fromCharCode(x));
    var resultado = obtenerCuadrante(subCuadrantes, latitud, longitud);
    resultado.padre = cuadrante;
    resultado.simboloUnico = simboloUnico;
    return resultado;
}

function septimoCuadrante (latitud, longitud) {
    var simboloInicial = 3;
    var divisionesBanda = 2;
    var divisionesHuso = 2;
    var simboloUnico = true;
    var cuadrante = sextoCuadrante(latitud, longitud);
    var subCuadrantes = calcularSubCuadrantes(cuadrante, simboloInicial, latitud, longitud, divisionesBanda, divisionesHuso, simboloUnico, x => x);
    var resultado = obtenerCuadrante(subCuadrantes, latitud, longitud);
    resultado.padre = cuadrante;
    resultado.simboloUnico = simboloUnico;
    return resultado;
}

function octavoCuadrante (latitud, longitud) {
    var simboloInicial = 99; 'c'
    var divisionesBanda = 2;
    var divisionesHuso = 2;
    var simboloUnico = true;
    var cuadrante = septimoCuadrante(latitud, longitud);
    var subCuadrantes = calcularSubCuadrantes(cuadrante, simboloInicial, latitud, longitud, divisionesBanda, divisionesHuso, simboloUnico, x => String.fromCharCode(x));
    var resultado = obtenerCuadrante(subCuadrantes, latitud, longitud);
    resultado.padre = cuadrante;
    resultado.simboloUnico = simboloUnico;
    return resultado;
}

function novenoCuadrante (latitud, longitud) {
    var simboloInicial = 3;
    var divisionesBanda = 2;
    var divisionesHuso = 2;
    var simboloUnico = true;
    var cuadrante = octavoCuadrante(latitud, longitud);
    var subCuadrantes = calcularSubCuadrantes(cuadrante, simboloInicial, latitud, longitud, divisionesBanda, divisionesHuso, simboloUnico, x => x);
    var resultado = obtenerCuadrante(subCuadrantes, latitud, longitud);
    resultado.padre = cuadrante;
    resultado.simboloUnico = simboloUnico;
    return resultado;
}

function decimoCuadrante (latitud, longitud) {
    var simboloInicial = 99; // 'c'
    var divisionesBanda = 2;
    var divisionesHuso = 2;
    var simboloUnico = true;
    var cuadrante = novenoCuadrante(latitud, longitud);
    var subCuadrantes = calcularSubCuadrantes(cuadrante, simboloInicial, latitud, longitud, divisionesBanda, divisionesHuso, simboloUnico, x => String.fromCharCode(x));
    var resultado = obtenerCuadrante(subCuadrantes, latitud, longitud);
    resultado.padre = cuadrante;
    resultado.simboloUnico = simboloUnico;
    return resultado;
}

function onceavoCuadrante (latitud, longitud) {
    var simboloInicial = 3;
    var divisionesBanda = 2;
    var divisionesHuso = 2;
    var simboloUnico = true;
    var cuadrante = decimoCuadrante(latitud, longitud);
    var subCuadrantes = calcularSubCuadrantes(cuadrante, simboloInicial, latitud, longitud, divisionesBanda, divisionesHuso, simboloUnico, x => x);
    var resultado = obtenerCuadrante(subCuadrantes, latitud, longitud);
    resultado.padre = cuadrante;
    resultado.simboloUnico = simboloUnico;
    return resultado;
}

function calcularSubCuadrantes(cuadrante, simboloInicial, latitud, longitud, divisionesBanda, divisionesHuso, simboloUnico, convertirSimbolo) {
    var tamanoHuso = (cuadrante.huso.final - cuadrante.huso.inicial) / divisionesHuso;
    var tamanoBanda = (cuadrante.banda.final - cuadrante.banda.inicial) / divisionesBanda;
    var latitudDecimal = gradosMinutosSegundosADecimales(latitud);
    var longitudDecimal = gradosMinutosSegundosADecimales(longitud);
    return [...Array(divisionesHuso).keys()].map(x => {
        return [...Array(divisionesBanda).keys()].map(y => {
            return {
                huso: {
                    simbolo: convertirSimbolo(simboloUnico ? 
                        (x-(y*divisionesHuso))+simboloInicial : 
                        x+1), 
                    inicial: cuadrante.huso.inicial + (x*tamanoHuso), 
                    final: cuadrante.huso.inicial + ((x+1)*tamanoHuso)
                }, 
                banda: {
                    simbolo: convertirSimbolo(simboloUnico ? 
                        (x-(y*divisionesHuso))+simboloInicial : 
                        divisionesBanda-y),
                    inicial: cuadrante.banda.inicial + (y*tamanoBanda), 
                    final: cuadrante.banda.inicial + ((y+1)*tamanoBanda)
                }
            }
        });
    });
}

/***/ })
/******/ ]);