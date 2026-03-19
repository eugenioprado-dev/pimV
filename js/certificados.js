const inputCpf = document.getElementById("cpf");
const resultado = document.getElementById("resultado");
const btnBuscar = document.getElementById("btnBuscarCertificado");

function mostrarMensagem(tipo, mensagem) {
  resultado.innerHTML = `
    <div class="resultado-alerta ${tipo}">
      <p>${mensagem}</p>
    </div>
  `;
}

function formatarData(data) {
  if (!data) return "Não informada";

  const dataObj = new Date(data);

  if (isNaN(dataObj.getTime())) {
    return data;
  }

  return dataObj.toLocaleDateString("pt-BR");
}

function aplicarMascaraCPF(valor) {
  valor = valor.replace(/\D/g, "");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return valor;
}

function cpfValido(cpf) {
  const numeros = cpf.replace(/\D/g, "");
  return numeros.length === 11;
}

async function buscarCertificados() {
  const cpfDigitado = inputCpf.value.trim();
  const cpfLimpo = cpfDigitado.replace(/\D/g, "");

  if (!cpfDigitado) {
    mostrarMensagem("erro", "Digite um CPF para continuar.");
    return;
  }

  if (!cpfValido(cpfDigitado)) {
    mostrarMensagem("erro", "Digite um CPF válido com 11 números.");
    return;
  }

  resultado.innerHTML = `
    <div class="resultado-alerta carregando">
      <p>Buscando certificados...</p>
    </div>
  `;

  try {
    const resposta = await fetch("http://localhost:3000/certificados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cpf: cpfLimpo })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      mostrarMensagem("erro", dados.mensagem || "Não foi possível buscar os certificados.");
      return;
    }

    if (!dados.certificados || dados.certificados.length === 0) {
      mostrarMensagem("vazio", "Nenhum certificado encontrado para este CPF.");
      return;
    }

    resultado.innerHTML = `
      <div class="resultado-lista">
        <div class="resultado-topo">
          <h3>Certificados encontrados</h3>
          <p>Foram encontrados ${dados.certificados.length} certificado(s).</p>
        </div>

        <div class="certificados-grid">
          ${dados.certificados.map(cert => `
            <div class="card-certificado">
              <div class="card-certificado-topo">
                <span class="badge-certificado">Disponível</span>
              </div>

              <h4>${cert.nome || "Certificado"}</h4>
              <p><strong>Instituição:</strong> ${cert.instituicao || "Não informada"}</p>
              <p><strong>Data:</strong> ${formatarData(cert.data)}</p>

              <a
                href="${cert.link}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-download"
              >
                Ver certificado
              </a>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  } catch (erro) {
    console.error(erro);
    mostrarMensagem("erro", "Erro ao buscar certificados. Verifique se o servidor está rodando.");
  }
}

if (inputCpf) {
  inputCpf.addEventListener("input", (e) => {
    e.target.value = aplicarMascaraCPF(e.target.value);
  });

  inputCpf.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      buscarCertificados();
    }
  });
}

if (btnBuscar) {
  btnBuscar.addEventListener("click", buscarCertificados);
}