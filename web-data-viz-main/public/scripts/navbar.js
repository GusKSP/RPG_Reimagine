if (sessionStorage.SUPER_USER == 1) {
    navbar.innerHTML = `
        <li>
            <a href="../dashboard_rpgreimagine/dashboard.html">Ir para a Dash</a>
        </li>
        <li>
            <a href="../login_after/ver_mundos.html">Ver Mundos</a>
        </li>
        <li>
            <a href="../login_after/ver_personagens.html">Ver Personagens</a>
        </li>
        <li>
            <a href="../login_after/ver_campanhas.html">Ver Campanhas</a>
        </li>
        <li>
            <a href="../login_after/ver_perfil.html">Ver Perfil</a>
        </li>`
}
else {
    navbar.innerHTML = `
        <li>
            <a href="../login_after/ver_mundos.html">Ver Mundos</a>
        </li>
        <li>
            <a href="../login_after/ver_personagens.html">Ver Personagens</a>
        </li>
        <li>
            <a href="../login_after/ver_campanhas.html">Ver Campanhas</a>
        </li>
        <li>
            <a href="../login_after/ver_perfil.html">Ver Perfil</a>
        </li>`
}