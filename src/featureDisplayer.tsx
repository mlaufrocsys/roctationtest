import React, { Component } from "react"
import SocketFeature from "./socket/socketFeatures/socketFeature"
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { selectPointIndex } from "./features/socket/socketSlicer"
import { selectBrightness } from "./features/brightness/brightnessSlicer"


class FeatureDisplayer extends Component<SocketFeature, {}> {

    shouldComponentUpdate(nextprops: SocketFeature){
        //update component if annotation points are different
        if(nextprops.annotationPoints.length != this.props.annotationPoints.length) return true

        //check if coordinates are same
        for(var i = 0; i < nextprops.annotationPoints.length; i++){
            //update component if one of the x or y points has changed
            if(nextprops.annotationPoints[i].x !=  this.props.annotationPoints[i].x|| nextprops.annotationPoints[i].y != this.props.annotationPoints[i].y) return true
        }

        return false
    }
    
    render() {
        return(
            <div className={this.props.keyShortcut}>
                <p>{this.props.name}</p>  
                <ul>
                {this.props.annotationPoints.map((item, i) =>
                    <li key={this.props.keyShortcut + "-" + i}>x: {item.x} y: {item.y}</li>
                    
                    )
                }
                </ul>
            </div>
        );

    }
    
}

export default FeatureDisplayer