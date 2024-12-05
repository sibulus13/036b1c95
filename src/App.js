import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
// TODO cache fetch?

import Header from './components/Header';
import NavBar from './components/NavBar';
import View from './components/View';
import './App.css';
import { setCalls } from './redux/store';
import { useDispatch } from 'react-redux';

function App() {
  const page = useSelector((state) => state.page);
  const calls = useSelector((state) => state.calls);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchCalls = async () => {
    const url = "https://aircall-api.onrender.com";
    const response = await fetch(url + "/activities");
    const data = await response.json();
    dispatch(setCalls(data));
    setIsLoading(false);
  }
  useEffect(() => {
    if (calls.length === 0) {
      fetchCalls();
    }
  });

  return (
    <div className='container'>
      <Header />
      <div className='container-view'>
        {
          isLoading ? <div
          className='loading-container'
          ><ReactLoading type={'spin'} color={'black'} height={200} width={200} /></div> :
            <View type={page} key={page} />
        }
      </div>
      <NavBar />
    </div>
  );
}

export default App;
