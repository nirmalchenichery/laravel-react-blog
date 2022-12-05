import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import React, { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';


export default function Create(props) {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role:'',
    });

    const options = [
        {value: '', text: '--Choose an option--'},
        {value: 'admin', text: 'Administrator'},
        {value: 'manager', text: 'Manager'},
        {value: 'user', text: 'User'},
    ];

    const [selected, setSelected] = useState(options[0].value);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        // chane select
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('user.store'));
    };

    const handleChangeSelect = event => {
        setSelected(event.target.value);
        setData("role", event.target.value)
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Welcome : {props.auth.user.name} .You have : {props.auth.user.role} rights</h2>}
        >
            <Head title="Create User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                    <div className="container ps-5 pe-5">
                            <div className="row">
                                <div className="col-12 p-2 text-left text-dark mt-4">
                                
                                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Create User</h2>

                                    <div className="p-2 mt-4 mb-4">
                                        <Link
                                            tabIndex="1"
                                            className="mx-1 px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                            style={{textDecoration: 'none'}}
                                            href={route("dashboard")}
                                        >
                                             Back
                                        </Link>

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <form onSubmit={submit}>
                                    <div>
                                        <InputLabel forInput="name" value="Name" />

                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            autoComplete="name"
                                            isFocused={true}
                                            handleChange={onHandleChange}
                                            required
                                        />

                                        <InputError message={errors.name} className="mt-2" />

                                    </div>

                                    <div className="mt-4">
                                        <InputLabel forInput="email" value="Email" />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            handleChange={onHandleChange}
                                            required
                                        />

                                        <InputError message={errors.email} className="mt-2" />

                                    </div>

                                    <div className="mt-4">
                                        <InputLabel forInput="password" value="Password" />

                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            handleChange={onHandleChange}
                                            required
                                        />

                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel forInput="password_confirmation" value="Confirm Password" />

                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            handleChange={onHandleChange}
                                            required
                                        />

                                        <InputError message={errors.password_confirmation} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel forInput="role" value="Role" />
                                        <select value={selected} onChange={handleChangeSelect} className="mt-1 block w-full">
                                            {options.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.text}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex items-center justify-end mt-4">
                                        
                                        <PrimaryButton className="ml-4" processing={processing}>
                                            Register
                                        </PrimaryButton>

                                    </div>
                                    
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
