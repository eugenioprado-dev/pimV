async function enviarInscricao() {
    console.log("Iniciando processo de envio...");

    // 1. Captura dos elementos do DOM
    const campoNome = document.getElementById('nome');
    const campoCpf = document.getElementById('cpf');
    const campoEmail = document.getElementById('email');

    // Validação básica
    if (!campoNome.value || !campoCpf.value) {
        alert("Por favor, preencha os campos obrigatórios (Nome e CPF).");
        return;
    }

    // 2. Montagem do objeto 
    const dadosParticipante = {
        Nome: campoNome.value.trim(),
        CPF: campoCpf.value.trim(),
        Email: campoEmail.value.trim()
    };

    try {
        // 3. Chamada para a API
        const resposta = await fetch('/api/certificados/gerar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosParticipante)
        });

        // 4. Tratamento da resposta
        if (resposta.ok) {
            const resultado = await resposta.json();
            alert("Sucesso! Inscrição confirmada para: " + resultado.nome);

            // Feedback Visual/Libras
            if (window.VLibras) {
                console.log("Acionando VLibras para o feedback de sucesso.");
            }

            // Redireciona para a lista
            window.location.href = "participante.html";
        } else {
            const erroTexto = await resposta.text();
            console.error("Erro no servidor:", erroTexto);
            alert("O servidor recusou os dados.");
        }

    } catch (erro) {
        console.error("Falha na requisição:", erro);
        alert("Erro de conexão: O servidor C# está rodando?");
    }
}