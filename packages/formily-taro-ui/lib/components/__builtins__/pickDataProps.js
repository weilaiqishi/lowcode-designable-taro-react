export const pickDataProps = (props = {}) => {
    const results = {};
    for (let key in props) {
        if (key.indexOf('data-') > -1) {
            results[key] = props[key];
        }
    }
    return results;
};
//# sourceMappingURL=pickDataProps.js.map