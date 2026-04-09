using Microsoft.AspNetCore.Mvc;
using TechEventAPI.Models;
using System.Collections.Generic;
using System.Linq; // Necessário para usar o .Any()

namespace TechEventAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CertificadosController : ControllerBase
    {
        // Esta lista estática simula o banco de dados em memória
        private static List<Participante> _participantes = new List<Participante>();

        [HttpPost("gerar")]
        public IActionResult Gerar([FromBody] Participante participante)
        {
            if (participante == null) 
                return BadRequest("Dados inválidos.");

            // 1. LIMPEZA: Garante que o CPF não tenha pontos ou traços (caso venha do frontend)
            // Isso evita que "123.456" seja considerado diferente de "123456"
            if (!string.IsNullOrEmpty(participante.CPF))
            {
                participante.CPF = new string(participante.CPF.Where(char.IsDigit).ToArray());
            }

            // 2. VALIDAÇÃO DE DUPLICIDADE:
            // Verifica se já existe algum participante com o mesmo CPF na lista
            bool cpfJaCadastrado = _participantes.Any(p => p.CPF == participante.CPF);

            if (cpfJaCadastrado)
            {
                // Retorna 409 Conflict: O JavaScript vai cair no bloco "else if (resposta.status === 409)"
                return Conflict("Atenção: Este CPF já está cadastrado no evento.");
            }

            // 3. SALVAMENTO: Agora que sabemos que é único, adicionamos à lista
            _participantes.Add(participante);

            return Ok(new { 
                mensagem = "Inscrição salva com sucesso!", 
                nome = participante.Nome 
            });
        }

        // ROTA: Para a página de Participantes e Certificados lerem os dados
        [HttpGet("listar")]
        public IActionResult Listar()
        {
            // Retorna a lista atualizada para o JavaScript montar a tabela
            return Ok(_participantes);
        }
    }
}