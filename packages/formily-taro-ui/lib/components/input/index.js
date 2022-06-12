import { connect, mapProps, mapReadPretty } from '@formily/react';
import { AtInput } from 'taro-ui';
import { PreviewText } from '../PreviewText';
export const Input = connect(AtInput, mapProps((props, field) => {
    return Object.assign(Object.assign({}, props), { customStyle: props.style, border: false });
}), mapReadPretty(PreviewText.Input));
//# sourceMappingURL=index.js.map