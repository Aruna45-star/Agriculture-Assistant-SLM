function ChatBox({ messages, isLoading, translations, chatBoxRef }) {
  return (
    <div className="chatBox" ref={chatBoxRef}>
      {messages.length === 0 ? (
        <div className="message botMessage" dangerouslySetInnerHTML={{ __html: translations.welcome }} />
      ) : (
        messages.map((message, index) => (
          <div key={`${message.type}-${index}`} className={`message ${message.type === 'user' ? 'userMessage' : 'botMessage'}`}>
            {message.type === 'bot' && message.isWelcome ? (
              <span dangerouslySetInnerHTML={{ __html: message.content }} />
            ) : (
              message.content
            )}
          </div>
        ))
      )}

      {isLoading && <div className="loading">{translations.thinking}</div>}
    </div>
  );
}

export default ChatBox;
