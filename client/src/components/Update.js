import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";
import Form from './Form';

const Update = (props) => {
    const {setSafariList, errors, setErrors} = props;
    const { id } = useParams(); 
    const [, setName] = useState("");
    const [safari, setSafari] = useState(null)
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    const [safariAnimal, setSafariAnimal] = useState(safari?.animal ?? '');
    const [safariNumber, setSafariNumber] = useState(safari?.safariNumber ?? '')
    const [safariLocation, setSafariLocation] = useState(safari?.safariLocation ?? '')
    const [description, setDescription] = useState(safari?.description ?? '')

    useEffect( () => {
        axios.get(`http://localhost:8000/api/safari/${id}`)
        .then(res => {
            setSafariAnimal(res.data.animal);
            setSafariNumber(res.data.number);
            setSafariLocation(res.data.location);
            setDescription(res.data.description);
            // console.log('Safari to update', res.data);

            setSafari(res.data);
            setLoaded(true);
        })
        .catch(err => console.log(err));
    }, [id]);

    const updateSafari = (event) => {
        event.preventDefault();
        // form upsets -> form submission event
        // event.preventDefault() => stops page from refreshing
        // event.target => the event object where the event occurs on (this would be the form) form has all your input fields
        // normally to access your inputs you would have to do event target[]
        axios.put('http://localhost:8000/api/safari/' + id, {
            animal: safariAnimal, 
            number: safariNumber,
            location: safariLocation,
            description: description,
        })
            .then(res => {
                console.log(res.data);
                navigate("/"); // this will take us back to the Main.js
            })
            .catch((err) => {
                console.log('set errors update', err.response);
                setErrors(err.response.data.error.errors);
                })
    }
    console.log('errors array', errors);
    return (
        <div>
            <h1>Edit </h1>
            <form onSubmit={updateSafari}>
            <div>
            {errors ? Object.keys(errors).map ((key, index) => <p key = {index} >{errors[key].message}</p>): null}
                <p>
                    <label>Animal:</label>
                    <input type="text" value={safariAnimal} name="animal" onChange = {(e)=> setSafariAnimal(e.target.value)}/>
                </p>
                <p>
                    <label>Number of Animals:</label>
                    <input type="text" value={safariNumber} name="numberOfAnimals" onChange = {(e)=> setSafariNumber(e.target.value)}/>
                </p>
                <p>
                    <label>Location:</label>
                    <input type="text" value={safariLocation} name="location" onChange = {(e)=> setSafariLocation(e.target.value)}/>
                </p>
                <p>
                    <label>Description:</label>
                    <input type="text" value={description} name="description" onChange = {(e)=> setDescription(e.target.value)}/>
                </p>
            </div>
            <button type="submit">Save Changes</button>
        </form>
            {/* {errors?.name? <span>{ errors.name.message }</span>: null}
            { loaded && <Form onSubmitProps = {updateSafari} initialName={safari} safari={name} errors = {errors} isUpdate = {true} /> } */}
        </div>
    )
}

export default Update;