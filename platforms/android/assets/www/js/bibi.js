/*------------------------------------------------------------------------*/
/*-----------------------------| AUTENTICAR |-----------------------------*/
/*------------------------------------------------------------------------*/
function autenticar() {

}

/*------------------------------------------------------------------------*/
/*----------------------------| SINCRONIZAR |-----------------------------*/
/*------------------------------------------------------------------------*/
var conteudos = [];
var arrayBd = [];
var arrayEs = [];
var arrayProg = [];
var arrayPi = [];
var arrayPo = [];
var arraySo = [];

function sincronizar() {
  loading('Sincronizando...');

  MobileUI.ajax.get('http://localhost:3000/conteudo', (err, res) => {
    if (err) {
      closeLoading();
      mostrarMensagemDeErro('erro-listar', 'Não foi possível recuperar as informações.');
      return;
    }

    var data = JSON.parse(res.text);

    conteudos = [];

    data.forEach(item => {
      var obj = {
        id: item._id,
        pergunta: item.pergunta,
        resposta: item.resposta,
        autor: formatarNome(item.autor),
        materia: formatarNome(item.materia),
        nivel: item.nivel
      }

      conteudos.push(obj);
    });

    closeLoading();
    atualizarStats();
  });
}

function sincronizarComFiltros() {
  let conteudoFiltrado = MobileUI.objectByForm('form-filtrar');
  loadingElement('botao-filtrar');

  if (!conteudoFiltrado.materia && !conteudoFiltrado.autor) {
    closeLoading('botao-filtrar');
    mostrarMensagemDeErro('erro-filtrar', 'Por favor, preencha o que deseja filtrar.');
    return;
  }

  if (conteudoFiltrado.materia && !conteudoFiltrado.autor) {
    let materia = conteudoFiltrado.materia;

    MobileUI.ajax.get('http://localhost:3000/conteudo/materia/filtro?materia=' + materia, (err, res) => {
      if (err) {
        closeLoading('botao-filtrar');
        mostrarMensagemDeErro('erro-filtrar', 'Não foi recuperar os dados.');
        return;
      }

      var data = JSON.parse(res.text);

      if (data.length == 0) {
        closeLoading('botao-filtrar');
        mostrarMensagemDeErro('erro-filtrar', 'Não foi possível aplicar o filtro.');
        return;
      }

      conteudos = [];

      data.forEach(item => {
        let obj = {
          id: item._id,
          pergunta: item.pergunta,
          resposta: item.resposta,
          autor: formatarNome(item.autor),
          materia: formatarNome(item.materia),
          nivel: item.nivel
        }

        conteudos.push(obj);
      });

      closeLoading('botao-filtrar');
      atualizarStats();
      mostrarMensagemDeSucesso('sucesso-filtrar', 'Filtro aplicado com sucesso!');
    });
  }

  if (!conteudoFiltrado.materia && conteudoFiltrado.autor) {
    let autor = conteudoFiltrado.autor;

    MobileUI.ajax.get('http://localhost:3000/conteudo/autor/filtro?autor=' + autor, (err, res) => {
      if (err) {
        closeLoading('botao-filtrar');
        mostrarMensagemDeErro('erro-filtrar', 'Não foi recuperar os dados.');
        return;
      }

      var data = JSON.parse(res.text);

      if (data.length == 0) {
        closeLoading('botao-filtrar');
        mostrarMensagemDeErro('erro-filtrar', 'Não foi possível aplicar o filtro.');
        return;
      }

      conteudos = [];

      data.forEach(item => {
        let obj = {
          id: item._id,
          pergunta: item.pergunta,
          resposta: item.resposta,
          autor: formatarNome(item.autor),
          materia: formatarNome(item.materia),
          nivel: item.nivel
        }

        conteudos.push(obj);
      });

      closeLoading('botao-filtrar');
      atualizarStats();
      mostrarMensagemDeSucesso('sucesso-filtrar', 'Filtro aplicado com sucesso!');
    });
  }

  if (conteudoFiltrado.materia && conteudoFiltrado.autor) {
    let materia = conteudoFiltrado.materia;
    let autor = conteudoFiltrado.autor;

    MobileUI.ajax.get('http://localhost:3000/conteudo/avancado/filtro?autor=' + autor + '&materia=' + materia, (err, res) => {
      if (err) {
        closeLoading('botao-filtrar');
        mostrarMensagemDeErro('erro-filtrar', 'Não foi recuperar os dados.');
        return;
      }

      var data = JSON.parse(res.text);

      if (data.length == 0) {
        closeLoading('botao-filtrar');
        mostrarMensagemDeErro('erro-filtrar', 'Não foi possível aplicar o filtro.');
        return;
      }

      conteudos = [];

      data.forEach(item => {
        let obj = {
          id: item._id,
          pergunta: item.pergunta,
          resposta: item.resposta,
          autor: formatarNome(item.autor),
          materia: formatarNome(item.materia),
          nivel: item.nivel
        }

        conteudos.push(obj);
      });

      closeLoading('botao-filtrar');
      atualizarStats();
      mostrarMensagemDeSucesso('sucesso-filtrar', 'Filtro aplicado com sucesso!');
    });
  }
}

