
var url = "http://www.mocky.io/v2/59cff2730f0000190193dc96";

var promo = [];



function sincronizar() {
  
    MobileUI.ajax.get(url, (err, res) => {
      if (err) {
        return;
      }
  
      var data = JSON.parse(res.text);
  
      promo = [];
  
      data.forEach(item => {
        var obj = {
          nomeBar: item.nomeBar,
          preco: item.preco,
          descricao: item.descricao,
          curtidas: item.curtidas,
          foto: item.foto
        }
  
        promo.push(obj);
      });
  
    });
    console.log(data);
    console.log(promo[0].nomeBar);

  }