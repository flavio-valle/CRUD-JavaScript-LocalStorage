'use strict'
// const produtoTemporario = {
//     codigo: "00005",
//     descricao: "Borracha"
// }
const pegarLocalStorage = () => JSON.parse(localStorage.getItem('db_produto')) ?? []
const setLocalStorage = (dbProduto) => localStorage.setItem("db_produto",JSON.stringify(dbProduto))

// PROPRIEDADES DO CRUD - 4 ETAPAS

// DELETE - (D)

const deletar = (indice) => {
    const dbProduto = lerProduto()
    dbProduto.splice(indice,1)
    setLocalStorage(dbProduto)
}

// UPDATE - (U)
const editarProduto = (indice, produto) => {
    const dbProduto = lerProduto()
    dbProduto[indice] = produto
    setLocalStorage(dbProduto)
}

// READ - (R)

const lerProduto = () => pegarLocalStorage()

// CREATE - C

const criarProduto = (produto) => {
    const dbProduto = pegarLocalStorage()
    dbProduto.push(produto)
    setLocalStorage(dbProduto)
}

const CampoValido = () => {
    return document.getElementById('formulario').reportValidity()
}

// interagir com front
const salvarProduto = () => {
    if (CampoValido()) {
        const produto = {
            codigo: document.getElementById('CampoCodigo').value,
            descricao: document.getElementById('CampoDescricao').value
        }
        
        criarProduto(produto)
    }
}

const CriarLinha = (produto, indice) => {
    const NovaLinha = document.createElement('tr')
    NovaLinha.innerHTML = `
    <td id="ValorCodigo">${produto.codigo}</td>
    <td id="ValorDescricao">${produto.descricao}</td>
    <td>
        <button type="button" class="btn-excluir"id="excluir-${indice}">Excluir</button> 
        <button type="button" class="btn-editar" id="editar-${indice}">Editar</button>
    </td>
    `
    document.querySelector('#tabProduto>tbody').appendChild(NovaLinha)
}

const LimparTabela = () => {
    const linhas = document.querySelectorAll('#tabProduto>tbody tr')
    linhas.forEach(linha => linha.parentNode.removeChild(linha))
}

const AtualizarTabela = () => {
    const dbProduto = lerProduto()
    LimparTabela()
    dbProduto.forEach(CriarLinha)
}

const editProduto = (indice) => {
 const produto = lerProduto()[indice]
 produto.indice = indice
 let editarCodigo = (prompt("Digite o novo valor do codigo: "))
 let editarDescricao = (prompt("digite a descrição do novo produto: "))

 const novoObjeto =  {
                         codigo: editarCodigo,
                         descricao: editarDescricao
                     }
const dados = pegarLocalStorage();
dados[indice] = novoObjeto;
localStorage.setItem("db_produto", JSON.stringify(dados));
CriarLinha(dados)

AtualizarTabela();
}

const removerElemento = (evento) => {
if (evento.target.type == 'button') {
const [action, indice] = evento.target.id.split('-')
    if (action == 'editar') {

pegarLocalStorage()
editProduto(indice)

        }
    else {
      const pegardb =  pegarLocalStorage()
      pegardb.splice(indice, 1)
    setLocalStorage(pegardb)
    AtualizarTabela()
    }
}
}

AtualizarTabela();

document.getElementById('salvar').addEventListener('click', salvarProduto)
document.querySelector('#tabProduto>tbody').addEventListener('click', removerElemento)