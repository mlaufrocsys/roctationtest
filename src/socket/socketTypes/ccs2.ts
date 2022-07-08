import Ellipse from "../socketFeatures/ellipse";
import SocketFeature from "../socketFeatures/socketFeature";
import Coordinate from "../utils/coordinate";
import SocketType from "./socketType";

class CCS2 implements SocketType {  
    name: string;
    features: SocketFeature[];
    
    constructor(name?: string) {
        this.name = "CCS2"
        this.features = [
            new Ellipse('Pin 1', '#ba68c8', 'Digit1', []),
            new Ellipse('Pin 2', '#9575cd', 'Digit2', []),
            new Ellipse('Pin 3', '#7986cb', 'Digit3', []),
            new Ellipse('Pin 4', '#64b5f6', 'Digit4', []),
            new Ellipse('Pin 5', '#4dd0e1', 'Digit5', []),
            new Ellipse('Pin 6', '#4db6ac', 'Digit6', []),
            new Ellipse('Pin 7', '#81c784', 'Digit7', []),
            new Ellipse('Pin 8', '#aed581', 'Digit8', []),
            new Ellipse('Pin 9', '#dce775', 'Digit9', [])
        ]
            
    }
        


}
    

export default CCS2