import React from 'react';
import { Inertia } from "@inertiajs/inertia";
import 'bootstrap/dist/css/bootstrap.min.css';
import Moment from 'moment';

const CommentList = (props) => {
    return (
        <>
            <div className="mt-4">
                <small className="text-muted fs-8">{Moment(props.comment.created_at).format('YYYY-MM-DD')}</small>
                <br/>
                <p className="text-muted  text-gray-800 leading-tight border-bottom-black"> {props.comment.comment}</p>
            </div> 
           
        </>

    );
};
export default CommentList;