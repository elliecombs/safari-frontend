import React from 'react';
import axios from 'axios';

const DeleteButton = props => {
    const { safariId, successCallBack } = props;
    const deleteSafari = (e) => {
        axios.delete(`http://localhost:8000/api/safari/${safariId}`)
        .then( () => successCallBack())
        .catch(err => console.log(err))
    }
    return(
        <button onClick={ deleteSafari }>Delete</button>
    )
}

export default DeleteButton;