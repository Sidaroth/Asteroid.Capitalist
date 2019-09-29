import Matter from 'matter-js';
import store from 'src/store';
import Circle from 'src/quadTree/circle';
import eventConfig from 'configs/eventConfig';
import devConfig from 'configs/devConfig';

const hasCollision = (state) => {
    let collisionCategory;
    let collider;
    let collidesWith = [];

    let collidingWith = [];

    // Only used to filter out entities that are not necessary to check collision against.
    let visionCircle;
    const visionRadius = 35;

    function __constructor() {
        // Collider.
        visionCircle = new Circle(state.getX(), state.getY(), visionRadius);
    }

    function setPosition(pos) {
        if (visionCircle) {
            visionCircle.x = pos.x;
            visionCircle.y = pos.y;
        }

        if (collider) {
            Matter.Body.setPosition(collider, pos);
        }

        return pos;
    }

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

    function drawVision(somethingInRange = false) {
        const color = somethingInRange ? 0x00ff00 : 0xff0000;
        const gfx = store.game.getGFXContext();
        gfx.lineStyle(1, color);
        gfx.strokeCircle(state.getX(), state.getY(), visionRadius);
    }

    // NOTE Only works for circular colliders!
    function drawCollider() {
        const color = 0xffff00;
        const gfx = store.game.getGFXContext();
        gfx.lineStyle(1, color);
        gfx.strokeCircle(state.getX(), state.getY(), collider.circleRadius);
    }

    function update() {
        if (!collider) return;

        const collidingEntities = [];

        const nearbyEntities = store.game.getEntityTree().query(visionCircle);
        nearbyEntities
            .filter(e => e !== state && e.getCollider && collidesWith.indexOf(e.getCollisionCategory()) !== -1)
            .forEach((entity) => {
                const collision = Matter.SAT.collides(collider, entity.getCollider());
                if (collision.collided) {
                    const data = {
                        entity,
                        collisionData: collision,
                    };

                    collidingEntities.push(data);
                }
            });

        if (devConfig.DEBUG && store.drawColliders) {
            // drawVision(collidingEntities.length > 0);
            drawCollider();
        }

        const newEntities = collidingEntities.filter(e => !collidingWith.find(ent => e.entity.id === ent.entity.id)); // We werent't colliding, but we are now.
        const removedEntities = collidingWith.filter(e => !collidingEntities.find(ent => e.entity.id === ent.entity.id)); // We were colliding, but no longer.
        collidingWith = collidingEntities;

        newEntities.forEach((e) => {
            e.entity.emit(eventConfig.COLLISION.START, { entity: state, data: e.collisionData });
            state.emit(eventConfig.COLLISION.START, e);
        });

        removedEntities.forEach((e) => {
            e.entity.emit(eventConfig.COLLISION.END, { entity: state, data: e.collisionData });
            state.emit(eventConfig.COLLISION.END, e);
        });
    }

    return {
        __constructor,
        setPosition,
        setCollisionCategory,
        getCollisionCategory,
        getCollider,
        setColliderShape,
        addCollidesWith,
        setCollidesWith,
        update,
    };
};

export default hasCollision;
