import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  const [progress, setProgress] = useState(0);
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API
  return (
    <Router>
      <div>
        <Navbar/>
        <LoadingBar
          color='#f11946'
          progress={progress}
          height={3}
        />
        <Routes>
          <Route exact path='/' element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country="us" category="general"/>} />
          <Route exact path='/general' element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country="us" category="general"/>} />
          <Route exact path='/business' element={<News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={pageSize} country="us" category="business"/>} />
          <Route exact path='/health' element={<News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={pageSize} country="us" category="health"/>} />
          <Route exact path='/science' element={<News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={pageSize} country="us" category="science"/>} />
          <Route exact path='/sports' element={<News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={pageSize} country="us" category="sports"/>} />
          <Route exact path='/technology' element={<News apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={pageSize} country="us" category="technology"/>} />
          <Route exact path='/entertainment' element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country="us" category="entertainment"/>}/>
      </Routes>
      </div>
    </Router>
  )
}