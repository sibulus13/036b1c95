import './App.css';
import Header from './components/Header';
import { useEffect, useState } from 'react';

function App() {

  const [calls, setCalls] = useState([]);
  const fetchCalls = async () => {
    const url = "https://aircall-api.onrender.com";
    const response = await fetch(url + "/activities");
    const data = await response.json();
    setCalls(data);
  }
  useEffect(() => {
    fetchCalls();
  }, []);

  return (
    <div className='container'>
      <header className="App-header">
        <Header />
      </header>
      <div className='container-view'>
        Test
      </div>
    </div>
  );
}

export default App;
