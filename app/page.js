"use client"
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import QuestionForm from '@/components/QuestionForm';

// Create a single supabase client for interacting with your database
const supabase = createClient('https://dzirokzkywhgqixcvkrz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6aXJva3preXdoZ3FpeGN2a3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3ODg2NTEsImV4cCI6MjAzOTM2NDY1MX0.Uf2E260hMusN_CGoC1TbMn4iA9TQjp1zrnKYwe0TDNk')


export default function Home() {
    const [data, setData] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase
            .from('Questions').select()
            .textSearch('subject', `${inputValue}`, {type: 'websearch', config: 'english'});
            setData(data);
            if (error) console.error(error); // Handle potential errors
        }

        fetchData();
    }, [inputValue]); // Add inputValue to the dependency array

    useEffect(() => {
        console.log(data); // Log data whenever it changes
    }, [data]);

    return (
        <>
        <h1 className='text-3xl'>Prototype</h1>
          <div className="flex justify-between gap-10"> {/* Adjust spacing between items */}
            <QuestionForm />
            <div className="flex-grow search"> {/* Allow the search div to grow and fill space */}
              <h1>Search</h1>
              <input
                className='w-full px-2 py-4 bg-black border-b-2 border-orange-300 text-lime-300'
                type='text'
                value={inputValue}
                onChange={handleInputChange}
              />
              <div className='bg-black '>
                {data && data.map((item, index) => (
                  <div className='flex flex-col items-start justify-start px-2 py-3 border-b-2' key={index}>
                    <p>Subject: <span className='text-lime-300'>{item.subject}</span></p>
                    <p>Chapter: {item.chapter}</p>
                    <p>Question: {item.question}</p>
                    <p>Answer: {item.answer}</p>
                    <p>Created at: {item.created_at.split("T")[0]}</p>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      );

}

