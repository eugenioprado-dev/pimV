# Build (Compilação)
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copia o arquivo de projeto e restaura as dependências
COPY ["TechEventAPI.csproj", "./"]
RUN dotnet restore "TechEventAPI.csproj"

# Copia todo o conteúdo da pasta TechEventAPI e compila
COPY . .
RUN dotnet publish "TechEventAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime (Execução)
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

# Copia os arquivos compilados do estágio de build
COPY --from=build /app/publish .

# O Railway injeta a porta automaticamente, e o Program.cs já lê a variável PORT
# Garantimos que o ASP.NET ouça em todas as interfaces
ENV ASPNETCORE_URLS=http://+:5000

ENTRYPOINT ["dotnet", "TechEventAPI.dll"]