# Estágio de Build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copia tudo da pasta atual (TechEventAPI) para dentro do container
COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out

# Estágio de Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/out .

# Variável para o ASP.NET usar a porta correta
ENV ASPNETCORE_URLS=http://+:5000

ENTRYPOINT ["dotnet", "TechEventAPI.dll"]