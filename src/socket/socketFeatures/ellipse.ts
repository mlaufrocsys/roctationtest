import Coordinate from "../utils/coordinate";
import SocketFeature from "./socketFeature";

class Ellipse implements SocketFeature {
    name: string;
    color: string;
    keyShortcut: string;
    annotationPoints: Coordinate[]

    constructor(name: string, color: string, keyShortcut: string, annotationPoints: Coordinate[]){
        this.name = name;
        this.color = color;
        this.keyShortcut = keyShortcut;
        this.annotationPoints = annotationPoints;
    }
}

export default Ellipse