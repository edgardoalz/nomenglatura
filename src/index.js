import {crearMapa, crearMarcador, crearPosicion} from './mapa';
import {crearValor, obtenerResultado, obtenerNomenglatura, 
    gradosMinutosSegundosADecimales, obtenerCuadranteGlobal} from './calculo';
import $ from "jquery";

var mapa = document.getElementById("mapa");
var marcador = null;
window.cargarMapa = crearMapa(mapa);

var cuadranteGlobal = obtenerCuadranteGlobal();
var escala = $("#escala").first();
var latitud = {
    grados: $("#latGrados").first(),
    minutos: $("#latMinutos").first(),
    segundos: $("#latSegundos").first()
}
var longitud = {
    grados: $("#lngGrados").first(),
    minutos: $("#lngMinutos").first(),
    segundos: $("#lngSegundos").first()
}

function valores (elementos) {
    return Object.keys(elementos).reduce((resultado, k) => {
        resultado[k] = parseInt(elementos[k].val());
        return resultado;
    }, {});
}
$("#btnCalcular").on("click", event => {
    var escalaSeleccionada = parseInt(escala.val());
    if (isNaN(escalaSeleccionada)) {
        return mostrarError("Por favor seleccione una escala");
    }
    var longitudIngresada = valores(longitud);
    var valorLongitud = gradosMinutosSegundosADecimales(longitudIngresada);
    if (isNaN(valorLongitud)) {
        return mostrarError("La longitud ingresada no es valida");
    }
    var latitudIngresada = valores(latitud);
    var valorLatitud = gradosMinutosSegundosADecimales(latitudIngresada);
    if (isNaN(valorLatitud)) {
        return mostrarError("La latitud ingresada no es valida");
    }
    if (valorLongitud < cuadranteGlobal.huso.inicial || 
        valorLongitud > cuadranteGlobal.huso.final) {
        return mostrarError("La longitud debe estar en el siguiente rango " + cuadranteGlobal.huso.inicial + " a " + cuadranteGlobal.huso.final);
    }

    if (valorLatitud < cuadranteGlobal.banda.inicial || 
        valorLatitud > cuadranteGlobal.banda.final) {
        return mostrarError("La latitud debe estar en el siguiente rango " + cuadranteGlobal.banda.inicial + " a " + cuadranteGlobal.banda.final);
    }
    try {
        var resultado = obtenerResultado(escalaSeleccionada, latitudIngresada, longitudIngresada);
        var nomenglatura = obtenerNomenglatura(resultado);
        if (!marcador) {
            marcador = crearMarcador(window.mapa, crearPosicion(valorLatitud, valorLongitud));
        } else {
            marcador.setPosition(crearPosicion(valorLatitud, valorLongitud));
        }
        window.mapa.setCenter(marcador.getPosition());
        window.mapa.setZoom(14);
        mostrarResultado("Nomenglatura: "+ nomenglatura);
    } catch (err) {
        mostrarError(err);
    }
});

$("#cerrarMensaje").first().on("click", function () {
    $("#mensaje").addClass("is-invisible");
});

function mostrarError (mensaje) {
    $("#mensaje").removeClass("is-invisible is-success");
    $("#mensaje").addClass("is-warning");
    $("#mensajeContenido").html(mensaje);
}

function mostrarResultado (mensaje) {
    $("#mensaje").removeClass("is-invisible is-warning");
    $("#mensaje").addClass("is-success");
    $("#mensajeContenido").html(mensaje);
}
