import React from 'react';
import { Head, usePage, Link } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Inertia } from "@inertiajs/inertia";
import 'bootstrap/dist/css/bootstrap.min.css';

const TrendingListItem = (props) => {

    return (
        <div key={props.trending.id} className="card p-0 mt-4 small-card " >
           <img src="https://picsum.photos/350/160" className="w-100 h-100 card-img trending" />
            <div className="card-img-overlay">
                <h5 className="card-title">{props.trending.title}</h5>
                <p className="card-text">{props.trending.posted_at}</p>
            </div>
        </div>   
    );
};
export default TrendingListItem;
