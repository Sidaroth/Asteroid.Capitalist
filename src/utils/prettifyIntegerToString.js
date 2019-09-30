const prettifyIntegerToString = function prettifyIntegerToStringFunc(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export default prettifyIntegerToString;
