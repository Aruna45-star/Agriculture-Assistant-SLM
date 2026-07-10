import {
  X,
  Plus,
  FileText,
  Trash2,
  Sparkles,
  Leaf,
} from "lucide-react";

function Sidebar({
  isOpen,
  toggleDrawer,
  translations,
  examples,
  onExampleSelect,
  onClearHistory,
  onDownloadPDF,
}) {
  return (
    <>
      <div
        className={`drawer-overlay ${isOpen ? "show" : ""}`}
        onClick={toggleDrawer}
      />

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>

        {/* Header */}

        <div className="sidebar-header">

          <div className="sidebar-logo">

            <div className="sidebar-logo-icon">
              <Leaf size={22} />
            </div>

            <div>

              <h2>Agriculture AI</h2>

              <span>Smart Farming Assistant</span>

            </div>

          </div>

          <button
            className="close-btn"
            onClick={toggleDrawer}
          >
            <X size={18} />
          </button>

        </div>

        {/* New Chat */}

        <button className="new-chat-btn">

          <Plus size={18} />

          New Chat

        </button>

        {/* Examples */}

        <div className="sidebar-title">

          <Sparkles size={16} />

          <span>{translations.examplesTitle}</span>

        </div>

        <div className="example-list">

          {examples.map((example, index) => (

            <button
              key={index}
              className="example-btn"
              onClick={() => onExampleSelect(example)}
            >

              {example}

            </button>

          ))}

        </div>

        {/* Bottom */}

        <div className="sidebar-bottom">

          <button
            className="drawer-btn"
            onClick={onDownloadPDF}
          >

            <FileText size={18} />

            Export Chat

          </button>

          <button
            className="drawer-btn danger"
            onClick={onClearHistory}
          >

            <Trash2 size={18} />

            Clear Chat

          </button>

        </div>

      </aside>

    </>
  );
}

export default Sidebar;