import {valores} from './valores';
import {obtenerConvertidorSimbolo} from './simbolo';

export var grilla = [...Array(6).keys()].map(huso => {
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

export function gradosMinutosSegundosADecimales (valor) {
    var negative = valor.grados < 0;
    return (negative ? -1 : 1) * (Math.abs(valor.grados) + 1*(valor.minutos/60) + 1*(valor.segundos/3600));
}

export function gradosDecimalesAMinutosSegundos (valor) {
    var negative = valor < 0;
    var resto = Math.abs(valor);
    var grados = Math.floor(resto);
    resto = (resto - grados) * 60;
    var minutos = Math.floor(resto);
    var segundos = Math.round((resto-minutos)*60);
    return crearValor((negative ? -1 : 1) * grados, minutos, segundos);
}

export function crearValor (grados, minutos, segundos) {
    return {grados: grados, minutos: minutos, segundos: segundos};
}

export function obtenerNomenglatura (valor) {
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

export function obtenerResultado (escala, latitud, longitud) {
    var valor = valores[escala];
    var resultado = {};
    var subCuadrantes = {};
    if (!valor) {
        throw new Error("No existe configuración para la escala seleccionada");
    }

    if (!valor.padre) {
        return {cuadrante: obtenerCuadrante(grilla, latitud, longitud)};
    } 

    resultado.padre = obtenerResultado(valor.padre, latitud, longitud);
    subCuadrantes = calcularSubCuadrantes(resultado.padre.cuadrante, valor.simboloInicial, latitud, longitud, valor.bandas, valor.husos, valor.simboloUnico, obtenerConvertidorSimbolo(valor.tipoSimbolo));
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