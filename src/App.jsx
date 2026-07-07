import { useEffect } from 'react';
import { getProducts } from './services/api';

function App() {
  useEffect(() => {
    getProducts().then(data => console.log(data));
  }, []);

  return <div>Testando...</div>;
}

export default App;