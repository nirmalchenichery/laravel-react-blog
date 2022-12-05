import React from 'react';
// import { Head, usePage, Link } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Inertia } from "@inertiajs/inertia";
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Routes, Route, useNavigate} from 'react-router-dom';

const BlogShowDetail = (props) => {

    return (
        <>
            <div className="mt-4">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">{props.blog.title}</h2>
            </div>   
            <div className="mt-4">
                <h2 className="text-xl text-gray-800 leading-tight">Auther : {props.blog.author}</h2>
                <h2 className="text-xl text-gray-800 leading-tight"> Posted at : {props.blog.posted_at}</h2>
            </div>  
            <div className="mt-4">
                <div className="col-lg-4 col-12 p-0 m-0">
                    <img className="rounded w-100 h-100" src="https://picsum.photos/300/350"/>
                </div>
            </div>
            <div className="mt-4">
                <h2 className="text-xl text-gray-800 leading-tight">{props.blog.description}</h2>
            </div> 

            <div className="mt-4">
                <p className="text-muted  text-gray-800 leading-tight"> {props.blog.content}</p>
            </div> 
        </>
    );
};
export default BlogShowDetail;