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

app.Run();