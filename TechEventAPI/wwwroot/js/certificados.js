document.addEventListener('DOMContentLoaded', () => {
    const btnBuscar = document.getElementById('btnBuscarCertificado');
    const resultadoArea = document.getElementById('resultado'); // ID 
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
                // SUCESSO: Renderiza o card do certificado preparado para impressão
                resultadoArea.innerHTML = `
                    <div id="area-print" class="certificado-premium" style="background: white; padding: 40px; border-radius: 12px; border-left: 12px solid #1d4ed8; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-top: 20px; text-align: left; position: relative;">
            
                        <div class="certificado-header" style="margin-bottom: 30px; display: flex; align-items: center; justify-content: space-between;">
                            <div>
                                <h2 style="color: #1e40af; margin-bottom: 5px; font-weight: 800;">🏆 Certificado de Participação</h2><br><br>
                                <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #eff6ff; padding-bottom: 20px;">
                                <h1 style="font-size: 2rem; color: #1e40af; margin: 0; letter-spacing: 5px; font-weight: 900; text-transform: uppercase; line-height: 1;">TechEvent</h1>

                                <h2 style="font-size: 2.2rem; color: #3b82f6; margin: 5px 0 0 0; font-weight: 300; letter-spacing: 15px; text-indent: 15px;">2026</h2>
                                </div>
                            </div>
                            <div class="certificado-selo" style="font-size: 2.5rem; color: #eab308;">🏅</div>
                        </div>

                        <div class="certificado-body" style="margin-bottom: 40px;">
                            <p style="font-size: 1.1rem; color: #374151; line-height: 1.6; ">Certificamos que <strong>${usuario.nome}</strong> participou com êxito do <strong>TechEvent 2026</strong>, o maior evento de tecnologia e inovação, com carga horária total de <span class="carga-horaria" style="font-weight: 700; color: #1e40af; background: #eff6ff; padding: 2px 6px; border-radius: 4px;">40 Horas</span>.</p>
                        </div>

                        <div class="certificado-conteudo" style="margin-bottom: 50px;">
                            <p><strong>Conteúdo Programático:</strong></p><br>
                            <ul style="color: #6b7280; margin-left: 20px; font-size: 0.9rem; column-count: 2; column-gap: 20px; page-break-inside: avoid;">
                                <li>Blockchain e Web3</li>
                                <li>Desenvolvimento Web e React Avançado</li>
                                <li>Software Moderno, UX/UI e Acessibilidade</li>
                                <li>Cloud Computing, DevOps e IA</li>
                                <li>Segurança da Informação e Cibernética</li>
                            </ul>
                        </div>

                        <div class="certificado-assinaturas" style="display: flex; justify-content: space-around; align-items: flex-end; margin-top: 50px; border-top: 1px solid #e5e7eb; padding-top: 40px;">
                            <div class="assinatura-item" style="text-align: center; width: 250px;">
                                <p class="assinatura-manuscrita" style="font-family: 'Dancing Script', cursive; font-size: 1.8rem; color: #4b5563; margin-bottom: -5px;">Eugênio Prado</p>
                                <div style="height: 1px; background-color: #d1d5db; margin-bottom: 8px;"></div>
                                <p style="font-size: 0.9rem; color: #111827; font-weight: 600;">Eugênio Prado</p>
                                <p style="font-size: 0.8rem; color: #6b7280;">Coordenador Geral - TechEvent 2026</p>
                            </div>
                        <div class="assinatura-item" style="text-align: center; width: 250px;">
                            <p class="assinatura-manuscrita" style="font-family: 'Dancing Script', cursive; font-size: 1.8rem; color: #4b5563; margin-bottom: -5px;">Leonardo Aires</p>
                            <div style="height: 1px; background-color: #d1d5db; margin-bottom: 8px;"></div>
                            <p style="font-size: 0.9rem; color: #111827; font-weight: 600;">Leonardo Aires</p>
                            <p style="font-size: 0.8rem; color: #6b7280;">Coordenador Acadêmica</p>
                        </div>
                    </div>

            <button class="btn-print-action" onclick="window.print()" style="margin-top: 40px; width: 100%; padding: 14px; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 1rem;">
                📥 Baixar Certificado (PDF)
            </button>
        </div>
    `;
            }
    else {
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