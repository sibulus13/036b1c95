import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Header from './components/Header';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  const page = useSelector((state) => state.value);
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
      <Header />
      <div className='container-view'>
        {page === 'calls' && (
          <div>
            Call page
          </div>
        )
        }
        {
          page === 'archive' && (
            <div className='container-view__archive'>
              {
                <div>
                  Archive page
                </div>

              }
            </div>
          )
        }
      </div>
      <NavBar />
    </div>
  );
}

export default App;
