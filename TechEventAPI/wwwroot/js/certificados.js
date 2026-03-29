document.addEventListener('DOMContentLoaded', () => {
    const btnBuscar = document.getElementById('btnBuscarCertificado');
    const resultadoArea = document.getElementById('resultado'); // ID exato do seu HTML
    const campoCpf = document.getElementById('cpf');

    async function buscarCertificado() {
        // 1. Limpeza e validação do CPF
        const cpfLimpo = campoCpf.value.replace(/\D/g, "");

        if (cpfLimpo.length !== 11) {
            alert("Por favor, digite um CPF válido com 11 dígitos.");
            return;
        }

        resultadoArea.innerHTML = "<p>Buscando no servidor...</p>";

        try {
            // 2. Chamada para a API (Porta 5277 do dotnet run)
            const resposta = await fetch('http://localhost:5277/api/certificados/listar');
            
            if (!resposta.ok) throw new Error("Servidor fora do ar");

            const participantes = await resposta.json();
            
            // 3. Procura o participante
            const usuario = participantes.find(p => p.cpf.replace(/\D/g, "") === cpfLimpo);

            if (usuario) {
                // Sucesso: Renderiza o card do certificado
                resultadoArea.innerHTML = `
                    <div style="background: white; padding: 30px; border-radius: 12px; border-left: 10px solid #2563eb; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-top: 20px; text-align: left;">
                        <h2 style="color: #1e40af; margin-bottom: 10px;">🏆 Certificado Disponível</h2>
                        <p style="font-size: 1.1rem; color: #374151;">Certificamos que <strong>${usuario.nome}</strong> participou com êxito do <strong>TechEvent 2026</strong>.</p>
                        <p style="color: #6b7280; margin-top: 10px;">Carga Horária: 40 Horas</p>
                        <button onclick="window.print()" style="margin-top: 20px; padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
                            📥 Baixar Certificado (PDF)
                        </button>
                    </div>
                `;
            } else {
                resultadoArea.innerHTML = `
                    <div style="padding: 20px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; color: #dc2626; margin-top: 20px;">
                        ❌ CPF não encontrado. Verifique se você realizou a inscrição corretamente.
                    </div>
                `;
            }

        } catch (erro) {
            console.error("Erro detalhado:", erro);
            alert("Erro ao conectar com o servidor C#. Verifique se o terminal está com o 'dotnet run' ativo.");
            resultadoArea.innerHTML = "";
        }
    }

    // Adiciona o evento de clique
    if (btnBuscar) {
        btnBuscar.addEventListener('click', buscarCertificado);
    }
});