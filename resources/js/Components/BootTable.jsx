import React, { Component } from 'react';
// import { Head, usePage, Link } from '@inertiajs/inertia-react';
// import Authenticated from '@/Layouts/AuthenticatedLayout';
// import { Inertia } from "@inertiajs/inertia";
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Routes, Route, useNavigate} from 'react-router-dom';
// import { extend } from 'jquery';
import axios from 'axios';

import BootTableRow from '@/Components/BootTableRow'; 

class BootTable extends Component{

    constructor(props){
        super(props);
        this.state = {
            users: [],
        }
    }

    componentDidMount(){
        this.getUserList();
    }

    getUserList = () =>{
        let self = this;
        axios.get('/userlist').then(function(response) {
            self.setState({
                users : response.data
            });
            // console.log(response.data);
        })
    }

    render(){

        return (
            <>
             <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col" width="100px">#</th>
                        <th scope="col" width="100px">Name</th>
                        <th scope="col" width="100px">Email</th>
                        <th scope="col" width="100px">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.users.map(function(user,index){
                            return <BootTableRow key={index} data={user}/>
                        })
                    }
                </tbody>
              </table>   
          </>
      );

    }
}

export default BootTable;