import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../supabaseClient';

const ChatRoom = ({ courseId = "USF_General", userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // 1. Fetch Initial Messages & Subscribe to Realtime
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('course_room', courseId)
        .order('created_at', { ascending: true });
      
      if (data) setMessages(data);
    };

    fetchMessages();

    // REALTIME SUBSCRIPTION
    const channel = supabase
      .channel('realtime:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        console.log('New message received!', payload);
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [courseId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await supabase.from('messages').insert([
      { 
        course_room: courseId, 
        user_id: userId, 
        content: newMessage,
        is_roast: false 
      }
    ]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[500px] bg-slate-950 border border-emerald-900 rounded-lg">
      {/* Header */}
      <div className="bg-emerald-900 p-3 text-white font-bold tracking-widest">
        ROOM: {courseId}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.is_roast 
                ? 'bg-red-900/50 border border-red-500 text-red-200 ml-auto italic' // Roast Style
                : msg.user_id === userId 
                  ? 'bg-emerald-700 text-white ml-auto' // My Message
                  : 'bg-slate-800 text-gray-300 mr-auto' // Others
            }`}
          >
            {msg.is_roast && <span className="block text-xs font-bold text-red-500">⚠️ DETECTED</span>}
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="p-3 bg-slate-900 border-t border-emerald-900 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-black border border-gray-700 rounded p-2 text-white focus:border-emerald-500 outline-none"
        />
        <button type="submit" className="bg-emerald-600 px-4 py-2 rounded text-white font-bold hover:bg-emerald-500">
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;