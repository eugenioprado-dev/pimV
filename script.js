function openTab(evt, tabName) {
    // 1. Esconde todos os conteúdos
    const contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) {
        contents[i].classList.remove("active");
    }

    // 2. Remove o destaque de todos os botões
    const buttons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }

    // 3. Mostra a aba clicada e destaca o botão
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.classList.add("active");
        evt.currentTarget.classList.add("active");
    } else {
        console.error("Erro: Não encontrei o ID:", tabName);
    }
}