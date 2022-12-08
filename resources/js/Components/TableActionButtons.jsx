import React, { Component } from 'react';
// import { Head, usePage, Link } from '@inertiajs/inertia-react';
// import Authenticated from '@/Layouts/AuthenticatedLayout';
// import { Inertia } from "@inertiajs/inertia";
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Routes, Route, useNavigate} from 'react-router-dom';
// import { extend } from 'jquery';
// import ViewModal from './Modals/ViewModal';

class TableActionButtons extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <>
            <div className="btn-group" role="group">
                <button type="button" 
                        className="btn btn-primary" 
                        data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Show
                </button>



                <ViewModal modal={this.props.rowId} />
                <button type="button" className="btn btn-info">Edit</button>
                <button type="button" className="btn btn-danger">Delete</button>
            </div>

            

            
            </>
      );
    }
}
export default TableActionButtons;

