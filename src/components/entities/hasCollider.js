import Matter from 'matter-js';
import store from 'src/store';
import Rect from 'src/quadTree/rect';

const hasCollision = (state) => {
    let collisionCategory;
    let collider;
    let collidesWith = [];

    // TODO: Collides with.
    function setColliderShape(shape) {
        collider = shape;
    }

    function getCollider() {
        return collider;
    }

    function setCollisionCategory(cat) {
        collisionCategory = cat;
    }

    function getCollisionCategory() {
        return collisionCategory;
    }

    function setCollidesWith(categories) {
        collidesWith = categories;
    }

    function addCollidesWith(cat) {
        collidesWith.push(cat);
    }

    function __constructor() {
        // Collider.
    }

    function isColliding() {
        const nearbyEntities = store.game.getEntityTree().query(new Rect());
        nearbyEntities.forEach((entity) => {
            if (entity.getCollider) {
                const collision = Matter.SAT.collides(collider, entity.getCollider());
            }
        });
    }

    return {
        __constructor,
        setCollisionCategory,
        getCollisionCategory,
        getCollider,
        setColliderShape,
        addCollidesWith,
        setCollidesWith,
    };
};

export default hasCollision;
