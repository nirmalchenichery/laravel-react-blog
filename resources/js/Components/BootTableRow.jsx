import React, { Component } from 'react';
import { Inertia } from "@inertiajs/inertia";
import 'bootstrap/dist/css/bootstrap.min.css';
import TableActionButtons from '@/Components/TableActionButtons'; 

class BootTableRow extends Component{

    constructor(props){
        super(props);
    }

    render(){

        return (
            
            <tr>
                <th>{this.props.data.id}</th>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.email}</td>
                <td>
                    <TableActionButtons rowId={this.props.data.id}/>
                </td>
            </tr>
         
      );

    }
}
export default BootTableRow;