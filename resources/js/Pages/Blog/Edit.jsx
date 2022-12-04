import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import React, { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Moment from 'moment';

export default function Edit(props) {
    
    const { data, setData, put, errors } = useForm({
        id:                     props.blog.id || "",
        language:               props.blog.language  || "",
        title:                  props.blog.title || "",
        description:            props.blog.description || "",
        content:                props.blog.content || "",
        author:                 props.blog.author || "",
        author_image_url:       props.blog.author_image_url || "",
        image_url_portrait:     props.blog.image_url_portrait || "",
        image_url_landscape:    props.blog.image_url_landscape || "",
        is_display:             props.blog.is_display  || "",
        is_approved:            props.blog.is_approved || "",
        posted_at:              props.blog.posted_at || "",
        posted_date:            Moment(props.blog.posted_at).format('YYYY-MM-DD') || "",
        posted_time:            Moment(props.blog.posted_at).format('hh:mm') || "",
    });

    const options = [
        {value: '', text: '--Choose an option--'},
        {value: 'en', text: 'English'},
        {value: 'jp', text: 'Japanese'},
    ];

    const [selected, setSelected] = useState(options[0].value);
    const [radioType, setRadioType] = useState("Y");

    const handleChangeSelect = event => {
        setSelected(event.target.value);
        setData("language", event.target.value)
    };

    // useEffect(() => {
    //     return () => {
    //         reset('password', 'password_confirmation');
    //     };
    // }, []);

    // const onHandleChange = (event) => {
    //     setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    //     // chane select
    // };

    const submit = (e) => {
        e.preventDefault();
        put(route("blog.update", data.id));
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
                                
                                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Blog</h2>

                                    <div className="p-2 mt-4 mb-4">
                                        <Link
                                            tabIndex="1"
                                            className="mx-1 px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                            style={{textDecoration: 'none'}}
                                            href={route("blog.index")}
                                        >
                                             Back
                                        </Link>

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <form onSubmit={submit}>
                                    <div className="mt-4">
                                        <label className="font-bold">Language</label>
                                        <select value={data.language} onChange={handleChangeSelect} className="mt-1 block w-full">
                                            {options.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.text}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.language && <span className="border-red-500 p-3 text-red-600">
                                            {errors.language}
                                        </span>}
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold">Title</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full"
                                            label="Title"
                                            name="title"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                            // onChange={onHandleChange}
                                        />
                                        {errors.title && <span className="border-red-500 p-3 text-red-600">
                                            {errors.title}
                                        </span>}

                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold">Description</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full"
                                            label="description"
                                            name="description"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData("description", e.target.value)
                                            }
                                            // onChange={onHandleChange}
                                        />
                                        {errors.description && <span className="border-red-500 p-3 text-red-600">
                                            {errors.description}
                                        </span>}
                                    </div>

                                    {/* Textarea */}
                                    <div className="mt-4"> 
                                        <label className="font-bold">Content</label>
                                        
                                        <textarea
                                            type="text"
                                            className="w-full rounded"
                                            label="content"
                                            name="content"
                                            errors={errors.content}
                                            value={data.content}
                                            onChange={(e) =>
                                                setData("content", e.target.value)
                                            }
                                            // onChange={onHandleChange}
                                        />
                                        {errors.content && <span className="border-red-500 p-3 text-red-600">
                                            {errors.content}
                                        </span>}
                                                
                                    </div>

                                    <div className="mt-4"> 
                                        <label className="font-bold">Choose Display Option</label>
                                            <div className="radio-btn-container">
                                                    <div className="radio-btn"
                                                        onClick={() => {
                                                            setRadioType("Y");
                                                        }}
                                                    >
                                                    <input 
                                                        type="radio"
                                                        value="Y"
                                                        checked={radioType == "Y"}
                                                        onChange={(e) =>
                                                            setData("is_display", e.target.value)
                                                        }
                                                    />
                                                    Yes
                                                    </div>
                                                    <div className="radio-btn"
                                                        onClick={() => {
                                                            setRadioType("N");
                                                        }}
                                                    >
                                                    <input
                                                        type="radio"
                                                        value="N"
                                                        checked={radioType == "N"}
                                                        onChange={(e) =>
                                                            setData("is_display", e.target.value)
                                                        }
                                                    />
                                                    No
                                                    </div>
                                            </div>

                                            {errors.is_display && <span className="border-red-500 p-3 text-red-600">
                                                {errors.is_display}
                                            </span>}
                                                
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold">Posted Date </label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2"
                                            label="posted_date"
                                            name="posted_date"
                                            value={data.posted_date}
                                            onChange={(e) =>
                                                setData("posted_date", e.target.value)
                                            }
                                        />

                                        {errors.posted_date && <span className="border-red-500 p-3 text-red-600">
                                            {errors.posted_date}
                                        </span>}
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold">Posted Date </label>
                                        <input   
                                            type="time"
                                            className="w-full px-4 py-2"
                                            label="posted_time"
                                            name="posted_time"
                                            value={data.posted_time}
                                            onChange={(e) =>
                                                setData("posted_time", e.target.value)
                                            }
                                        />

                                        {errors.posted_time && <span className="border-red-500 p-3 text-red-600">
                                            {errors.posted_time}
                                        </span>}

                                    </div>
                                    
                                    <div className="mt-4">
                                        <label>
                                                <input
                                                type="checkbox"
                                                value="Y"
                                                defaultChecked=""
                                                onChange={(e) =>
                                                    setData("is_approved", e.target.value)
                                                }
                                                /> I Agree with this content...
                                            </label>
                                            <br />
                                            <br />
                                            
                                            {errors.is_approved && <span className="border-red-500 p-3 text-red-600">
                                                {errors.is_approved}
                                            </span>}
                                    </div>
                                    
                                    <div className="flex items-center justify-end mt-4">
                                        <button
                                            type="submit"
                                            className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                        >
                                            Save
                                        </button>
                                    </div>
                                    <div className="mt-4"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
