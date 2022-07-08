import Coordinate from "../utils/coordinate"

interface SocketFeature {
    name: string
    color: string
    keyShortcut: string
    annotationPoints:  Coordinate[]
    // drawShape(): void
}

export default SocketFeature