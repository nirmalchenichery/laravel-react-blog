// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react';
import React, { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Moment from 'moment';
import BlogShowDetail from '@/Components/BlogShowDetail';
import BlogTitle from '@/Components/BlogTitle';
import axios, { Axios } from 'axios';
import CommentList from '@/Components/CommentList';

export default function ShowBlog(props) {
    
    const { data, setData, post, errors,reset } = useForm({
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
        comment :""

    });
    
    // const [showModal, setShowModal] = useState(false);

    const [commentList, setcommentList] = useState([]);

    async function comment(id){
        const response = await axios.get('/commentlist/' + id);
        if (response.data.comments){
            setcommentList(response.data.comments);
        }
        // const response = await axios.get('/comment',{
        //     params: {
        //         id: 1
        //     }
        // });
    }

    // function showComments(id) {
    //     // console.log("sss");
    //     setShowModal(true);
    //     // // comment(id);
    // }



    useEffect(() => {
        comment(data.id);
    }, []);

    const comment_list = commentList.map( (comment, index) => {
        return <CommentList key={index} comment={comment} role={props.auth.user.role} user_id = {props.auth.user.id}/>
    })

    const submit = (e) => {
        e.preventDefault();
        post(route('comment.store'));
    };

    return (
        <>
            <Head title="Blog" />
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
                    <BlogTitle />

                    <div className="row">
                        <BlogShowDetail blog={data} />
                    </div>

                    {/* <button
                        className="px-4 py-2 text-purple-100 bg-purple-600 rounded-md"
                        type="button"
                        onClick={() => {
                            showComments(data.id);
                        }}
                    >
                        Show Comments
                    </button> */}


                    <div className="row">
                        <form onSubmit={submit}>
                            <div className="p-2 mt-4 mb-4">
                                <h1 className="mx-1 px-4 py-2 text-sm text-white bg-orange-400 rounded">Comments</h1>
                                <textarea
                                    type="text"
                                    className="p-2 mt-4 mb-4 w-full rounded"
                                    label="content"
                                    name="content"
                                    errors={errors.comment}
                                    value={data.comment}
                                    onChange={(e) =>
                                        setData("comment", e.target.value)
                                }
                                />
                                {errors.comment && <span className="border-red-500 p-3 text-red-600">
                                                {errors.comment}
                                           </span>
                                }
                                <button
                                    type="submit"
                                    className="px-6 py-2 font-bold text-white bg-slate-600 rounded"
                                >
                                    Post Comment
                                </button>
                                {props.auth.user ?"": <small className="text-muted fs-8  text-red-600">    Login to Post the comments</small>}
                            </div>
                        </form>

                        <div className="row">
                            {comment_list}
                        </div>


                        {/* <div className='row'>
                            {showModal && 
                                <Modal 
                                OpenOrShowModal={setShowModal} 
                                title="Comments" 
                                btnOk ="OK"
                                btnClose="Close"
                                content="Nirmal TexT"
                            />
                            }
                        </div> */}

                        
                    </div>  
                </div>
            </div>
        </>
    );
}
