import React, { useState } from 'react';
import axios from '../api/axiosInstance'; // 프록시 설정된 axios 인스턴스

const Chat = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newUserMessage = { sender: 'user', text: input };
        setMessages([...messages, newUserMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('/chat/send', {
                message: input
            });

            const newBotMessage = { sender: 'bot', text: response.data.reply || '답변을 가져올 수 없습니다.' };
            setMessages(prev => [...prev, newBotMessage]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { sender: 'bot', text: '오류가 발생했습니다.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.chatWindow}>
                {messages.map((msg, idx) => (
                    <div key={idx} style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    style={styles.input}
                    placeholder="메시지를 입력하세요..."
                />
                <button onClick={handleSend} disabled={loading} style={styles.button}>
                    {loading ? '...' : '전송'}
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        maxWidth: 600,
        margin: '50px auto',
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        height: '90vh'
    },
    chatWindow: {
        flex: 1,
        overflowY: 'auto',
        border: '1px solid #ccc',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        backgroundColor: '#f9f9f9'
    },
    userMessage: {
        textAlign: 'right',
        margin: '8px 0',
        padding: '8px 12px',
        backgroundColor: '#dcf8c6',
        borderRadius: '8px',
        display: 'inline-block'
    },
    botMessage: {
        textAlign: 'left',
        margin: '8px 0',
        padding: '8px 12px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        display: 'inline-block'
    },
    inputContainer: {
        display: 'flex'
    },
    input: {
        flex: 1,
        padding: 12,
        fontSize: 16,
        border: '1px solid #ccc',
        borderRadius: '8px 0 0 8px'
    },
    button: {
        padding: '12px 16px',
        fontSize: 16,
        backgroundColor: '#1976d2',
        color: '#fff',
        border: 'none',
        borderRadius: '0 8px 8px 0',
        cursor: 'pointer'
    }
};

export default Chat;