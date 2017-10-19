import {crearMapa} from './mapa';
import {cuadrantes, crearValor, buscarCuadrante} from './calculo';

var mapa = document.getElementById("mapa");
// window.cargarMapa = crearMapa(mapa);
window.cargarMapa = () => {};
console.log(cuadrantes);

var latitud = crearValor(26, 42, 33);
var longitud = crearValor(-108, 19, 19);

console.log(buscarCuadrante(latitud, longitud));