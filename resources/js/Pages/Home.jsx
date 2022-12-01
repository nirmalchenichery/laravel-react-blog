import { Link, Head,usePage } from '@inertiajs/inertia-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState} from "react";
import { Inertia } from "@inertiajs/inertia";
import BlogListItem from '@/Components/BlogListItem';
import TrendingListItem from '@/Components/TrendingListItem';
import Pagination from '@/Components/Pagination';

export default function Home(props) {
    
    const { blogs } = usePage().props;
   
    console.log(blogs);


    const blog_list = blogs.data.map( (blog, index) => {
        return <BlogListItem key={index} blog={blog}/>
    });

    const trending_list = blogs.data.map( (trending, index) => {
        return <TrendingListItem key={index} trending={trending}/>
    })

    return (
        <>
            <Head title="Home" />
            <div className="bg-light">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link href={route('dashboard')} className="text-sm text-gray-700 dark:text-gray-500 underline">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm text-gray-700 dark:text-gray-500 underline fw-lighter fs-2 ">
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ml-4 text-sm text-gray-700 dark:text-gray-500 underline fw-lighter fs-2"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
                
                <div className="container ps-5 pe-5">
                    <div className="row">
                        <div className="col-12 p-2 text-center mt-4 mb-4 border-bottom-black">
                            <h1 className="fw-bolder fs-1">Welcome to my blog!</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae dui et nunc ornare vulputate non
                            fringilla massa.</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8 col-12"> 
                            {blog_list}               
                        </div>

                        <div className="col-lg-1 col-0"></div>
                        
                        <div className="col-lg-3 col-12 mt-5 ps-lg-4">
                            <div className="col-12 pb-4 g-0 border-bottom-black">
                                <p className="text-muted fs-5">What's Trending</p>   
                                {trending_list}
                            </div>
                        </div>
                        <Pagination class="mt-6" links={blogs.links} />
                    </div>
                </div>
            </div>
        </>
    );
}
