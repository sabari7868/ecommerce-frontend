import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const backend = (window && window.BACKEND_URL) ? window.BACKEND_URL : 'http://localhost:5000';
    fetch(`${backend}/api/products`)
      .then(r => r.json())
      .then(data => setProducts(data))
      .catch(err => { console.error(err); setProducts([]); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', padding: 24 }}>
      <h1>🛍️ Minimal Ecommerce Frontend</h1>
      {loading ? <p>Loading products…</p> : (
        <ul>
          {products.map(p => <li key={p.id}>{p.name} — ₹{p.price}</li>)}
        </ul>
      )}
    </div>
  );
}

export default App;
