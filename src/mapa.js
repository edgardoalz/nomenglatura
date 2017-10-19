export var crearMapa = (elemento) => {
  return () => {
    return new google.maps.Map(elemento, {
      center: crearPosicion(25.8197105,-108.9799387),
      zoom: 15,
    });
  }
}

export var crearMarcador = (mapa, posicion) => {
  var marcardor = new google.maps.Marker({
    position: posicion,
    animation: google.maps.Animation.BOUNCE
  });
    
  marcardor.setMap(mapa);
  return marcardor;
}

export var crearPosicion = (lat, lng) => {
  return new google.maps.LatLng(lat, lng);
}

