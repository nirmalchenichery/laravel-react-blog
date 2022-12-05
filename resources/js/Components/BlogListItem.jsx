import React from 'react';
import { Head, usePage, Link } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Inertia } from "@inertiajs/inertia";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, useNavigate} from 'react-router-dom';

const BlogListItem = (props) => {

    return (
          <>
            <a href={"/showblog/" + props.blog.id}  style={{textDecoration: 'none'}}>
                <div key={props.blog.id} className="row mt-4 mb-4 blog-card border rounded">
                        <div className="col-lg-4 col-12 p-0 m-0">
                            <img className="rounded w-100 h-100" src="https://picsum.photos/300/350"/>
                        </div>
                        <div className="col-lg-8 col-12 p-lg-5">
                            <div className="row h-100 pt-4 align-item-center">
                                <div className="col-12 mx-auto">
                                    <small className="text-muted fs-8">{props.blog.posted_at}</small>
                                    <br/>
                                    <h2 className="fw-lighter fs-2">{props.blog.title}</h2>
                                    <p className="text-muted"> {props.blog.description}</p>
                                    <p>
                                        <img className="rounded-circle" alt="Author Image" height="35" width="35"
                                            src="https://picsum.photos/300/350"/>
                                        <span className="ps-1">{props.blog.author}</span>
                                    </p>
                                </div>   
                            </div>
                        </div>
                </div>
            </a>
        </>
    );
};
export default BlogListItem;