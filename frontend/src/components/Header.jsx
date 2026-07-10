function Header({ toggleDrawer, language, setLanguage, darkMode, toggleDarkMode, translations }) {
  return (
    <div className="header">
      <button className="hamburger-btn" onClick={toggleDrawer} title="Open Menu">
        ☰
      </button>

      <h1>{translations.title}</h1>
      <p>{translations.subtitle}</p>

      <div className="header-actions">
        <button className="theme-btn" onClick={toggleDarkMode}>
          {darkMode ? translations.lightMode : translations.darkMode}
        </button>
      </div>

      <div className="language-box">
        <label htmlFor="language">🌐</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Telugu">తెలుగు</option>
          <option value="Hindi">हिन्दी</option>
        </select>
      </div>
    </div>
  );
}

export default Header;
