async function buscarCertificados() {
  const cpf = document.getElementById("cpf").value.trim();
  const resultado = document.getElementById("resultado");

  if (!cpf) {
    resultado.innerHTML = "<p>Digite um CPF.</p>";
    return;
  }

  resultado.innerHTML = "<p>Buscando certificados...</p>";

  try {
    const resposta = await fetch("http://localhost:3000/certificados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cpf })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      resultado.innerHTML = `<p>${dados.mensagem}</p>`;
      return;
    }

    if (dados.certificados.length === 0) {
      resultado.innerHTML = "<p>Nenhum certificado encontrado.</p>";
      return;
    }

    resultado.innerHTML = `
      <h3>Certificados encontrados:</h3>
      ${dados.certificados.map(cert => `
        <div class="card-certificado">
          <h4>${cert.nome}</h4>
          <p><strong>Instituição:</strong> ${cert.instituicao}</p>
          <p><strong>Data:</strong> ${cert.data}</p>
          <a href="${cert.link}" target="_blank">Ver certificado</a>
        </div>
      `).join("")}
    `;

  } catch (erro) {
    resultado.innerHTML = "<p>Erro ao buscar certificados.</p>";
    console.error(erro);
  }
}

/* Máscara de CPF */
const inputCpf = document.getElementById("cpf");

inputCpf.addEventListener("input", () => {
  let valor = inputCpf.value.replace(/\D/g, "");

  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  inputCpf.value = valor;
});