/*------------------------------------------------------------------------*/
/*-----------------------------| ADICIONAR |------------------------------*/
/*------------------------------------------------------------------------*/

function adicionar() {
  let conteudo = MobileUI.objectByForm('form-adicionar');
  loadingElement('botao-adicionar');

  if (!conteudo.pergunta) {
    closeLoading('botao-adicionar');
    mostrarMensagemDeErro('erro-adicionar', 'Por favor, preencha o campo de pergunta.');
    return;
  }

  if (conteudo.pergunta.length < 6) {
    closeLoading('botao-adicionar');
    mostrarMensagemDeErro('erro-adicionar', 'A pergunta deve conter pelo menos 6 caracteres.');
    return;
  }

  if (!conteudo.resposta) {
    closeLoading('botao-adicionar');
    mostrarMensagemDeErro('erro-adicionar', 'Por favor, preencha o campo de resposta.');
    return;
  }

  if (conteudo.resposta.length < 6) {
    closeLoading('botao-adicionar');
    mostrarMensagemDeErro('erro-adicionar', 'A resposta deve conter pelo menos 6 caracteres.');
    return;
  }

  if (!conteudo.autor) {
    closeLoading('botao-adicionar');
    mostrarMensagemDeErro('erro-adicionar', 'Por favor, preencha o campo do autor.');
    return;
  }

  if (conteudo.autor.length < 4) {
    closeLoading('botao-adicionar');
    mostrarMensagemDeErro('erro-adicionar', 'O autor deve conter pelo menos 4 caracteres.');
    return;
  }

  if (!conteudo.materia) {
    closeLoading('botao-adicionar');
    mostrarMensagemDeErro('erro-adicionar', 'Por favor, preencha o campo de matéria.');
    return;
  }

  MobileUI.ajax.post('http://localhost:3000/conteudo/novo', conteudo, (err, res) => {
    if (err) {
      closeLoading('botao-adicionar');
      mostrarMensagemDeErro('erro-adicionar', 'Ocorreu um erro ao salvar os dados.');
      return;
    }
    
    MobileUI.clearForm('form-adicionar');
    closeLoading('botao-adicionar');
    mostrarMensagemDeSucesso('sucesso-adicionar', 'Adicionada com sucesso!');
    
    setTimeout(() => sincronizar(), 500);
  });
}

/*------------------------------------------------------------------------*/
/*-------------------------------| ALERTA |-------------------------------*/
/*------------------------------------------------------------------------*/

