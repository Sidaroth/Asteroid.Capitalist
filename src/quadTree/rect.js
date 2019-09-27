import Vector from '../math/vector';
import Circle from '../quadTree/circle';
import clamp from '../math/clamp';

export default class Rect {
    x;
    y;
    w;
    h;

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        return point.x >= this.x && point.x < this.x + this.w && point.y >= this.y && point.y < this.y + this.h;
    }

    getVertices() {
        const pos = this.getPosition();
        const size = this.getSize();

        const vertices = [
            pos,
            new Vector(pos.x + size.x, pos.y),
            new Vector(pos.x + size.x, pos.y + size.y),
            new Vector(pos, pos.y + size.y),
        ];

        return vertices;
    }

    intersects(shape) {
        if (shape instanceof Rect) {
            return !(shape.x > this.x + this.w || shape.x + shape.w < this.x || shape.y > this.y + this.h || shape.y + shape.h < this.y);
        } else if (shape instanceof Circle) {
            const closestX = clamp(shape.x, this.x, this.x + this.w);
            const closestY = clamp(shape.y, this.y, this.y + this.h);
            const dist = new Vector(shape.x - closestX, shape.y - closestY);

            return dist.squaredLength() < shape.r2;
        }

        return false;
    }

    getSize() {
        return new Vector(this.w, this.h);
    }

    getPosition() {
        return new Vector(this.x, this.y);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setSize(w, h) {
        this.w = w;
        this.h = h;
    }
}
