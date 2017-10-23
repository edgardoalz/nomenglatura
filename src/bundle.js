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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__valores__ = __webpack_require__(3);




var mapa = document.getElementById("mapa");
window.cargarMapa = Object(__WEBPACK_IMPORTED_MODULE_0__mapa__["a" /* crearMapa */])(mapa);

var latitud = Object(__WEBPACK_IMPORTED_MODULE_1__calculo__["a" /* crearValor */])(26, 42, 33);
var longitud = Object(__WEBPACK_IMPORTED_MODULE_1__calculo__["a" /* crearValor */])(-108, 19, 19);

Object.keys(__WEBPACK_IMPORTED_MODULE_2__valores__["a" /* valores */]).reverse().forEach(valor => {
    var resultado = Object(__WEBPACK_IMPORTED_MODULE_1__calculo__["c" /* obtenerResultado */])(valor, latitud, longitud);
    var nomenglatura = Object(__WEBPACK_IMPORTED_MODULE_1__calculo__["b" /* obtenerNomenglatura */])(resultado);
    console.log(valor, "=>", nomenglatura);
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return crearMapa; });
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
/* unused harmony export grilla */
/* unused harmony export gradosMinutosSegundosADecimales */
/* unused harmony export gradosDecimalesAMinutosSegundos */
/* harmony export (immutable) */ __webpack_exports__["a"] = crearValor;
/* harmony export (immutable) */ __webpack_exports__["b"] = obtenerNomenglatura;
/* harmony export (immutable) */ __webpack_exports__["c"] = obtenerResultado;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__valores__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__simbolo__ = __webpack_require__(4);



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

function obtenerNomenglatura (valor) {
    var nomenglatura = valor.simboloUnico ? 
        valor.cuadrante.banda.simbolo :
        valor.cuadrante.banda.simbolo+valor.cuadrante.huso.simbolo;
    if (!valor.padre) {
        return nomenglatura;
    }
    return obtenerNomenglatura(valor.padre) + nomenglatura;
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

function obtenerCuadrante (cuadrante, latitud, longitud) {
    var cuadrantes = encontrarCuadrante(cuadrante, latitud, longitud);
    if (!cuadrantes.length) {
        throw new Error("No se encontro el cuadrante buscado");
    }
    return cuadrantes[0];
}

function obtenerResultado (escala, latitud, longitud) {
    var valor = __WEBPACK_IMPORTED_MODULE_0__valores__["a" /* valores */][escala];
    var resultado = {};
    var subCuadrantes = {};
    if (!valor) {
        throw new Error("No existe configuración para la escala seleccionada");
    }

    if (!valor.padre) {
        return {cuadrante: obtenerCuadrante(grilla, latitud, longitud)};
    } 

    resultado.padre = obtenerResultado(valor.padre, latitud, longitud);
    subCuadrantes = calcularSubCuadrantes(resultado.padre.cuadrante, valor.simboloInicial, latitud, longitud, valor.bandas, valor.husos, valor.simboloUnico, Object(__WEBPACK_IMPORTED_MODULE_1__simbolo__["a" /* obtenerConvertidorSimbolo */])(valor.tipoSimbolo));
    resultado.cuadrante = obtenerCuadrante(subCuadrantes, latitud, longitud);
    resultado.simboloUnico = valor.simboloUnico;
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

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return valores; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__simbolo__ = __webpack_require__(4);

var valores = {
    1000000: {
        padre: null,
    },
    500000: {
        padre: 1000000,
        tipoSimbolo: __WEBPACK_IMPORTED_MODULE_0__simbolo__["b" /* tipos */].TEXTO,
        simboloInicial: 67, // C
        simboloUnico: true,
        bandas: 2,
        husos: 2,
    },
    250000: {
        padre: 1000000,
        tipoSimbolo: __WEBPACK_IMPORTED_MODULE_0__simbolo__["b" /* tipos */].NUMERO,
        simboloInicial: 10, 
        simboloUnico: true,
        bandas: 4,
        husos: 3,
    },
    100000: {
        padre: 250000,
        tipoSimbolo: __WEBPACK_IMPORTED_MODULE_0__simbolo__["b" /* tipos */].TEXTO,
        simboloInicial: 68, // D 
        simboloUnico: true,
        bandas: 2,
        husos: 3,
    },
    50000: {
        padre: 500000,
        tipoSimbolo: __WEBPACK_IMPORTED_MODULE_0__simbolo__["b" /* tipos */].NUMERO,
        simboloInicial: 1,
        simboloUnico: false,
        bandas: 8,
        husos: 9,
    },
    20000: {
        padre: 50000,
        tipoSimbolo: __WEBPACK_IMPORTED_MODULE_0__simbolo__["b" /* tipos */].TEXTO,
        simboloInicial: 100, // d
        simboloUnico: true,
        bandas: 2,
        husos: 3,
    },
    10000: {
        padre: 20000,
        tipoSimbolo: __WEBPACK_IMPORTED_MODULE_0__simbolo__["b" /* tipos */].NUMERO,
        simboloInicial: 3,
        simboloUnico: true,
        bandas: 2,
        husos: 2,
    },
    5000: {
        padre: 10000,
        tipoSimbolo: __WEBPACK_IMPORTED_MODULE_0__simbolo__["b" /* tipos */].TEXTO,
        simboloInicial: 99, // c
        simboloUnico: true,
        bandas: 2,
        husos: 2,
    },
    2000: {
        padre: 5000,
        tipoSimbolo: __WEBPACK_IMPORTED_MODULE_0__simbolo__["b" /* tipos */].NUMERO,
        simboloInicial: 3,
        simboloUnico: true,
        bandas: 2,
        husos: 2,
    },
    1000: {
        padre: 2000,
        tipoSimbolo: __WEBPACK_IMPORTED_MODULE_0__simbolo__["b" /* tipos */].TEXTO,
        simboloInicial: 99, // 'c'
        simboloUnico: true,
        bandas: 2,
        husos: 2,
    },
    500: {
        padre: 1000,
        tipoSimbolo: __WEBPACK_IMPORTED_MODULE_0__simbolo__["b" /* tipos */].NUMERO,
        simboloInicial: 3,
        simboloUnico: true,
        bandas: 2,
        husos: 2,
    }
};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return tipos; });
/* harmony export (immutable) */ __webpack_exports__["a"] = obtenerConvertidorSimbolo;
/* unused harmony export simboloANumero */
/* unused harmony export simboloATexto */
var tipos = {TEXTO: 0, NUMERO: 1};

function obtenerConvertidorSimbolo (tipo) {
    if (tipo == tipos.TEXTO) {
        return simboloATexto;
    } else if (tipo == tipos.NUMERO) {
        return simboloANumero;
    }
}

function simboloANumero (simbolo) {
    return simbolo;
}

function simboloATexto (simbolo) {
    return String.fromCharCode(simbolo);
}

/***/ })
/******/ ]);