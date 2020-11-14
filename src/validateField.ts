import { validFuncType } from './types';

export const validateField = (
    value, validations: validFuncType[] = [], required: boolean, minLen, maxLen,
) => {
    if (required && !value) {
        return 'required';
    }
    if (minLen && minLen > value?.length) {
        return `min length ${minLen}`;
    }
    if (maxLen && maxLen < value?.length) {
        return `max length ${maxLen}`;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const func of validations) {
        const err = (
            typeof func === 'function'
                ? func(value)
                : null
        );

        if (err) {
            return err;
        }
    }

    return null;
};
