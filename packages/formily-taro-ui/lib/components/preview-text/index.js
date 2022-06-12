import React, { createContext, useContext } from 'react';
import { isArr, isValid } from '@formily/shared';
import { View as TaroView } from '@tarojs/components';
import cls from 'classnames';
const View = TaroView;
const PlaceholderContext = createContext('N/A');
const Placeholder = PlaceholderContext.Provider;
const usePlaceholder = (value) => {
    const placeholder = useContext(PlaceholderContext) || 'N/A';
    return isValid(value) && value !== '' ? value : placeholder;
};
const getValueByValue = (array, inputValue, keyMap, path = []) => {
    const { inputKey = 'value', outputKey = 'label', childrenKey = 'children', } = keyMap || {};
    let outputValue;
    if (isArr(array)) {
        if (isArr(inputValue)) {
            outputValue = inputValue.map((v) => getValueByValue(array, v, keyMap, path));
        }
        else {
            array.forEach((obj) => {
                var _a;
                if (outputValue === undefined) {
                    const currentPath = [...path, obj === null || obj === void 0 ? void 0 : obj[outputKey]];
                    if ((obj === null || obj === void 0 ? void 0 : obj[inputKey]) === inputValue) {
                        outputValue = {
                            leaf: obj === null || obj === void 0 ? void 0 : obj[outputKey],
                            whole: currentPath,
                        };
                    }
                    else if ((_a = obj === null || obj === void 0 ? void 0 : obj[childrenKey]) === null || _a === void 0 ? void 0 : _a.length) {
                        outputValue = getValueByValue(obj === null || obj === void 0 ? void 0 : obj[childrenKey], inputValue, keyMap, currentPath);
                    }
                }
            });
        }
        return outputValue;
    }
    return undefined;
};
const Input = (props) => {
    return (
    // <Space className={cls(prefixCls, props.className)} style={props.style}>
    //   {props.addonBefore}
    //   {props.prefix}
    //   {usePlaceholder(props.value)}
    //   {props.suffix}
    //   {props.addonAfter}
    // </Space>
    React.createElement(View, { className: cls('at-input', props.className) }, usePlaceholder(props.value)));
};
const Text = (props) => {
    return (React.createElement(View, { className: cls(props.className), style: props.style }, usePlaceholder(props.value)));
};
Text.Input = Input;
Text.Placeholder = Placeholder;
Text.usePlaceholder = usePlaceholder;
export const PreviewText = Text;
export default PreviewText;
//# sourceMappingURL=index.js.map