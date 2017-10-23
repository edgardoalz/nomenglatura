import {crearMapa} from './mapa';
import {grilla, crearValor, escalas} from './calculo';

var mapa = document.getElementById("mapa");
// window.cargarMapa = crearMapa(mapa);
window.cargarMapa = () => {};
console.log(grilla);

var latitud = crearValor(26, 42, 33);
var longitud = crearValor(-108, 19, 19);

console.log(escalas[500](latitud, longitud));