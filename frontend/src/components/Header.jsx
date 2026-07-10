import {
  Menu,
  Globe,
  Moon,
  Sun,
  Leaf,
} from "lucide-react";

function Header({
  toggleDrawer,
  language,
  setLanguage,
  darkMode,
  toggleDarkMode,
  translations,
}) {
  return (
    <header className="header">

      <div className="header-left">

        <button
          className="menu-btn"
          onClick={toggleDrawer}
        >
          <Menu size={22} />
        </button>

        <div className="logo">

          <div className="logo-circle">
            <Leaf size={24} />
          </div>

          <div>

            <h1>{translations.title}</h1>

            <p>{translations.subtitle}</p>

          </div>

        </div>

      </div>

      <div className="header-right">

        <div className="language-select">

          <Globe size={18} />

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
          >
            <option value="English">
              English
            </option>

            <option value="Telugu">
              తెలుగు
            </option>

            <option value="Hindi">
              हिन्दी
            </option>

          </select>

        </div>

        <button
          className="theme-btn"
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>

      </div>

    </header>
  );
}

export default Header;