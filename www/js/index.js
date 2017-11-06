
var url = "http://www.mocky.io/v2/59cff2730f0000190193dc96";
var promo = [];

function sincronizar() {
  fetch(url)
    .then((response) => {
      response.json()
        .then( (elementos) =>{
          elementos.forEach((elemento) => {
            promo.push(elemento);
          });
        })
    })
}