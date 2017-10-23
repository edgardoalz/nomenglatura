export var tipos = {TEXTO: 0, NUMERO: 1};

export function obtenerConvertidorSimbolo (tipo) {
    if (tipo == tipos.TEXTO) {
        return simboloATexto;
    } else if (tipo == tipos.NUMERO) {
        return simboloANumero;
    }
}

export function simboloANumero (simbolo) {
    return simbolo;
}

export function simboloATexto (simbolo) {
    return String.fromCharCode(simbolo);
}