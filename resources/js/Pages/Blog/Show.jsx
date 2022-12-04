import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react';
import React, { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Moment from 'moment';
import BlogShowItem from '@/Components/BlogShowItem';


export default function Show(props) {
    
    const { data, setData, put, errors } = useForm({
        id:                     props.blog.id || "",
        language:               props.blog.language =="en" ?"English":"Japanese"  || "",
        title:                  props.blog.title || "",
        description:            props.blog.description || "",
        content:                props.blog.content || "",
        author:                 props.blog.author || "",
        author_image_url:       props.blog.author_image_url || "",
        image_url_portrait:     props.blog.image_url_portrait || "",
        image_url_landscape:    props.blog.image_url_landscape || "",
        is_display:             props.blog.is_display =="Y"?"Yes":"No"  || "",
        is_approved:            props.blog.is_approved =="Y"?"Yes":"No"  || "",
        posted_at:              props.blog.posted_at || "",
        posted_date:            Moment(props.blog.posted_at).format('YYYY-MM-DD') || "",
        posted_time:            Moment(props.blog.posted_at).format('hh:mm') || "",

    });

   


    
    // const options = [
    //     {value: '', text: '--Choose an option--'},
    //     {value: 'admin', text: 'Administrator'},
    //     {value: 'manager', text: 'Manager'},
    //     {value: 'user', text: 'User'},
    // ];

    // const [selected, setSelected] = useState(options[0].value);

    // useEffect(() => {
    //     return () => {
    //         reset('password', 'password_confirmation');
    //     };
    // }, []);

    // const onHandleChange = (event) => {
    //     setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    //     // chane select
    // };

    // const submit = (e) => {
    //     e.preventDefault();
    //     post(route('user.store'));
    // };

    // const handleChangeSelect = event => {
    //     setSelected(event.target.value);
    //     setData("role", event.target.value)
    // };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Welcome : {props.auth.user.name} .You have : {props.auth.user.role} rights</h2>}
        >
            <Head title="User Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                    <div className="container ps-5 pe-5">
                            <div className="row">
                                <div className="col-12 p-2 text-left text-dark mt-4">
                                
                                <h2 className="font-semibold text-xl text-gray-800 leading-tight">User Details</h2>

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
                                <BlogShowItem  blog={data}/>
                                {/* <div className="table table-bordered">
                                    <div>
                                        <div>
                                            <div scope="row">ID</div>
                                            <div>x</div>
                                        </div>
                                        <div>
                                            <div scope="row">Name</div>
                                            <div>xx</div>
                                        </div>
                                        <div>
                                            <div scope="row">Email</div>
                                            <div>xx</div>
                                        </div>
                                        <div>
                                            <div scope="row">Role</div>
                                            <div>xx</div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
