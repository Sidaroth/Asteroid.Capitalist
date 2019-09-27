import Vector from '../math/vector';
import Rect from './rect';
import store from '../store';

// https://www.wikiwand.com/en/Quadtree
// TODO: Look into Direct Access Quadtree Lookup (Chapter 4.5 Programming Gems 2) --> Bit magic.
const createQuadTree = (boundary, cap = Infinity, divisions = Infinity, subDivision = 0, parentNode = undefined) => {
    const state = {};

    const capacity = cap;
    const maxDivisions = divisions;
    const bounds = boundary;
    const division = subDivision;
    const parent = parentNode;

    let entities = [];
    let subTrees = [];
    const isDivided = false;

    function subdivide() {
        // split boundary into 4 subRegions and redistribute entities to their new owners.
        state.isDivided = true;
        const width = bounds.w / 2;
        const height = bounds.h / 2;

        const midPoint = new Vector(bounds.x + bounds.w / 2, bounds.y + bounds.h / 2);
        const ne = new Rect(midPoint.x, midPoint.y - height, width, height);
        const nw = new Rect(bounds.x, midPoint.y - height, width, height);
        const se = new Rect(midPoint.x, midPoint.y, width, height);
        const sw = new Rect(bounds.x, midPoint.y, width, height);

        subTrees.push(createQuadTree(ne, capacity, maxDivisions, division + 1, state));
        subTrees.push(createQuadTree(nw, capacity, maxDivisions, division + 1, state));
        subTrees.push(createQuadTree(se, capacity, maxDivisions, division + 1, state));
        subTrees.push(createQuadTree(sw, capacity, maxDivisions, division + 1, state));

        // Redistribute current entities.
        for (let i = entities.length; i > 0; i -= 1) {
            const entity = entities.pop();
            subTrees.every((tree) => {
                if (tree.insert(entity)) return false;
                return true;
            });
        }
    }

    // Collapse empty subtrees back into this node --> ask parent to check to collapse us if we're now empty.
    function cleanup() {
        if (state.isDivided) {
            let dividedSubTree = false;
            let entitiesInSubtrees = 0;
            subTrees.every((tree) => {
                dividedSubTree = tree.isDivided;
                if (dividedSubTree) return false;

                entitiesInSubtrees += tree.entities.length;

                return true;
            });

            if (!dividedSubTree && entitiesInSubtrees === 0) {
                subTrees = [];
                state.isDivided = false;
                if (parent) parent.cleanup();
            }

            if (parent) parent.cleanup();
        } else if (!entities.length && parent) parent.cleanup();
    }

    function remove(entity) {
        const entityPos = entity.position || entity.getPosition();
        if (!bounds.contains(entityPos)) return;
        if (state.isDivided) {
            subTrees.forEach(tree => tree.remove(entity));
        } else {
            // We're in a leaf node.
            const idx = entities.findIndex(e => e.id === entity.id);
            if (idx !== -1) {
                entities.splice(idx, 1);
                cleanup();
            }
        }
    }

    function insert(entity) {
        const entityPos = entity.position || entity.getPosition();
        if (!bounds.contains(entityPos)) return false;
        if (!state.isDivided && !(division + 1 > maxDivisions) && entities.length + 1 > capacity) subdivide();

        if (state.isDivided) {
            subTrees.every((tree) => {
                if (tree.insert(entity)) return false;
                return true;
            });
        } else {
            entities.push(entity);
        }

        return true;
    }

    function getAllEntities() {
        if (state.isDivided) {
            let ents = [];
            subTrees.forEach((tree) => {
                ents = [...ents, ...tree.getAllEntities()];
            });

            return ents;
        }

        return entities;
    }

    function getSubtrees() {
        return subTrees;
    }

    // Returns any point within given range/shape.
    function query(shape) {
        let found = [];

        if (!bounds.intersects(shape)) return found;
        if (state.isDivided) {
            found = subTrees.reduce((arr, tree) => arr.concat(...tree.query(shape)), []);
        } else {
            entities.forEach((entity) => {
                store.count += 1;
                if (!entity.position && entity.getPosition && shape.contains(entity.getPosition())) {
                    found.push(entity);
                } else if (shape.contains(entity.position)) {
                    found.push(entity);
                }
            });
        }

        return found;
    }

    function clear() {
        entities = [];
        subTrees = [];
        state.isDivided = false;
    }

    function render(context) {
        context.lineStyle(1, 0x000000);
        context.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);

        subTrees.forEach((tree) => {
            tree.render(context);
        });
    }

    return Object.assign(state, {
        insert,
        remove,
        render,
        query,
        subdivide,
        clear,
        getAllEntities,
        getSubtrees,
        entities,
        subTrees,
        cleanup,
        isDivided,
        // stuff
    });
};

export default createQuadTree;
