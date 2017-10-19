export var cuadrantes = [...Array(6).keys()].map(huso => {
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

export var gradosMinutosSegundosADecimales = (valor) => {
    var negative = valor.grados < 0;
    return (negative ? -1 : 1) * (Math.abs(valor.grados) + 1*(valor.minutos/60) + 1*(valor.segundos/3600));
}

export var gradosDecimalesAMinutosSegundos = (valor) => {
    var negative = valor < 0;
    var resto = Math.abs(valor);
    var grados = Math.floor(resto);
    resto = (resto - grados) * 60;
    var minutos = Math.floor(resto);
    var segundos = Math.round((resto-minutos)*60);
    return {grados: (negative ? -1 : 1) * grados, minutos: minutos, segundos: segundos};
}
export var crearValor = (grados, minutos, segundos) => {
    return {grados: grados, minutos: minutos, segundos: segundos};
}

export var buscarCuadrante = (latitud, longitud) => {
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
export var calcularSimboloBanda = (indice) => {
    var bandasNoUsadas = ['I', 'O'];
    var bandaInicial = 67; // C
    var resultado = bandaInicial + indice;
    return resultado + bandasNoUsadas.reduce((acumulado, banda) => {
        return acumulado + ((resultado + acumulado) >= banda.charCodeAt() ? 1 : 0);
    }, 0);
}

export var tipos = {'cadena': 0, 'CADENA': 1, 'numero': 2};
export var escalas = {valor: 1000000, callback: buscarCuadrante};
