document.addEventListener('DOMContentLoaded', () => {
    // Ano no rodapé
    document.getElementById('year').textContent = new Date().getFullYear();

    // Menu móvel
    const menuBtn = document.getElementById('menuBtn');
    const menuMobile = document.getElementById('menuMobile');
    const navLinks = menuMobile.querySelectorAll('a');

    // Função para fechar o menu
    const closeMenu = () => {
        menuMobile.style.display = 'none';
        menuBtn.setAttribute('aria-expanded', 'false');
        menuMobile.setAttribute('aria-hidden', 'true');
    };

    // Função para abrir o menu
    const openMenu = () => {
        menuMobile.style.display = 'block';
        menuBtn.setAttribute('aria-expanded', 'true');
        menuMobile.setAttribute('aria-hidden', 'false');
    };

    // Oculta o menu ao carregar a página para evitar que ele apareça em telas maiores.
    closeMenu();

    // Alterna a visibilidade do menu ao clicar no botão de menu.
    menuBtn.addEventListener('click', () => {
        const isOpen = menuMobile.style.display === 'block';
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Fecha o menu ao clicar em um link de navegação dentro dele.
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fecha o menu ao clicar fora dele.
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = menuMobile.contains(event.target);
        const isClickOnMenuButton = menuBtn.contains(event.target);

        if (!isClickInsideMenu && !isClickOnMenuButton) {
            closeMenu();
        }
    });

    // Form: validação básica + abrir e-mail
    const form = document.getElementById('formOrcamento');
    function showErr(id, show) {
        const el = document.getElementById(id);
        if (el) el.style.display = show ? 'block' : 'none';
    }
    function isPhone(v) {
        return /\d{8,}/.test(v.replace(/\D/g, ''));
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = form.nome.value.trim();
        const emp = form.empresa.value.trim();
        const tel = form.telefone.value.trim();
        const qtd = form.quantidade.value.trim();

        let ok = true;
        if (!nome) { showErr('err-nome', true); ok = false; } else showErr('err-nome', false);
        if (!emp) { showErr('err-empresa', true); ok = false; } else showErr('err-empresa', false);
        if (!isPhone(tel)) { showErr('err-telefone', true); ok = false; } else showErr('err-telefone', false);
        if (!qtd) { showErr('err-quantidade', true); ok = false; } else showErr('err-quantidade', false);

        if (!ok) return;

        const assunto = encodeURIComponent('Orçamento — KM Refeições');
        const corpo = encodeURIComponent(`Nome: ${nome}\nEmpresa/Obra: ${emp}\nTelefone: ${tel}\nQtd. refeições/dia: ${qtd}\nMensagem: ${form.mensagem.value.trim()}`);
        window.location.href = `mailto:contato@seudominio.com?subject=${assunto}&body=${corpo}`;
    });
});