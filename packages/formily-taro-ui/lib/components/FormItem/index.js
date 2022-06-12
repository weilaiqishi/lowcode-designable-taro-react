import React from 'react';
import { isVoidField } from '@formily/core';
import { connect, mapProps } from '@formily/react';
import { View as TaroView } from '@tarojs/components';
import classNames from 'classnames';
import { useFormLayoutContext } from '../Form';
const View = TaroView;
const useFormItemLayout = () => {
    var _a, _b, _c, _d;
    const layout = useFormLayoutContext();
    return {
        bordered: (_a = layout === null || layout === void 0 ? void 0 : layout.bordered) !== null && _a !== void 0 ? _a : true,
        labelAlign: (layout === null || layout === void 0 ? void 0 : layout.layout) === 'vertical' ? (_b = layout === null || layout === void 0 ? void 0 : layout.labelAlign) !== null && _b !== void 0 ? _b : 'left'
            : (_c = layout === null || layout === void 0 ? void 0 : layout.labelAlign) !== null && _c !== void 0 ? _c : 'right',
        labelCol: layout === null || layout === void 0 ? void 0 : layout.labelCol,
        labelWidth: layout === null || layout === void 0 ? void 0 : layout.labelWidth,
        labelWrap: layout === null || layout === void 0 ? void 0 : layout.labelWrap,
        layout: (_d = layout === null || layout === void 0 ? void 0 : layout.layout) !== null && _d !== void 0 ? _d : 'horizontal',
        wrapperAlign: layout === null || layout === void 0 ? void 0 : layout.wrapperAlign,
        wrapperCol: layout === null || layout === void 0 ? void 0 : layout.wrapperCol,
        wrapperWidth: layout === null || layout === void 0 ? void 0 : layout.wrapperWidth,
        wrapperWrap: layout === null || layout === void 0 ? void 0 : layout.wrapperWrap,
    };
};
export const BaseItem = ({ children, field, }) => {
    const formLayout = useFormItemLayout();
    console.log(formLayout);
    const required = !isVoidField(field) && field.required && field.pattern !== 'readPretty';
    return React.createElement(View, { className: classNames('at-row', { 'at-hairline-bottom': formLayout.bordered }) },
        React.createElement(View, { className: classNames(`at-col`, `at-col-${formLayout.labelCol}`) },
            React.createElement(View, { className: `at-row at-row__align--center`, style: { height: '100%' } },
                React.createElement(View, { className: classNames('at-col at-input__title', {
                        'at-input__title--required': required,
                    }), style: { width: 'auto', textAlign: formLayout.labelAlign } }, field.title))),
        React.createElement(View, { className: `at-col at-col-${formLayout.wrapperCol}` }, children));
};
export const FormItem = connect(BaseItem, mapProps((props, field) => {
    return Object.assign(Object.assign({}, props), { field });
}));
//# sourceMappingURL=index.js.map