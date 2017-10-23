import {crearMapa} from './mapa';
import {grilla, crearValor, obtenerResultado, obtenerNomenglatura} from './calculo';
import {valores} from './valores';

var mapa = document.getElementById("mapa");
window.cargarMapa = crearMapa(mapa);

var latitud = crearValor(26, 42, 33);
var longitud = crearValor(-108, 19, 19);

Object.keys(valores).reverse().forEach(valor => {
    var resultado = obtenerResultado(valor, latitud, longitud);
    var nomenglatura = obtenerNomenglatura(resultado);
    console.log(valor, "=>", nomenglatura);
});    
