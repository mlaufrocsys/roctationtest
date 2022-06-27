import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'
import CCS1 from '../../socket/socketTypes/ccs1'
import CCS2 from '../../socket/socketTypes/ccs2'
import SocketType from '../../socket/socketTypes/socketType'
import SocketFeature from '../../socket/socketFeatures/socketFeature'
import { RootState } from '../../store'
import Coordinate from '../../socket/utils/coordinate'
import { stat } from 'fs'

var features: SocketFeature[] = []

export const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    type: 'NOT LOADED',
    selectedFeatureIndex: -1,
    selectedPointIndex: -1,
    features: JSON.stringify(features),
    
  },
  reducers: {
    //allows to initialse the right CCS
    initialise: (state, action) => {
      console.log(action.payload)
      if(action.payload == "CCS1") {
        state.type = "CCS1"
        features = new CCS1().features
      } else if(action.payload == "CCS2") {
        state.type = "CCS2"
        features = new CCS2().features
      }
      state.features = JSON.stringify(features) 
      state.selectedFeatureIndex = 0;
    },    

    //change the index of the currently selected feature
    switchFeature: (state, action: PayloadAction<number>) => {
      //the index is correct
      if(action.payload >= 0 && action.payload < features.length){
        state.selectedFeatureIndex = action.payload
      }
      //update current point index to the last point
      state.selectedPointIndex = features[state.selectedFeatureIndex].annotationPoints.length - 1;
    },

    //change the index of the currently selected feature
    switchPoint: (state, action: PayloadAction<number>) => {
      //the index is correct
      if(action.payload >= 0 && action.payload < features[state.selectedFeatureIndex].annotationPoints.length){
        state.selectedPointIndex = action.payload
      }
    },

    //adds a point to the current feature
    createPoint: (state, action: PayloadAction<Coordinate>) => {
      features[state.selectedFeatureIndex].annotationPoints.push(new Coordinate(action.payload.x, action.payload.y)) 
      state.features = JSON.stringify(features)
      //update current point index
      state.selectedPointIndex = features[state.selectedFeatureIndex].annotationPoints.length - 1;
    },

    //change the coordinate of the point
    updatePoint: (state, action: PayloadAction<Coordinate>) => {
      //set current selected point to the new index
      features[state.selectedFeatureIndex].annotationPoints[state.selectedPointIndex] = action.payload
      state.features = JSON.stringify(features)
    },

    //deletes selected point
    deletePoint: (state) => {
      if(state.selectedPointIndex < 0) return

      //removes entry from array at selected point
      features[state.selectedFeatureIndex].annotationPoints.splice(state.selectedPointIndex, 1)
      state.features = JSON.stringify(features)

      //set to -1 if the current the array is empty
      if(state.selectedPointIndex > 0){
        state.selectedPointIndex--
      } else {
        if(features[state.selectedFeatureIndex].annotationPoints.length == 0){
          state.selectedPointIndex = -1
        } 
      }
    }
  }
})

export const selectType = (state: RootState) => state.socket.type
export const selectAllFeatures = (state: RootState) => state.socket.features
export const selectFeatureIndex = (state: RootState) => state.socket.selectedFeatureIndex
export const selectPointIndex = (state: RootState) => state.socket.selectedPointIndex
// Action creators are generated for each case reducer function
export const { initialise, createPoint, switchFeature, switchPoint, updatePoint, deletePoint } = socketSlice.actions

export default socketSlice.reducer