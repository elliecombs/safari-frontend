import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Show = (props) => {
    const [safari, setSafari] = useState([]);
    //Mystery Code
    // const [safari, setSafari] = useState(null);
    // const {safariList, removeFromDom} = props;

    useEffect(()=>{
        axios.get("http://localhost:8000/api/safari")
        .then((res)=>{
          // console.log('All the safaris', res);
          // console.log('res.data', res.data);
        setSafari(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, []);

    return (
        <div>
            <h1>My Safari</h1>
            {/* {safari && Object.keys(safari).map((k, index) => <div key={index}> */}
            {safari.map((oneSafari)=> (
                <div key = {oneSafari._id} className="nes-container with-title is-centered">
                    <p className="title">Animal:{oneSafari.animal}</p>
                    <p>Number:{oneSafari.number}</p>
                    <p>Location:{oneSafari.location}</p>
                    <p>Description{oneSafari.description}</p>
                </div>
            ))}
            <Link to={'/'}>Back to Home</Link>
            <div>
            <input className="nes-btn is-success is-centered" type='file'/>
            </div>
        </div>
    )
}

export default Show;