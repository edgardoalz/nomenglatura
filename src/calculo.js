export var escalas = {
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