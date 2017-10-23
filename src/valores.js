import {tipos} from './simbolo';
export var valores = {
    1000000: {
        padre: null,
    },
    500000: {
        padre: 1000000,
        tipoSimbolo: tipos.TEXTO,
        simboloInicial: 67, // C
        simboloUnico: true,
        bandas: 2,
        husos: 2,
    },
    250000: {
        padre: 1000000,
        tipoSimbolo: tipos.NUMERO,
        simboloInicial: 10, 
        simboloUnico: true,
        bandas: 4,
        husos: 3,
    },
    100000: {
        padre: 250000,
        tipoSimbolo: tipos.TEXTO,
        simboloInicial: 68, // D 
        simboloUnico: true,
        bandas: 2,
        husos: 3,
    },
    50000: {
        padre: 500000,
        tipoSimbolo: tipos.NUMERO,
        simboloInicial: 1,
        simboloUnico: false,
        bandas: 8,
        husos: 9,
    },
    20000: {
        padre: 50000,
        tipoSimbolo: tipos.TEXTO,
        simboloInicial: 100, // d
        simboloUnico: true,
        bandas: 2,
        husos: 3,
    },
    10000: {
        padre: 20000,
        tipoSimbolo: tipos.NUMERO,
        simboloInicial: 3,
        simboloUnico: true,
        bandas: 2,
        husos: 2,
    },
    5000: {
        padre: 10000,
        tipoSimbolo: tipos.TEXTO,
        simboloInicial: 99, // c
        simboloUnico: true,
        bandas: 2,
        husos: 2,
    },
    2000: {
        padre: 5000,
        tipoSimbolo: tipos.NUMERO,
        simboloInicial: 3,
        simboloUnico: true,
        bandas: 2,
        husos: 2,
    },
    1000: {
        padre: 2000,
        tipoSimbolo: tipos.TEXTO,
        simboloInicial: 99, // 'c'
        simboloUnico: true,
        bandas: 2,
        husos: 2,
    },
    500: {
        padre: 1000,
        tipoSimbolo: tipos.NUMERO,
        simboloInicial: 3,
        simboloUnico: true,
        bandas: 2,
        husos: 2,
    }
};