📚 Sistema de Gestão de Eventos Acadêmicos em TI

Sistema web desenvolvido como parte do Projeto Integrado Multidisciplinar (PIM V) 
com o objetivo de gerenciar eventos acadêmicos da área de Tecnologia da Informação, 
permitindo a divulgação, inscrição de participantes e organização de atividades.


#TechEvent 2026 - PIM V (Sistema de Gestão de Eventos)

Este repositório contém o projeto de conclusão do PIM V (Projeto Integrado Multidisciplinar). A aplicação é uma solução Full-Stack para gerenciamento de inscrições e emissão de certificados, integrando uma Web API robusta com um Front-end moderno e acessível.

🛠️ Tecnologias e Versões

-Back-end:** ASP.NET Core Web API (C#)
-SDK do Projeto:** .NET 10.0.103
-Front-end:** HTML5, CSS3 (Flexbox) e JavaScript 
-Acessibilidade: Integração nativa com o componente *VLibras*.
-Persistência de Dados: Armazenamento em memória (In-Memory Runtime).

#Pré-requisitos

Para executar este projeto localmente, você precisará de:
1.  SDK do .NET 10.0 ou superior instalado.
2.  Um navegador atualizado (Chrome, Edge ou Firefox).
3.  Git (para clonar o repositório).

#Como Executar o Projeto

Siga os passos abaixo para garantir que a comunicação entre o site e a API funcione corretamente:

1.  Clonar o Repositório:
    bash
    git clone [https://github.com/eugenioprado-dev/pimV.git](https://github.com/eugenioprado-dev/pimV.git)
    

2.  Acessar a pasta da API:
    Abra o terminal na raiz do projeto e entre na pasta do servidor:
    bash
    cd TechEventAPI
    

3.  Rodar a Aplicação:
    Inicie o servidor com o comando:
    bash
    dotnet run
    
    Certifique-se de que a mensagem `Now listening on: http://0.0.0.0:5000` apareça no terminal.

4.  Acessar via Navegador:
    Com o servidor ativo, abra o link abaixo:
    👉 [http://localhost:5000/pages/home.html](http://localhost:5000/pages/home.html)

 Acessibilidade e Inclusão

O projeto foi desenvolvido contendo acessibilidade digital. O ícone do *VLibras* está presente em todas as interfaces, permitindo a tradução de textos e interações para a Língua Brasileira de Sinais, garantindo que usuários surdos possam navegar e se inscrever no evento sem barreiras.

#Estrutura do Repositório

* `/TechEventAPI`: Código-fonte do servidor C#.
* `/TechEventAPI/Controllers`: Endpoints da API (`/api/certificados`).
* `/TechEventAPI/wwwroot`: Raiz do Front-end (CSS, JS, Imagens).
* `/TechEventAPI/wwwroot/pages`: Páginas HTML do sistema.


*Desenvolvido por:* [Eugênio Prado](https://github.com/eugenioprado-dev)
                    [Leonardo Aires](https://github.com/leonardosouzaaires4-crypto)
                    [Victor Moura](https://github.com/Vict7rz)

*Curso: Tecnologia em Análise e Desenvolvimento de Sistemas (2026)