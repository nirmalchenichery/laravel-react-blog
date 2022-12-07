import React from 'react';
import { Inertia } from "@inertiajs/inertia";
import 'bootstrap/dist/css/bootstrap.min.css';
import Moment from 'moment';
import {Link} from '@inertiajs/inertia-react';
import Modal from "@/Components/ModalCustomized";
import { useState } from "react";

const CommentList = (props) => {

    function destroy(e) {
        e.preventDefault()
        if (confirm("Are you sure you want to delete this record?")) {
            Inertia.delete(route('comment.destroy', e.currentTarget.id));
        }
    }

    return (
        <>
            <div className="mt-4">
                <div>

                    {
                        props.comment.user_id == props.user_id ?
                                                            <Link
                                                            tabIndex="1"
                                                            className="mx-1 px-4 py-2 text-sm text-white bg-green-500 rounded"
                                                            style={{textDecoration: 'none'}}
                                                            href={route('comment.edit', props.comment.id)}
                                                        >
                                                            Edit
                                                        </Link>
                                                      :""
                    }

                    {
                       props.comment.user_id == props.user_id ||  props.role === 'manager'? 
                                                        <button
                                                            onClick={destroy}
                                                            id={props.comment.id}
                                                            tabIndex="-1"
                                                            type="button"
                                                            className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                                        >
                                                            Delete
                                                        </button>
                                                      :""
                    }
                   

                </div>
                <div>
                    <small className="text-muted fs-8">{Moment(props.comment.created_at).format('YYYY-MM-DD')}</small>
                    <br/>
                    <p className="text-muted  text-gray-800 leading-tight border-bottom-black"> {props.comment.comment}</p>
                    
                </div>
                <div className="row"><br /></div>
            </div> 
        </>
    );
};
export default CommentList;