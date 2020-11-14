import {
    formSchemaType, onChangeHandlerType, toValidType,
} from './types';

export const getValue = (
    type: string = '', value: string = '', checked: boolean = false,
) => (
    type === 'checkbox' ? (checked ?? false) : (value ?? '')
);
export const toJSON = (fields: formSchemaType): { [key: string]: unknown } => (
    Object.keys(fields).reduce((acc, key) => ({
        ...acc,
        [key]: getValue(fields[key].type, fields[key].value, fields[key].checked),
    }), {})
);

export const formTypeFields = {
    radio: (field, name, onChange, fieldProps) => ({
        radioOptions: field?.options?.map((radioOption) => ({
            type: 'radio',
            key: radioOption.option,
            checked: field.value === radioOption.option,
            value: radioOption.option,
            name,
            onChange,
            ...fieldProps,
        })),
    }),
    checkbox: (field, name, onChange, fieldProps) => ({
        fieldProps: {
            checked: field.checked,
            required: field.required,
            type: 'checkbox',
            onChange,
            name: field?.name || name,
            ...fieldProps,
        },
    }),
};
export const getFieldProps = ({
    type = '', field, name, onChange, fieldProps,
}) => (
    formTypeFields[type]
        ? formTypeFields[type](field, name, onChange, fieldProps) : {
            fieldProps: {
                value: getValue(type, field.value),
                required: field.required,
                name: field?.name || name,
                onChange,
                type,
                ...fieldProps,

            },
        }
);

export const getFormFields = (
    fields: formSchemaType, onChange: onChangeHandlerType, toValid: toValidType,
) => (
    Object.keys(fields).reduce((acc, name) => ({
        ...acc,
        [name]: {
            value: getValue(fields[name]?.type, fields[name].value, fields[name]?.checked),
            error: fields[name].error ?? null,
            toValid: () => toValid(name),
            ...getFieldProps(
                {
                    type: fields[name]?.type,
                    field: fields[name],
                    name,
                    onChange: onChange(name),
                    fieldProps: fields[name].fieldProps,
                },
            ),

        },
    }), {})
);
