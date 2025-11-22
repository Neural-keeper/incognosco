import React, { useState } from 'react';
import Papa from 'papaparse';
import { supabase } from '../supabaseClient';

const SyllabusImport = ({ userId }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        console.log("Parsed CSV:", results.data);
        
        // Transform CSV data to match Supabase columns
        // Assumes CSV headers are: Date, Course, Assignment
        const tasksToInsert = results.data.map(row => ({
          user_id: userId, // Passed from parent
          course_code: row.Course,
          assignment_name: row.Assignment,
          due_date: row.Date, // Ensure CSV date format is YYYY-MM-DD
          is_completed: false
        }));

        try {
          const { error } = await supabase
            .from('tasks')
            .insert(tasksToInsert);
            
          if (error) throw error;
          alert("✅ Syllabus Synced Successfully!");
        } catch (error) {
          console.error("Error uploading:", error);
          alert("❌ Upload failed. Check console.");
        } finally {
          setUploading(false);
        }
      }
    });
  };

  return (
    <div className="p-6 bg-slate-900 border border-emerald-800 rounded-lg">
      <h2 className="text-2xl font-bold text-emerald-400 mb-4">📂 Syllabus Sync</h2>
      <p className="text-gray-400 mb-4">Upload your CSV (Headers: Date, Course, Assignment)</p>
      
      <input 
        type="file" 
        accept=".csv"
        onChange={handleFileUpload}
        className="block w-full text-sm text-slate-300
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-emerald-900 file:text-emerald-300
          hover:file:bg-emerald-800"
      />
      {uploading && <p className="text-yellow-400 mt-2 animate-pulse">Syncing with Database...</p>}
    </div>
  );
};

export default SyllabusImport;