import Vector from './vector';

/**
 * Rotates a point by a given radian. A pivot may be specified.
 */
export default function rotatePoint(point, radians, pivot = new Vector()) {
    const res = new Vector();
    res.x = (point.x - pivot.x) * Math.cos(radians) - (point.y - pivot.y) * Math.sin(radians) + pivot.x;
    res.y = (point.x - pivot.x) * Math.sin(radians) + (point.y - pivot.y) * Math.cos(radians) + pivot.y;

    return res;
}
