class MenuComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
          <style>
            @media (min-width: 768px) {
              #menu {
                position: sticky;
                top: 2rem;
                align-self: start;
                grid-column: 1 / 2;
              }
              .menu-button {
                display: none !important;
              }
              nav {
                display: block !important;
              }
            }

            .menu-button {
              padding: 10px;
              text-transform: uppercase;
              color: #212529;
              border: 1px solid #f2e7ff;
              cursor: pointer;
              background: transparent;
            }
            nav {
              display: none;
              border: 1px solid #212529;
            }
            ul {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            li {
              padding: 0.6rem;
            }
            @media (prefers-color-scheme: dark) {
              nav {
                border: 1px solid #5e5e5e;
              }
              a {
                color: #5a96f6;

                &:visited {
                  color: #ab7aff;
                }
              }
              .menu-button {
                color: #f2e7ff;
                border: 1px solid #f2e7ff;
              }
              a:visited {
                color: #ab7aff;
              }
            }
          </style>
          <section id="menu">
            <button class="menu-button" aria-haspopup="menu" aria-expanded="false">Menu</button>
            <nav>
              <ul id="menu-list"></ul>
            </nav>
          </section>
        `;

    this.button = shadow.querySelector(".menu-button");
    this.nav = shadow.querySelector("nav");
    this.menuList = shadow.querySelector("#menu-list");

    if (window.innerWidth < 768) {
      this.nav.ariaHidden = true;
    }

    if (this.hasAttribute("items")) {
      this.updateMenuItems(this.getAttribute("items"));
    }

    this.button.addEventListener("click", () => {
      if (window.innerWidth < 768) this.toggleMenu();
    });

    window.addEventListener("resize", () => this.handleResponsive());
  }

  static get observedAttributes() {
    return ["button-text", "items"];
  }

  handleResponsive() {
    if (window.innerWidth >= 768) {
      this.nav.style.display = "block";
      this.nav.ariaHidden = false;
      this.button.ariaHidden = true;
    } else {
      this.nav.style.display = "none";
      this.nav.ariaHidden = true;
      this.button.ariaHidden = false;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "button-text") {
      this.button.textContent = newValue || "Menu";
    } else if (name === "items") {
      this.updateMenuItems(newValue);
    }
  }

  updateMenuItems(itemsJSON) {
    try {
      const items = JSON.parse(itemsJSON || "[]");
      this.menuList.innerHTML = items
        .map(
          (item) => `
        <li><a href="${item.href}">${item.text}</a></li>
      `,
        )
        .join("");
    } catch (error) {
      console.error("Error parsing menu items:", error);
    }
  }

  toggleMenu() {
    const isExpanded = this.button.getAttribute("aria-expanded") === "true";
    this.button.ariaExpanded = !isExpanded;
    this.nav.style.display = isExpanded ? "none" : "block";
    this.nav.ariaHidden = isExpanded;
  }
}

customElements.define("menu-component", MenuComponent);
