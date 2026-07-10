function InputArea({ inputValue, setInputValue, onSend, onStartVoice, isListening, voiceSupported, translations }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div className="inputArea">
      <input
        type="text"
        className="question-input"
        placeholder={isListening ? '🎤 Listening...' : translations.placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {voiceSupported ? (
        <button
          className={`mic-btn ${isListening ? 'recording' : ''}`}
          type="button"
          onClick={onStartVoice}
          title="Voice Input"
        >
          🎤
        </button>
      ) : null}

      <button type="button" onClick={onSend}>
        {translations.send}
      </button>
    </div>
  );
}

export default InputArea;
