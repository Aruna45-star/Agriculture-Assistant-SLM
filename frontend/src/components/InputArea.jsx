import { Mic, Send, Paperclip } from "lucide-react";

function InputArea({
  inputValue,
  setInputValue,
  onSend,
  onStartVoice,
  isListening,
  voiceSupported,
  translations,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="input-wrapper">

      <div className="input-area">

        {/* Attachment Button */}
        <button
          className="icon-btn attachment-btn"
          type="button"
          title="Attach File"
        >
          <Paperclip size={18} />
        </button>

        {/* Input */}

        <input
          type="text"
          className="question-input"
          placeholder={
            isListening
              ? "Listening..."
              : translations.placeholder
          }
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Voice */}

        {voiceSupported && (
          <button
            className={`icon-btn mic-btn ${
              isListening ? "recording" : ""
            }`}
            onClick={onStartVoice}
            type="button"
            title="Voice Input"
          >
            <Mic size={18} />
          </button>
        )}

        {/* Send */}

        <button
          className="send-btn"
          onClick={onSend}
          type="button"
        >
          <Send size={18} />
        </button>

      </div>

      <div className="input-footer">

        <span>
          🌾 Agriculture AI may occasionally make mistakes.
        </span>

      </div>

    </div>
  );
}

export default InputArea;