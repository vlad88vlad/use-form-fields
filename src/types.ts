import React from 'react';

export type ReactOnChangeType = React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>

export type validFuncType = (_e) => string | null
export type onChangeType = (_e: ReactOnChangeType) => void
export type onChangeHandlerType = (_e: string) => void
export type toValidType = (_e: string) => string | null

export type valueType = string | number | boolean
export type valueCallbackTypeArg = { prevValue: valueType }
export type valueCallbackType = (_value: valueCallbackTypeArg) => valueType

type radioOptionType = {
    option: any
}
type fieldBase = {
    error?: string,
    immediatelyValidate?: boolean,
    required?: boolean,
    toValid?: () => void,
    validations?: validFuncType[],
    minLen?: number,
    maxLen?: number,
    fieldProps?: object,
    [key: string]: unknown
}
type customFieldType = fieldBase & {
    type: 'custom',
    value: any,
    checked?: never,
}
type inputFieldType = fieldBase & {
    type?: 'text' | 'password' |
        'email' | 'range' |
        'color' | 'search' |
        'date' | 'datetime' |
        'datetime-local' | 'tel' |
        'time' | 'url' |
        'month' | 'week' ,
    value?: string | number,
    checked?: never,
}

type numberFieldType = fieldBase & {
    type: 'number',
    value?: number,
    checked?: never,
}
type radioFieldType = fieldBase & {
    type: 'radio',
    value: string | number,
    checked?: boolean,
    options: radioOptionType[]

}
type checkboxFieldType = fieldBase & {
    type: 'checkbox',
    checked: boolean,
    value?: never

}
export type getFormFieldsType = {
    fields: formSchemaType,
    onChange: onChangeHandlerType,
    toValid: toValidType,
    setValue: (_value) => void
    setError: (_errorMessage) => void
}
export type formSchemaType = {
    [key: string]: checkboxFieldType | radioFieldType | inputFieldType | customFieldType | numberFieldType
}

export type formField = {
    value: any,
    fieldProps: {
        value: any,
        name: string,
        required?: boolean,
        onChange: onChangeType
    },
    error?: string,
    setValue: (_value) => void,
    setError: (_errorMessage) => void,
    toValid?: () => void,
    radioOptions?: any[],

}
export type formFields = {
    [key: string]: formField
}

export type toJSONType = <T = { [key: string]: any }> () => T
export type useFormType = {
    form: {
        fields: formFields,
        toJSON: toJSONType,
        toValidate: () => boolean
    }
}
