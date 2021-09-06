# use-form-fields
[Demo](https://vlad88vlad.github.io/use-form-fields)

To get it started, add `use-form-fields` to your project:

```shell
npm install --save use-form-fields
```
or 
```shell
yarn add use-form-fields --save
```

Please note that `use-form-fields` requires `react@>=16.8.6` as a peer dependency.


## Form Schema

```jsx
import { useForm } from 'use-form-fields';


const formSchema = {
    ['name_field']: {
        type: `'text' | 'password' | 'email' | 'range' | 'radio' | 'checkbox'` (optional),
        value: `string (optional)`,
        checked: `boolean (optional)`,
        minLen: `number (optional)`,
        maxLen: `number (optional)`,
        validations: `array of function`,
        fieldProps: ` native props of html element`,
        immediatelyValidate: ` boolean (optional)`,
        error: `string (optional`,
    }
}

const { form } = useForm(formSchema);
  
```
### form consists of:
##### fields 
```ts
{
    [key: string]: {
        fieldProps: {
            value: string,
            name: string,
            required?: boolean,
            onChange: onChangeType
        },
        error?: string,
        toValid?: () => void,
        radioOptions?: any[],
    }
}
```
##### toJSON 
```ts
function () => return { key: value }
```

##### toValidate 
```ts
 function () => return boolean
```



## Examples

SimpleForm
[Demo](https://vlad88vlad.github.io/use-form-fields/#/simple-form)

```jsx
import { useForm } from 'use-form-fields';


export const SimpleForm = () => {
    const { form: { fields }, form } = useForm({
        test: {},
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (form.toValidate()) {
            console.log(form.toJSON());
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input {...fields.test.fieldProps} />
            <button type="submit">submit</button>
        </form>
    );
};
```


ValidationForm
[Demo](https://vlad88vlad.github.io/use-form-fields/#/validation-form)

```jsx
import { useForm } from 'use-form-fields';


const validateFirstName = (value) => {
    if (value === 'John') {
        return 'John already exist';
    }

    return null;
};
const validateLastName = (value) => {
    if (value === 'Smith') {
        return 'Smith already exist';
    }

    return null;
};

export const ValidationForm = () => {
    const { form: { fields }, form } = useForm({
        firstName: { value: 'John', validations: [validateFirstName] },
        lastName: { validations: [validateLastName] },
        email: { type: 'email', required: true, minLen: 8 },
        password: { type: 'password', required: true, minLen: 8 },
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (form.toValidate()) {
            console.log(form.toJSON());
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input {...fields.firstName.fieldProps} />
            <span>{fields.firstName.error}</span>
            <input {...fields.lastName.fieldProps} />
            <span>{fields.lastName.error}</span>
            <input {...fields.email.fieldProps} />
            <span>{fields.email.error}</span>
            <input {...fields.password.fieldProps} />
            <span>{fields.password.error}</span>
            <button type="submit">submit</button>
        </form>
    );
};
```

LoginForm
```jsx
import { useForm } from 'use-form-fields';


export const LoginForm = () => {
    const { form: { fields }, form } = useForm({
        email: {
            type: 'email',
        },
        password: {
            type: 'password',
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (form.toValidate()) {
            console.log(form.toJSON());
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input {...fields.email.fieldProps} />
            <input {...fields.password.fieldProps} />
        </form>
    );
};
```

CheckboxForm
```jsx
import { useForm } from 'use-form-fields';


export const CheckboxForm = () => {
    const { form: { fields }, form } = useForm({
        test: {
            type: 'checkbox',
            checked: false,
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (form.toValidate()) {
            console.log(form.toJSON());
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input {...fields.test.fieldProps} />
            <button type="submit">submit</button>
        </form>
    );
};
```

SelectForm
```jsx
import { useForm } from 'use-form-fields';


export const SelectForm = () => {
    const { form: { fields }, form } = useForm({
        test: {
            value: '',
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (form.toValidate()) {
            console.log(form.toJSON());
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <select {...fields.test.fieldProps}>
                <option value="">please select</option>
                <option value="male">male</option>
                <option value="female">female</option>
            </select>
            <button type="submit">submit</button>
        </form>
    );
};
```


RadioForm
```jsx
import { useForm } from 'use-form-fields';


export const RadioForm = () => {
    const { form: { fields }, form } = useForm({
        test: {
            type: 'radio',
            value: '',
            options: [
                {
                    option: 'male',
                }, {
                    option: 'female',
                },
            ],
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (form.toValidate()) {
            console.log(form.toJSON());
        }
    };

    return (
        <form onSubmit={onSubmit}>
            {fields.test.radioOptions?.map((optionField) => (
                <input {...optionField} />
            ))}
            <button type="submit">submit</button>
        </form>
    );
};
```
