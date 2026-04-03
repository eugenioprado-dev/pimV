
document.addEventListener('DOMContentLoaded', async () => {
    // AJUSTE: Usando o ID 
    const corpoTabela = document.getElementById('listaParticipantes');
    
    if (!corpoTabela) {
        console.error("Erro: O ID 'listaParticipantes' não foi encontrado no seu HTML!");
        return;
    }

    try {
        const resposta = await fetch('/api/certificados/listar');
        
        if (resposta.ok) {
            const participantes = await resposta.json();
            
            // Limpa o conteúdo atual
            corpoTabela.innerHTML = "";

            if (participantes.length === 0) {
                corpoTabela.innerHTML = "<tr><td colspan='4' style='text-align:center'>Nenhum inscrito até o momento.</td></tr>";
                return;
            }

            participantes.forEach(p => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${p.nome}</td>
                    <td>${p.email}</td>
                    <td>${p.cpf}</td>
                    <td>
                        <button class="btn-acao" onclick="gerarCertificado('${p.nome}')">
                            Gerar
                        </button>
                    </td>
                `;
                corpoTabela.appendChild(linha);
            });
        }
    } catch (erro) {
        console.error("Erro ao conectar com a API:", erro);
    }
});

function gerarCertificado(nome) {
    localStorage.setItem('nomeCertificado', nome);
    window.location.href = "certificados.html";
}