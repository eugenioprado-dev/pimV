// ===== MÁSCARA EM TEMPO REAL: CPF =====
const cpfInput = document.getElementById("cpf");
if (cpfInput) {
    cpfInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        }
        e.target.value = value;
    });
}

// MÁSCARA EM TEMPO REAL: TELEFONE (BLOQUEIA STRINGS)
const telInput = document.getElementById("telefone");
if (telInput) {
    telInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, ""); // Remove letras e símbolos
        
        // Aplica a máscara (00) 00000-0000 dinamicamente
        if (value.length > 0) {
            value = "(" + value;
        }
        if (value.length > 3) {
            value = value.slice(0, 3) + ") " + value.slice(3);
        }
        if (value.length > 10) {
            // Formato para celular (9 dígitos)
            value = value.slice(0, 10) + "-" + value.slice(10, 15);
        }
        e.target.value = value;
    });
}

// FUNÇÕES AUXILIARES 
function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
}

function mostrarMensagem(texto, cor = "red") {
    const box = document.getElementById("mensagemBox");
    const msg = document.getElementById("mensagem");
    if (msg && box) {
        msg.textContent = texto;
        msg.style.color = cor;
        box.style.display = "block";
        box.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== VERIFICAÇÃO DE DUPLICIDADE LOCAL =====
async function verificarCpfDuplicadoLocal(cpfInteresse) {
    try {
        const resposta = await fetch('/api/certificados/listar');
        if (resposta.ok) {
            const participantes = await resposta.json();
            return participantes.some(p => {
                const cpfLista = (p.cpf || p.CPF || "").toString().replace(/\D/g, "");
                return cpfLista === cpfInteresse;
            });
        }
    } catch (e) {
        console.error("Erro ao validar duplicidade local:", e);
    }
    return false;
}

// ===== FUNÇÃO PRINCIPAL DE ENVIO REFINADA =====
async function enviarInscricao() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const cpfRaw = document.getElementById('cpf').value;
    const telRaw = document.getElementById('telefone').value;

    const cpfNumeros = cpfRaw.replace(/\D/g, "");
    const telNumeros = telRaw.replace(/\D/g, "");

    // 1. Validações de Formato
    if (nome.length < 3) return mostrarMensagem("Nome muito curto.");
    if (!validarEmail(email)) return mostrarMensagem("E-mail inválido.");
    if (!validarCPF(cpfNumeros)) return mostrarMensagem("CPF inválido.");
    if (telNumeros.length < 10) return mostrarMensagem("Telefone inválido (insira DDD + número).");

    // 2. Validação de Duplicidade (Cliente)
    const jaExiste = await verificarCpfDuplicadoLocal(cpfNumeros);
    if (jaExiste) {
        return mostrarMensagem("Atenção: Este CPF já consta na lista de inscritos.");
    }

    // 3. Montagem do Objeto (ajuste as propriedades de acordo com seu Model C#)
    const dadosParticipante = { 
        Nome: nome, 
        CPF: cpfNumeros, 
        Email: email, 
        Telefone: telNumeros 
    };

    try {
        const resposta = await fetch('/api/certificados/gerar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosParticipante)
        });

        if (resposta.ok) {
            mostrarMensagem("Inscrição confirmada com sucesso!", "green");
            setTimeout(() => window.location.href = "participante.html", 2000);
        } else if (resposta.status === 409) {
            mostrarMensagem("Erro: Este CPF já foi utilizado por outro usuário.");
        } else {
            const erroTexto = await resposta.text();
            mostrarMensagem("Servidor diz: " + (erroTexto || "Erro desconhecido"));
        }
    } catch (erro) {
        mostrarMensagem("Erro de conexão. O servidor está offline?");
    }
}