import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../supabaseClient';

const ChatRoom = ({ courseId = "COP2510", userId }) => {
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
      if (error) console.error("Error loading chat:", error);
    };

    fetchMessages();

    // REALTIME SUBSCRIPTION
    const channel = supabase
      .channel('realtime:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
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

    // Optimistic UI update (optional, but makes it feel fast)
    const { error } = await supabase.from('messages').insert([
      { 
        course_room: courseId, 
        user_id: userId,
        sender_name: 'Me', // We hardcode "Me" for the demo
        content: newMessage,
        is_roast: false 
      }
    ]);

    if (error) console.error("Error sending:", error);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-slate-950 border border-emerald-900 rounded-xl shadow-2xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-emerald-900/80 backdrop-blur-sm p-4 text-white flex justify-between items-center border-b border-emerald-700">
        <div>
            <h2 className="font-bold tracking-widest text-lg">ROOM: {courseId}</h2>
            <span className="text-xs text-emerald-300">🟢 3 Students Online</span>
        </div>
        <div className="text-2xl">🐂</div> {/* Mecha-Rocky Icon */}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col max-w-[80%] ${
              msg.is_roast ? 'mx-auto w-full' : // Roast is centered
              msg.user_id === userId ? 'ml-auto items-end' : 'mr-auto items-start' // Me vs Them
            }`}
          >
            {/* SENDER NAME (Only show for others) */}
            {!msg.is_roast && msg.user_id !== userId && (
                <span className="text-xs text-emerald-500 font-mono mb-1 ml-1">
                    {msg.sender_name || 'Student'}
                </span>
            )}

            {/* THE MESSAGE BUBBLE */}
            <div className={`p-3 rounded-lg text-sm shadow-lg ${
               msg.is_roast 
                 ? 'bg-red-900/80 border-2 border-red-500 text-red-100 font-bold text-center animate-pulse' 
                 : msg.user_id === userId 
                   ? 'bg-emerald-600 text-white rounded-tr-none' 
                   : 'bg-slate-800 text-gray-200 border border-slate-700 rounded-tl-none'
            }`}>
              {msg.is_roast && <div className="text-xl mb-1">🚨 VIOLATION DETECTED</div>}
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="p-4 bg-slate-950 border-t border-emerald-900 flex gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
        />
        <button type="submit" className="bg-emerald-600 px-6 py-2 rounded-lg text-white font-bold hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/20">
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;