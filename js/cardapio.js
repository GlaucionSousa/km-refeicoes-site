document.addEventListener('DOMContentLoaded', () => {
    const openMenuBtn = document.getElementById('openMenuBtn');
    const modal = document.getElementById('cardapioModal');
    const closeBtn = modal.querySelector('.modal-close-btn');
    const cardapioList = document.getElementById('cardapioList');

    // Função para buscar e exibir o cardápio
    const loadCardapio = async () => {
        try {
            const response = await fetch('data/cardapio.json');
            const data = await response.json();
            
            cardapioList.innerHTML = ''; // Limpa a lista antes de preencher

            if (data.itens && data.itens.length > 0) {
                const menuList = document.createElement('div');
                menuList.classList.add('menu-list');

                data.itens.forEach(item => {
                    const menuItem = document.createElement('div');
                    menuItem.classList.add('menu-item');
                    menuItem.innerHTML = `<strong>${item.nome}</strong><span>${item.preco}</span>`;
                    menuList.appendChild(menuItem);
                });
                cardapioList.appendChild(menuList);
            } else {
                cardapioList.innerHTML = '<p class="modal-info">O cardápio de hoje ainda não foi publicado. Volte em breve!</p>';
            }
        } catch (error) {
            console.error('Erro ao carregar o cardápio:', error);
            cardapioList.innerHTML = '<p class="modal-info">Não foi possível carregar o cardápio no momento. Por favor, tente novamente mais tarde.</p>';
        }
    };

    // Abre o modal
    openMenuBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        loadCardapio();
    });

    // Fecha o modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});