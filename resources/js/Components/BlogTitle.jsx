import React from 'react';
import { Head, usePage, Link } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Inertia } from "@inertiajs/inertia";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, useNavigate} from 'react-router-dom';


const BlogTitle = (props) => {

    return (
        <>
            <div className="row">
                <div className="col-12 p-2 text-center mt-4 mb-4 border-bottom-black">
                    <h1 className="fw-bolder fs-1">Blog!</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae dui et nunc ornare vulputate non
                    fringilla massa.</p>
                </div>
            </div>
        </>
            
    );
};
export default BlogTitle;