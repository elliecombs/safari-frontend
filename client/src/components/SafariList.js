//Displays below renders data from database 
import axios from 'axios';
import {React, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import DeleteButton from './Delete';

const SafariList = (props) => {
    const {safariList, removeFromDom, setSafariList} = props;
    const [loaded, setLoaded] = useState(false); 
      //Get Safaris List
    useEffect(()=>{
    axios.get("http://localhost:8000/api/safari")
    .then((res)=>{
      // console.log('All the safaris', res);
      // console.log('res.data', res.data);
    setSafariList(res.data);
    setLoaded(true);
    })
    .catch((err)=>{
        console.log(err);
    })
}, []);
    // console.log('safariList in safariList!', safariList );
    return (
            <div>
                <h1>My Safari</h1>
                <Link to = {'/safari/create'}>Add a Safari Animal</Link>
<div style={{display: 'flex', justifyContent: 'center'}} className="nes-table-responsive is-centered">
    <table class="nes-table is-bordered is-centered">
        <thead>
        <tr>
            <th>Animal</th>
            <th>Number</th>
            <th>Location</th>
            <th>Description</th>
            <th>Action</th>
        </tr>
        </thead>
    <tbody>{
                loaded? 
                safariList.map((safari, index)=>{
                return (
                <tr key={index}>
                <td>
                    {safari.animal}
                </td>
                <td>
                    {safari.number}
                </td>
                <td>
                    {safari.location}
                </td>
                <td>
                    {safari.description}
                </td>
                <td>
                    <Link key={index} to={`/safari/show/${safari._id}`}>Details</Link>                
                    <DeleteButton safariId = {safari._id} successCallBack = {() => removeFromDom(safari._id)}  />
                    <Link key={index} to={`/safari/update/${safari._id}`}>Edit</Link>
                </td>
                </tr>
                )})
                : null
            }
            </tbody>
    </table>
</div>
        </div>
    )
}

export default SafariList;