import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Update from './components/Update';
import { useEffect, useState} from 'react';
import axios from 'axios';
import SafariList from './components/SafariList';
import Form from './components/Form';
import Show from './components/Show';
import "nes.css/css/nes.min.css";
import ImageSlider from './components/ImageSlider';
import images from "./images/images";

function App() {
  const [errors, setErrors] = useState([]);
  const [safariList, setSafariList] = useState([]);
  
  //Delete Button & Remove from Dom
  const removeFromDom = id => {
      setSafariList(safariList.filter(SafariList => SafariList._id !== id));
  }

  return (
  <BrowserRouter>
    <div class="App">
      {/* This line brings in images */}
    <ImageSlider images = {images} />
      <Routes>
                    {/* //User sees these routes!!! */}
            {/* //Home Route */}
            <Route path='/' element={ <SafariList safariList={safariList} removeFromDom={removeFromDom} setSafariList={setSafariList} />} 
            />
            {/* Update Route */}
            <Route path='/safari/update/:id' element={<Update setSafariList={setSafariList} errors = {errors} setErrors = {setErrors} />} /> 
            {/* Add or Create Route */}
            <Route path='/safari/create' element={ <Form initialName = "" errors = {errors} setSafariList = {setSafariList} safariList = {safariList} setErrors = {setErrors} />} />
            {/* Show Route */}
            <Route path='/safari/show/:id' element={<Show />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
