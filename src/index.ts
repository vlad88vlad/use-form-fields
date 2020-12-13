import { useReducer, useCallback, useMemo } from 'react';
import { getValue, getFormFields, toJSON } from './utils';
import {
    formSchemaType, useFormType, ReactOnChangeType,
} from './types';

import { validateField } from './validateField';

function fieldsReducer(state, field) {
    return {
        ...state,
        [field.name]: {
            ...state[field.name],
            value: field.value ?? '',
            checked: field.checked ?? false,
            error: field.error ?? null,
        },

    };
}

export const useForm = (
    formSchema: formSchemaType = {},
): useFormType => {
    const [fields, dispatchField] = useReducer(fieldsReducer, formSchema);
    const onChange = useCallback((name: string) => (event: ReactOnChangeType) => {
        const { checked, value } = (event.target as HTMLInputElement);

        const {
            validations,
            required = false,
            immediatelyValidate = true,
            type,
            minLen,
            maxLen,
        } = fields[name];
        const errorMessage = immediatelyValidate
            ? validateField(value, validations, required, minLen, maxLen) : null;

        dispatchField({
            error: errorMessage,
            name,
            checked,
            value: getValue(type, value, checked),
        });
    }, [fields]);

    const setError = (name: string) => (errorMessage: string) => {
        dispatchField({
            error: errorMessage,
            name,
        });
    };

    const setValue = (name: string) => (value) => {
        const {
            validations,
            required = false,
            immediatelyValidate = true,
            type,
            minLen,
            maxLen,
        } = fields[name];
        const errorMessage = immediatelyValidate
            ? validateField(value, validations, required, minLen, maxLen) : null;

        dispatchField({
            error: errorMessage,
            name,
            value: getValue(type, value),
        });
    };

    const toValid = (name: string) => {
        const {
            value,
            validations,
            required = false,
            checked = false,
            minLen,
            maxLen,
        } = fields[name];
        const error = validateField(value, validations, required, minLen, maxLen);

        dispatchField({
            error,
            name,
            value,
            checked,
        });

        return error;
    };

    const form = useMemo(
        () => (getFormFields({fields, onChange, toValid, setValue, setError})
        ), [fields, onChange],
    );

    const toValidate = () => (
        Object.keys(fields)
            .map((key) => !!toValid(key))
            .every((error) => !error)
    );

    return {
        form: {
            fields: form,
            toJSON: <T>() => toJSON<T>(fields),
            toValidate,
        },

    };
};
