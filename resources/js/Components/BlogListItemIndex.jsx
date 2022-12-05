import React from 'react';
import { Head, usePage, Link } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Inertia } from "@inertiajs/inertia";


const BlogListItemIndex = (props) => {

    function destroy(e) {
        if (confirm("Are you sure you want to delete this user?")) {
            Inertia.delete(route("blog.destroy", e.currentTarget.id));
        }
    }

    return (
        <div key={props.blog.id} className='grid grid-cols-8'>
            <div className="border px-4 py-2">{props.blog.id}</div>
            <div className="border px-4 py-2">{props.blog.title}</div>
            <div className="border px-4 py-2">{props.blog.description}</div>
            <div className="border px-4 py-2">{props.blog.author}</div>
            <div className="border px-4 py-2">{ (props.blog.is_approved =="Y")?"Yes":"No"}</div>
            <div className="border px-4 py-2">{ props.blog.posted_at }</div>
            <div className="border px-4 py-3">
                <Link
                    tabIndex="1"
                    className="mx-1 px-4 py-2 text-sm text-white bg-blue-500 rounded"
                    style={{textDecoration: 'none'}}
                    href={route("blog.show", props.blog.id)}
                >
                    Show
                </Link>
                <Link
                    tabIndex="1"
                    className="mx-1 px-4 py-2 text-sm text-white bg-green-500 rounded"
                    style={{textDecoration: 'none'}}
                    href={route("blog.edit", props.blog.id)}
                >
                    Edit
                </Link>
                {
                    props.role == 'admin' ? 
                                            <button
                                            onClick={destroy}
                                            id={props.blog.id}
                                            tabIndex="-1"
                                            type="button"
                                            className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                            style={{textDecoration: 'none'}}
                                        >
                                            Delete
                                        </button>
                                        :""
                }
            </div>
        </div>
    );
};
export default BlogListItemIndex;