function exibirAlerta($$index) {
  alert({
    title:'Atenção!',
    message:'O que deseja fazer?',
    class:'black-opacity-90 text-white radius',
    buttons: [
      {
        label:'Excluir',
        class:'text-white',
        onclick: () => {
          let indice = $$index;
          MobileUI.ajax.delete('http://localhost:3000/conteudo/' + conteudos[indice].id, (err, res) => {
            if (err) {
              mostrarMensagemDeErro('erro-remover','Ocorreu um erro ao remover os dados.');
              return;
            }

            sincronizar();
            mostrarMensagemDeSucesso('sucesso-remover', 'Removida com sucesso!');
            closeLoading();
          });
        }
      },
      {
        label:'Não sei',
        class:'text-white',
        onclick: () => {
          closeAlert();
        }
      }
    ]
  });
}

/*------------------------------------------------------------------------*/
/*--------------------------------| STATS |-------------------------------*/
/*------------------------------------------------------------------------*/

function stats() {
  arrayBd = [];
  arrayEs = [];
  arrayProg = [];
  arrayPi = [];
  arrayPo = [];
  arraySo = [];

  conteudos.forEach(conteudo => {
    if (conteudo.materia === 'Banco de Dados') arrayBd.push(conteudo);
    if (conteudo.materia === 'Engenharia de Software III') arrayEs.push(conteudo);
    if (conteudo.materia === 'Programação II') arrayProg.push(conteudo);
    if (conteudo.materia === 'Projeto Integrador II') arrayPi.push(conteudo);
    if (conteudo.materia === 'Pesquisa Operacional') arrayPo.push(conteudo);
    if (conteudo.materia === 'Sistemas Operacionais') arraySo.push(conteudo);
  });
};

function atualizarStats() {
  stats();
  ProgressCircle.rebind();
  document.getElementById('statBd').progressCircle.update(arrayBd.length / 10);
  document.getElementById('statEs').progressCircle.update(arrayEs.length / 10);
  document.getElementById('statProg').progressCircle.update(arrayProg.length / 10);
  document.getElementById('statPi').progressCircle.update(arrayPi.length / 10);
  document.getElementById('statPo').progressCircle.update(arrayPo.length / 10);
  document.getElementById('statSo').progressCircle.update(arraySo.length / 10);
};

/*------------------------------------------------------------------------*/
/*------------------------------| UTILIDADE |-----------------------------*/
/*------------------------------------------------------------------------*/

function transformarValorDoTemaEAutorEmUpperCase(objeto) {
  for (var propriedade in objeto) {
    if (propriedade != 'pergunta' && propriedade != 'resposta') {
      objeto[propriedade] = objeto[propriedade].toUpperCase();
    }
  }
}

function formatarNome(nome) {
  var listaDeNomes = nome.split(' ');
  var listaDeNomesFormatada = listaDeNomes.map(nome => {
    if (/^d(a|e|i|o|os)$/i.test(nome)) {
      return nome.toLowerCase();
    }

    if (/^(i|ii|iii|iiii|iiiii)$/i.test(nome)) {
      return nome.toUpperCase();
    }

    if (/^u(i|x)$/i.test(nome)) {
      return nome.toUpperCase();
    }

    return nome.charAt(0).toUpperCase() + nome.substring(1).toLowerCase();
  });

  return listaDeNomesFormatada.join(' ');
}

function escolherMateria(materia) {
  $('#materia').val(materia);
}

/*------------------------------------------------------------------------*/
/*-----------------------------| MENSAGENS |------------------------------*/
/*------------------------------------------------------------------------*/

function mostrarMensagemDeErro(status, mensagem) {
  $('#mensagem-de-' + status).text(mensagem);
  MobileUI.show(status);
  setTimeout(() => {
    MobileUI.hide(status);
  }, 1500);
}

function mostrarMensagemDeSucesso(status, mensagem) {
  $('#mensagem-de-' + status).text(mensagem);
  MobileUI.show(status);
  setTimeout(() => {
    MobileUI.hide(status);
  }, 1500);
}

$('#botao-index-menu').click(() => {
  $('.list').animate({left: "+=10px"}, "fast");
  $('.list').animate({left: "-=20px"}, "fast");
  $('.list').animate({left: "+=10px"}, "fast");
});