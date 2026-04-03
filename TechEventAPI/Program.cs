var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// LIBERAÇÃO DE ACESSO (CORS)
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => {
        policy.AllowAnyOrigin() // Permite qualquer origem (inclusive sua porta 5500)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors(); // ATIVA O CORS AQUI

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();

// Obtém a porta da variável de ambiente do Render, ou usa 5000 como fallback local
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";

// Configura a API para ouvir em todas as interfaces de rede (0.0.0.0) na porta correta
app.Run($"http://0.0.0.0:{port}");