/**
 * 1. FUNÇÃO DE MÁSCARA COM PRIVACIDADE
 * Transforma "12345678901" em "123.***.***-01"
 */
function aplicarMascaraProtegida(cpf) {
    if (cpf === null || cpf === undefined) return "";
    
    // Converte para string e remove qualquer caractere que não seja número
    let valor = String(cpf).replace(/\D/g, ""); 
    
    // Se tiver os 11 dígitos, aplica a máscara ocultando o meio
    if (valor.length === 11) {
        // $1: primeiros 3 dígitos | $4: últimos 2 dígitos
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.***.***-$4");
    }
    
    return valor; 
}

/**
 * 2. CARREGAMENTO DINÂMICO DA TABELA
 */
document.addEventListener('DOMContentLoaded', async () => {
    const tabela = document.getElementById('listaParticipantes');
    if (!tabela) {
        console.error("Elemento 'listaParticipantes' não encontrado no HTML.");
        return;
    }

    try {
        const resposta = await fetch('/api/certificados/listar');
        
        if (resposta.ok) {
            const participantes = await resposta.json();
            
            // Limpa o conteúdo atual da tabela
            tabela.innerHTML = ""; 

            participantes.forEach(p => {
                const tr = document.createElement('tr');

                // Mapeamento baseado nos campos minúsculos confirmados no console
                const nome = p.nome || "---";
                const email = p.email || "---";
                const cpfBruto = p.cpf || "";

                // APLICAÇÃO DA MÁSCARA PROTEGIDA
                const cpfExibicao = aplicarMascaraProtegida(cpfBruto);

                tr.innerHTML = `
                    <td>${nome}</td>
                    <td>${email}</td>
                    <td style="font-family: monospace;">${cpfExibicao}</td>
                    <td>
                        <button class="btn-acao" onclick="gerarCertificado('${nome}')">
                            Gerar
                        </button>
                    </td>
                `;
                tabela.appendChild(tr);
            });
        }
    } catch (erro) {
        console.error("Erro ao carregar participantes:", erro);
    }
});

/**
 * 3. GERENCIAMENTO DO CERTIFICADO
 */
function gerarCertificado(nome) {
    // Armazena o nome para uso na página de geração do documento
    localStorage.setItem('nomeCertificado', nome);
    window.location.href = "certificados.html";
}