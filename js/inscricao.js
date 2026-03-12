const form = document.getElementById("formInscricao");
const mensagem = document.getElementById("mensagem");
const mensagemBox = document.getElementById("mensagemBox");

let participantes = JSON.parse(localStorage.getItem("participantes")) || [];

form.addEventListener("submit", function(e){

e.preventDefault();

let nome = document.getElementById("nome").value;
let email = document.getElementById("email").value;
let cpf = document.getElementById("cpf").value;

let jaExiste = participantes.some(p => p.cpf === cpf);

if(jaExiste){

mensagem.innerText = "Você já está inscrito no evento!";
mensagemBox.style.display = "block";

return;

}

let participante = {
nome: nome,
email: email,
cpf: cpf
};

participantes.push(participante);

localStorage.setItem("participantes", JSON.stringify(participantes));

mensagem.innerText = "Inscrição realizada com sucesso!";
mensagemBox.style.display = "block";

form.reset();

setTimeout(function(){
mensagemBox.style.display = "none";
},3000);

});