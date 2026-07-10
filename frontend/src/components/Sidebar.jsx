function Sidebar({ isOpen, toggleDrawer, translations, examples, onExampleSelect, onClearHistory, onDownloadPDF }) {
  return (
    <>
      <div className={`drawer-overlay ${isOpen ? 'show' : ''}`} onClick={toggleDrawer}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleDrawer} title="Close Menu">
          ✕
        </button>

        <div className="examples">
          <h3>{translations.examplesTitle}</h3>
          {examples.map((example, index) => (
            <button key={example} onClick={() => onExampleSelect(example)}>
              {['🌱', '🌾', '🌿', '💧'][index]} {example}
            </button>
          ))}
        </div>

        <div className="drawer-section">
          <h3>{translations.actionsTitle}</h3>
          <button className="drawer-btn pdf-btn" onClick={onDownloadPDF}>
            📄 Download PDF
          </button>
          <button className="drawer-btn clear-btn" onClick={onClearHistory}>
            🗑️ Clear History
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
