import {
    formSchemaType, getFormFieldsType,
} from './types';

export const getValue = (
    type: string = '', value: unknown = '', checked: boolean = false,
) => (
    type === 'checkbox' ? (checked ?? false) : (value ?? '')
);
export const toJSON = <T>(fields: formSchemaType): T => (
    Object.keys(fields).reduce((acc, key) => ({
        ...acc,
        [key]: getValue(fields[key].type, fields[key].value, fields[key].checked),
    }), {}) as T
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
    {
        fields, onChange, toValid, setValue, setError,
    }: getFormFieldsType,
) => (
    Object.keys(fields).reduce((acc, name) => ({
        ...acc,
        [name]: {
            value: getValue(fields[name]?.type, fields[name].value, fields[name]?.checked),
            error: fields[name].error ?? null,
            toValid: () => toValid(name),
            setValue: setValue(name),
            setError: setError(name),
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
