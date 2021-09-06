import React from 'react';
import {useForm} from 'use-form-fields';
import Input from "../components/Input";
import Button from "../components/Button";

const SimpleForm = () => {
    const {form: {fields}, form} = useForm({
        name: {
            required: true
        },
    });

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (form.toValidate()) {
            alert(JSON.stringify(form.toJSON()))
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h1> Simple Form </h1>
            <Input
                label="name"
                {...fields.name.fieldProps}
                error={fields.name.error}
            />

            <Button type="submit"> submit</Button>
        </form>
    );
};

export default SimpleForm;
