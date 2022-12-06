import React from 'react';
// import { Head, usePage, Link } from '@inertiajs/inertia-react';
// import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Inertia } from "@inertiajs/inertia";
import 'bootstrap/dist/css/bootstrap.min.css';

const BlogShowItem = (props) => {

    return (
        <table className="table table-bordered">
            <tbody>
                <tr>
                    <th scope="row">ID</th>
                    <td>{props.blog.id}</td>
                </tr>
                <tr>
                    <th scope="row">Language</th>
                    <td>{props.blog.language}</td>
                </tr>
                <tr>
                    <th scope="row">Title</th>
                    <td>{props.blog.title}</td>
                </tr>
                <tr>
                    <th scope="row">Description</th>
                    <td>{props.blog.description}</td>
                </tr>
                <tr>
                    <th scope="row">Content</th>
                    <td>{props.blog.content}</td>
                </tr>
                <tr>
                    <th scope="row">Author</th>
                    <td>{props.blog.author}</td>
                </tr>
                <tr>
                    <th scope="row">Author Image URL</th>
                    <td>{props.blog.author_image_url}</td>
                </tr>
                <tr>
                    <th scope="row">Image URL Portrait</th>
                    <td>{props.blog.image_url_portrait}</td>
                </tr>
                <tr>
                    <th scope="row">Image Url Landscape</th>
                    <td>{props.blog.image_url_landscape}</td>
                </tr>
                <tr>
                    <th scope="row">Display?</th>
                    <td>{props.blog.is_display}</td>
                </tr>
                <tr>
                    <th scope="row">Approved?</th>
                    <td>{props.blog.is_approved}</td>
                </tr>
                <tr>
                    <th scope="row">Posted Date</th>
                    <td>{props.blog.posted_at}</td>
                </tr>
            </tbody>
        </table>

    );
};
export default BlogShowItem;