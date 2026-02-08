(function ($) {
  "use strict";

  /**
   * INYECCIÓN DEL HTML EN TIEMPO DE EJECUCIÓN
   * Esta función crea el DOM del buscador y lo inserta antes del menú.
   */
  function injectSearchMarkup() {
    const TREE_NAV_ID = "t_TreeNav";
    const SEARCH_INPUT_ID = "staticMenuSearch";

    // 1. Verificamos si el árbol de navegación existe en la página
    const $treeNav = $("#" + TREE_NAV_ID);
    if (!$treeNav.length) return false;

    // 2. Evitamos duplicados: si ya existe el buscador, no hacemos nada
    if ($("#" + SEARCH_INPUT_ID).length > 0) return true;

    // 3. Definimos el HTML (exactamente el que tenías en la plantilla)
    const searchHTML = `
      <div class="menu-search-container">
        <span class="fa fa-search search-icon"></span>
        <input type="text" id="${SEARCH_INPUT_ID}" placeholder="Buscar..." autocomplete="off">
      </div>
    `;

    // 4. Inyectamos el HTML justo ANTES del contenedor del árbol (t_TreeNav)
    // Esto replica la ubicación visual que tenías en la plantilla.
    $treeNav.before(searchHTML);
    
    return true;
  }

  /**
   * LÓGICA DEL BUSCADOR
   * (Tu código original encapsulado para ejecutarse tras la inyección)
   */
  function initSearchLogic() {
    const search$ = $("#staticMenuSearch");
    const tree$ = $("#t_TreeNav");
    let treeView = null;

    // Si por alguna razón no se inyectó o no se encontró el input, salimos.
    if (!search$.length || !tree$.length) return;

    function getTreeView() {
      if (!treeView) {
        // Aseguramos que el widget treeView esté inicializado
        try {
            treeView = tree$.treeView("instance");
        } catch(e) {
            console.warn("El widget treeView aún no está listo.", e);
        }
      }
      return treeView;
    }

    function expandNode($li) {
      const $toggle = $li
        .children(".a-TreeView-content")
        .children(".a-TreeView-toggle");

      if ($toggle.length && $toggle.hasClass("is-collapsed")) {
        $toggle.trigger("click");
      }

      $li.addClass("is-expanded");
      $li.children("ul").show();
    }

    function expandParents($li) {
      $li.parents("li").each(function () {
        expandNode($(this));
        $(this).show();
      });
    }

    function expandAll(callback) {
      const tv = getTreeView();
      if (tv) {
        tv.expandAll();
      }
      setTimeout(callback, 300);
    }

    function resetMenu() {
      const tv = getTreeView();

      if (tv) {
        tv.collapseAll();
      }

      // Reset DOM completo
      const $lis = tree$.find("li");

      $lis.each(function () {
        const $li = $(this);
        $li.removeClass("is-expanded");
        $li.children("ul").hide();
        $li.show();
      });

      // Dejar visible solo el primer nivel
      tree$.children("ul").children("li").show();

      tree$.find(".menu-highlight").removeClass("menu-highlight");
      hideNoResults();
    }

    function performSearch(term) {
  term = term.toLowerCase().trim();

  if (!term) {
    resetMenu();
    return;
  }

  expandAll(() => {
    let found = 0;

    const $allLis = tree$.find("li");
    $allLis.hide();
    tree$.find(".menu-highlight").removeClass("menu-highlight");

    tree$.find(".a-TreeView-label").each(function () {
      const $label = $(this);
      const text = $label.text().toLowerCase();

      if (!text.includes(term)) return;

      found++;

      const $li = $label.closest("li");
      const $childrenUl = $li.children("ul");

      // Highlight
      $label.addClass("menu-highlight");

      // Mostrar nodo encontrado
      $li.show();

      // 👉 Si es padre, mostrar todo su subárbol
      if ($childrenUl.length) {
        $childrenUl.show();
        $childrenUl.find("li").show();
      }

      // Mostrar padres
      expandParents($li);
    });

    found === 0 ? showNoResults(term) : hideNoResults();
  });
}

    function showNoResults(term) {
      let msg = $(".no-results-message");

      if (!msg.length) {
        // Nota: Insertamos el mensaje después del contenedor del buscador
        msg = $(`
          <div class="no-results-message">
            <div class="no-results-icon">🔍</div>
            <p>No se encontraron resultados para</p>
            <p class="search-term">"${term}"</p>
          </div>
        `);
        $(".menu-search-container").after(msg);
      } else {
        msg.find(".search-term").text(`"${term}"`);
      }
      msg.fadeIn(200);
    }

    function hideNoResults() {
      $(".no-results-message").fadeOut(150);
    }

    // EVENTOS
    let timer;
    
    // Desvinculamos primero para evitar duplicidad de eventos si el plugin se reinicia
    search$.off("input keydown");

    search$.on("input", function () {
      clearTimeout(timer);
      timer = setTimeout(() => performSearch(this.value), 250);
    });

    search$.on("keydown", function (e) {
      if (e.key === "Escape") {
        this.value = "";
        resetMenu();
        this.blur();
      }
      if (e.key === "Enter") e.preventDefault();
    });

  }

  // ==========================================
  // INICIALIZACIÓN PRINCIPAL
  // ==========================================
  $(function () {
    // 1. Inyectar HTML
    const injectionSuccess = injectSearchMarkup();
    
    // 2. Si la inyección fue exitosa (o ya existía), inicializar lógica
    if (injectionSuccess) {
        initSearchLogic();
    }
  });

})(apex.jQuery);
