
var url = "http://www.mocky.io/v2/59cff2730f0000190193dc96";

var urlbar = "http://www.mocky.io/v2/59ff56222e00003b0fca5969";

var bares = [];

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
  }

  function sincronizarBares() {
      MobileUI.ajax.get(urlbar, (err, res) => {
        if (err) {
          return;
        }
    
        var databar = JSON.parse(res.text);
    
        bares = [];
    
        databar.forEach(item => {
          var obj = {
            nome: item.nome,
            endereco: item.endereco,
            foto: item.foto,
            latitude: item.latitude,
            longitude: item.longitude
          }
    
          bares.push(obj);
        });
      });
    }