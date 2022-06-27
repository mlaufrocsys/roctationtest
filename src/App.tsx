import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { increment, selectBrightness, incrementByAmount } from './features/brightness/brightnessSlicer'
import React, { useEffect, useState, MouseEvent } from 'react';
import CCS1 from './socket/socketTypes/ccs1';
import CCS2 from './socket/socketTypes/ccs2';
import FeatureDisplayer from './featureDisplayer';

import { selectType, initialise, selectAllFeatures, createPoint, switchFeature, updatePoint, selectFeatureIndex, selectPointIndex, deletePoint, switchPoint } from './features/socket/socketSlicer';
import Ellipse from './socket/socketFeatures/ellipse';
import Coordinate from './socket/utils/coordinate';
import SocketFeature from './socket/socketFeatures/socketFeature';
import Sidebar from './pages/Sidebar';
import AnnotationCanvas from './pages/annotationCanvas';

export function App() {
  const dispatch = useDispatch()


  //execute on initialisation
  useEffect(() => {
    //TODO get right socketype externally
    dispatch(initialise("CCS1"))
  }, [])


  

  return (
    <div className='flex-container'>
      <Sidebar/>
      <AnnotationCanvas/>
    </div>
    
  );

  
}

export default App;
