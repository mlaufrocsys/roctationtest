
import { useSelector, useDispatch } from 'react-redux'
import { increment, selectBrightness, incrementByAmount } from '.././features/brightness/brightnessSlicer'
import React, { useEffect, useState, MouseEvent } from 'react';
import CCS1 from '.././socket/socketTypes/ccs1';
import CCS2 from '.././socket/socketTypes/ccs2';
import FeatureDisplayer from '.././featureDisplayer';

import { selectType, initialise, selectAllFeatures, createPoint, switchFeature, updatePoint, selectFeatureIndex, selectPointIndex, deletePoint, switchPoint } from '.././features/socket/socketSlicer';
import Ellipse from '.././socket/socketFeatures/ellipse';
import Coordinate from '.././socket/utils/coordinate';
import SocketFeature from '.././socket/socketFeatures/socketFeature';


export function Sidebar() {
    const brightness = useSelector(selectBrightness)
    const socketType = useSelector(selectType)
    const currentFeatures: SocketFeature[] = useSelector(selectAllFeatures)
    const selectedfeatureIndex = useSelector(selectFeatureIndex)
    const selectedPointIndex = useSelector(selectPointIndex)
    const dispatch = useDispatch()
  
  

    
  
    function addCoordinate(){
      //add mouse click
      //add mouse position
  
      //temporary
      const x = Math.floor(10 * Math.random())
      const y = Math.floor(10 * Math.random())
  
      dispatch(createPoint(new Coordinate(x, y)))
    }
  
    function changeCurrentPoint() {
      //add mouse click
      //add mouse position
  
      //temporary
      const x = Math.floor(10 * Math.random())
      const y = Math.floor(10 * Math.random())
  
      dispatch(updatePoint(new Coordinate(x, y)))
    }
    
    
    
    
  
    // function handleMouseMove(event: MouseEvent){
    //   event.preventDefault()
    //   socket.features[0].annotationPoints.push(new Coordinate(event.clientX, event.clientY))
    //   console.log(socket.features[0].annotationPoints)
      
    // }
  
    
  
    return (
      <div className="App sidebar">
        <header className="App-header" >
          <h5>{socketType}
            {"feature i: " + selectedfeatureIndex}<br/>
            {"point i: " + selectedPointIndex}
            
            </h5>
            <button onClick={() => dispatch(increment())}>increment 2</button>
            <button onClick={() => dispatch(initialise("CCS1"))}>new ccs1</button>
            <button onClick={() => addCoordinate()}>add point</button>
          
            <button onClick={() => dispatch(switchFeature(2))}>switch to feature 3</button>
            <button onClick={() => dispatch(switchPoint(0))}>switch to first point</button>          
            <button onClick={() => changeCurrentPoint() }>change current selected point</button>
            <button onClick={() => dispatch(deletePoint())}>delete point</button>
          <h4>{brightness} brightness</h4>
          <div id="featurewrapper">
            {currentFeatures.map((item, i) => (
              <FeatureDisplayer {...item} />
            ))
            }
          </div>
  
          
        </header>
      </div>
    );
  
}

export default Sidebar