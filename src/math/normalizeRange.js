const normalizeRange = (value, oldMin, oldMax, newMin, newMax) => ((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;

export default normalizeRange;
