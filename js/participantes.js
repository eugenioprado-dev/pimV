console.log("JS participantes carregado");

let participantes = JSON.parse(localStorage.getItem("participantes")) || [];

let tabela = document.getElementById("listaParticipantes");

const senhaAdmin = "admin123";

function carregarParticipantes(){

tabela.innerHTML = "";

participantes.forEach((p, index) => {

let linha = `
<tr>
<td>${p.nome}</td>
<td>${p.email}</td>
<td>${p.cpf}</td>
<td>
<button onclick="removerParticipante(${index})">Remover</button>
</td>
</tr>
`;

tabela.innerHTML += linha;

});

}

function removerParticipante(index){

let senha = prompt("Digite a senha de administrador:");

if(senha !== senhaAdmin){

alert("Senha incorreta!");

return;

}

participantes.splice(index,1);

localStorage.setItem("participantes", JSON.stringify(participantes));

carregarParticipantes();

}

carregarParticipantes();