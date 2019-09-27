import rotatePoint from './rotatePoint';

/**
 * Homegrown basic vector class.
 */
export default class Vector {
    x;
    y;
    z;

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    zero() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }

    // get length/magnitude.
    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); // eslint-disable-line
    }

    // set the magnitude/length of the vector.
    setLength(length) {
        return this.copy(this.getUnit().multiply(length));
    }

    // Useful when comparing length of two vectors together, saves a sqrt call.
    squaredLength() {
        return this.x * this.x + this.y * this.y + this.z * this.z; // eslint-disable-line
    }

    // Limit the magnitude to the specified 'max' value.
    limit(max) {
        const squaredMag = this.squaredLength();
        if (squaredMag > max * max) {
            this.divide(Math.sqrt(squaredMag)).multiply(max);
        }

        return this;
    }

    inverse() {
        return this.multiply(-1);
    }

    // Calculates the Euclidean distance between two points (vectors)
    dist(vector) {
        return vector
            .copy()
            .sub(this)
            .getLength();
    }

    getUnit() {
        const length = this.getLength();
        let ret = this;
        if (length > 0) {
            ret = new Vector(this.x / length, this.y / length, this.z / length);
        }

        return ret;
    }

    // Keep in mind this function uses '+' to convert back from string as .toFixed() returns a string.
    getFixedUnit(places) {
        const unit = this.getUnit();
        return new Vector(+unit.x.toFixed(places), +unit.y.toFixed(places), +unit.z.toFixed(places));
    }

    /** Currently only supports 2D rotation. TODO... */
    rotateBy(radians, pivot) {
        const res = rotatePoint(this, radians, pivot);
        this.x = res.x;
        this.y = res.y;

        return this;
    }

    // Project this vector onto another vector.
    project(other) {
        const d = this.dot(other) / other.squaredLength();
        return Vector.multiply(other, d);
    }

    perpendicular() {
        return new Vector(-this.y, this.x); // Effectively rotates the vector 90 degrees counter-clockwise.
    }

    equals(vector) {
        return this.x === vector.x && this.y === vector.y && this.z === vector.z;
    }

    angle() {
        return Math.atan2(this.x, -this.y);
    }

    // Copy the values of another vector into this.
    copy(vector) {
        this.x = vector.x || 0;
        this.y = vector.y || 0;
        this.z = vector.z || 0;

        return this;
    }

    set(x, y = undefined, z = undefined) {
        if (x instanceof Vector) {
            return this.copy(x);
        }

        if (x instanceof Array) {
            this.x = x[0] || 0;
            this.y = x[1] || 0;
            this.z = x[2] || 0;
            return this;
        }

        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;

        return this;
    }

    // Return a clone of this vector.
    clone() {
        return new Vector().copy(this);
    }

    // operators
    // Support addition of vector+vector, vector+array, and vector+scalars.
    add(x, y = undefined, z = undefined) {
        if (x instanceof Vector) {
            this.x += x.x || 0;
            this.y += x.y || 0;
            this.z += x.z || 0;

            return this;
        }

        // Unsure how useful this one is.
        if (x instanceof Array) {
            this.x += x[0] || 0;
            this.y += x[1] || 0;
            this.z += x[2] || 0;
            return this;
        }

        this.x += x || 0;
        this.y += y || 0;
        this.z += z || 0;

        return this;
    }

    // Support substraction of vector-vector, vector-array, and vector-scalars.
    sub(x, y = undefined, z = undefined) {
        if (x instanceof Vector) {
            this.x -= x.x || 0;
            this.y -= x.y || 0;
            this.z -= x.z || 0;

            return this;
        }

        // Unsure how useful this one is.
        if (x instanceof Array) {
            this.x -= x[0] || 0;
            this.y -= x[1] || 0;
            this.z -= x[2] || 0;
            return this;
        }

        this.x -= x || 0;
        this.y -= y || 0;
        this.z -= z || 0;

        return this;
    }

    divide(scalar) {
        if (!(typeof scalar === 'number' && Number.isFinite(scalar)) || scalar === 0) {
            return this;
        }

        this.x /= scalar;
        this.y /= scalar;
        this.z /= scalar;

        return this;
    }

    multiply(scalar) {
        if (!(typeof scalar === 'number' && Number.isFinite(scalar))) {
            return this;
        }

        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;

        return this;
    }

    angleBetween2d(vec) {
        return Math.acos(+this.dot(vec).toFixed(5));
        // return Math.atan2(this.cross2d(vec), this.dot(vec));
    }

    // products
    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z; // eslint-disable-line
    }

    cross(vector) {
        const x = this.y * vector.z - this.z * vector.y;
        const y = this.z * vector.x - this.x * vector.z;
        const z = this.x * vector.y - this.y * vector.x;

        return new Vector(x, y, z);
    }

    cross2d(vec) {
        return this.x * vec.y - this.y * vec.x; // Z component of 3d cross.
    }

    // Static functions
    static inverse(vec) {
        return vec.clone().inverse();
    }

    static rotateBy(vec, radians, pivot) {
        return vec.clone().rotateBy(radians, pivot);
    }

    static angle(vec) {
        // Invert Y because of downward positive Y.
        return Math.atan2(vec.x, -vec.y);
    }

    static divide(vec, scalar) {
        return vec.clone().divide(scalar);
    }

    static multiply(vec, scalar) {
        return vec.clone().multiply(scalar);
    }

    static add(vec1, vec2) {
        return vec1.clone().add(vec2);
    }

    static sub(vec1, vec2) {
        return vec1.clone().sub(vec2);
    }

    static dot(vec1, vec2) {
        return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
    }

    static cross(vec1, vec2) {
        const x = vec1.y * vec2.z - vec1.z * vec2.y;
        const y = vec1.z * vec2.x - vec1.x * vec2.z;
        const z = vec1.x * vec2.y - vec1.y * vec2.x;

        return new Vector(x, y, z);
    }

    static clone(vec) {
        return new Vector().copy(vec);
    }
}
