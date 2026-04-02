using Microsoft.AspNetCore.Mvc;
using TechEventAPI.Models;

namespace TechEventAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CertificadosController : ControllerBase
    {
        // Esta lista estática finge que é um banco de dados (não apaga entre as chamadas)
        private static List<Participante> _participantes = new List<Participante>();

        [HttpPost("gerar")]
        public IActionResult Gerar([FromBody] Participante participante)
        {
            if (participante == null) return BadRequest();
            
            // ADICIONA NA LISTA: Agora o dado está "salvo" na memória do servidor
            _participantes.Add(participante);

            return Ok(new { mensagem = "Inscrição salva com sucesso!", nome = participante.Nome });
        }

        // ROTA: Para a página de Participantes e Certificados lerem os dados
        [HttpGet("Listar")]
        public IActionResult Listar()
        {
            return Ok(_participantes);
        }
    }
}