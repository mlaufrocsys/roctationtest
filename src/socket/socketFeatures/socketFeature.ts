import Coordinate from "../utils/coordinate"

interface SocketFeature {
    name: string
    color: string
    keyShortcut: string
    annotationPoints:  Coordinate[]
}

export default SocketFeature