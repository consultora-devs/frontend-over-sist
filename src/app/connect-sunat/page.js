"use client"
import { useState } from 'react';

export default function Home() {
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:3000/test-sunat', {
        method: 'POST',
      });

      const result = await res.json();
      setResponse(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>Obtener Token</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}