import React from 'react';
import ChatRoom from './components/ChatRoom';
import SyllabusImport from './components/SyllabusImport';

function App() {
  // PASTE YOUR REAL SUPABASE USER ID HERE
  const MY_ID = "krshnverma@usf.edu"; 

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center text-emerald-500 mb-8 tracking-widest uppercase">
  COGNO <span className="text-white text-lg block mt-2">v1.0 // SURVEILLANCE ACTIVE</span>
</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Utility */}
        <div>
          <SyllabusImport userId={MY_ID} />
        </div>

        {/* Right Side: The Chat */}
        <div>
          <ChatRoom userId={MY_ID} courseId="COP2510" />
        </div>
      </div>
    </div>
  );
}

export default App;