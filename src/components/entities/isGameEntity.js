import getUUID from 'utils/getUUID';

const isGameEntity = function isGameEntityFunc(state) {
    const isDirty = false;
    const type = '';

    function printInfo() {
        console.log(`id: %c${state.id}`, 'color: yellow');
    }

    function update(time) {
        return time;
    }

    return {
        // props
        id: getUUID(),
        type,
        // methods
        printInfo,
        update,
        isDirty,
    };
};

export default isGameEntity;
