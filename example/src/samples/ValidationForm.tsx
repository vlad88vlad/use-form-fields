import React from 'react';
import {useForm} from 'use-form-fields';
import Input from "../components/Input";
import Button from "../components/Button";

const validateFirstName = (value: string) => {
    if (value === 'John') {
        return 'John already exist';
    }

    return null;
};
const validateLastName = (value: string) => {
    if (value === 'Smith') {
        return 'Smith already exist';
    }

    return null;
};
const ValidationForm = () => {
    const {form: {fields}, form} = useForm({
        firstName: {value: 'John', validations: [validateFirstName]},
        lastName: {validations: [validateLastName]},
        email: {type: 'email', required: true, minLen: 8},
        password: {type: 'password', required: true, minLen: 8},
    });

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (form.toValidate()) {
            console.log(form.toJSON());
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h1> Validation Form </h1>
            <Input
                label="firstName"
                {...fields.firstName.fieldProps}
                error={fields.firstName.error}
            />
            <Input label="lastName"
                   {...fields.lastName.fieldProps}
                   error={fields.lastName.error}
            />
            <Input label="email"
                   {...fields.email.fieldProps}
                   error={fields.email.error}
            />
            <Input label="password"
                   {...fields.password.fieldProps}
                   error={fields.password.error}
            />
            <Button type="submit"> submit</Button>
        </form>
    );
};

export default ValidationForm;
