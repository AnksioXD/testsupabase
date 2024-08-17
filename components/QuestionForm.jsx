import React,{useState, useEffect} from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://dzirokzkywhgqixcvkrz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6aXJva3preXdoZ3FpeGN2a3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3ODg2NTEsImV4cCI6MjAzOTM2NDY1MX0.Uf2E260hMusN_CGoC1TbMn4iA9TQjp1zrnKYwe0TDNk')

export default function QuestionForm() {
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const { error } = await supabase
      .from('Questions')
      .insert([
        { subject, chapter, question, answer }
      ]);

    if (error) {
      console.error('Error inserting question:', error.message);
      setSubmitStatus(`Error: ${error.message}`);
    } else {
      setSubmitStatus('Question submitted successfully!');
      // Optionally reset form fields after successful submission
      setSubject('');
      setChapter('');
      setQuestion('');
      setAnswer('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Subject:
        <input
            className='py-4 mx-2 my-4 text-white bg-black'
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </label>
      <br />

      <label>
        Chapter:
        <input
        className='py-4 mx-2 my-4 text-white bg-black'
          type="text"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
        />
      </label>
      <br />

      <label>
        Question:
        <input
        className='py-4 mx-2 my-4 text-white bg-black'
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </label>
      <br />

      <label>
        Answer:
        <input
        className='py-4 mx-2 my-4 text-white bg-black'
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </label>
      <br />

      <button className="px-5 text-black bg-slate-300" type="submit">Submit</button>
      {submitStatus && <p>{submitStatus}</p>}
    </form>
  );
}