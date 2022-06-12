var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { createContext, useContext } from 'react';
import { ExpressionScope, FormProvider, useParentForm, } from '@formily/react';
import { View as TaroView } from '@tarojs/components';
import { PreviewText } from '../PreviewText';
const View = TaroView;
export const FormLayoutContext = createContext(null);
export const useFormLayoutContext = () => useContext(FormLayoutContext);
export const Form = (_a) => {
    var { className, style, form, component, previewTextPlaceholder, children } = _a, props = __rest(_a, ["className", "style", "form", "component", "previewTextPlaceholder", "children"]);
    const top = useParentForm();
    const renderContent = (_form) => (React.createElement(FormLayoutContext.Provider, { value: props },
        React.createElement(ExpressionScope, { value: { $$form: _form } },
            React.createElement(PreviewText.Placeholder, { value: previewTextPlaceholder },
                React.createElement(View, { className: className, style: style }, children)))));
    if (form)
        return React.createElement(FormProvider, { form: form }, renderContent(form));
    if (!top)
        throw new Error('must pass form instance by createForm');
    return renderContent(top);
};
Form.defaultProps = {
    component: 'form',
};
export default Form;
//# sourceMappingURL=preview.js.map