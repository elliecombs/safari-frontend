//Add Page
//Form to enter in the safaris 
// {} = destructing and [ ] = is used for setting state
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Safari = (props) => {
    //Using props we can update and edit 
    const { safari, isUpdate, onSubmitProps, setSafariList, setErrors, safariList, errors} = props
    const [safariAnimal, setSafariAnimal] = useState(safari?.animal ?? '');
    const [safariNumber, setSafariNumber] = useState(safari?.safariNumber ?? '')
    const [safariLocation, setSafariLocation] = useState(safari?.safariLocation ?? '')
    const [description, setDescription] = useState(safari?.description ?? '')

    const navigate = useNavigate();
    const onSubmitHandler = (e) => {
        //Prevent default behavior of the submit
        e.preventDefault();
        if(isUpdate) {
            //Update safari 
            onSubmitProps({
                animal: safariAnimal,
                number: safariNumber,
                location: safariLocation,
                description: description,
            })
        }
        else{
            //Create Safari
            createSafari();
        }
    }

    //Create Safari 
    const createSafari = () => {
        console.log('From Home', safariAnimal, description)
        axios
            //argument: Route we are posting to
            .post(`http://localhost:8000/api/safari`, {
                //argument: Data we are posting to
            animal: safariAnimal,
            number: safariNumber,
            location: safariLocation,
            description: description,
            })
            .then((res) => {
                console.log("CreateSafari", res.data);
                //Spread operator 
                setSafariList([...safariList, res.data]);
                setSafariAnimal('');
                navigate('/');
            })
            .catch((err) => {
                console.log("==> error", err)
                setErrors(err.response.data.error.errors)
            })
    };
    console.log('errors array in create', errors);
    return (
        <div>
            <h1>My Safari</h1>
            
            {isUpdate ? null :<h3>Add a Safari Animal:</h3>}
            
        <form onSubmit={onSubmitHandler}>
            <div>
            {errors ? Object.keys(errors).map ((key, index) => <p key = {index} >{errors[key].message}</p>): null}
                <p>
                    <label>Animal:</label>
                    <input type="text" value={safariAnimal} name="name" onChange = {(e)=> setSafariAnimal(e.target.value)}/>
                </p>
                <p>
                    <label>Number of Animals:</label>
                    <input type="number" value={safariNumber} name="number" onChange = {(e)=> setSafariNumber(e.target.value)}/>
                </p>
                <p>
                    <label>Location:</label>
                    <input type="text" value={safariLocation} name="name" onChange = {(e)=> setSafariLocation(e.target.value)}/>
                </p>
                <p>
                    <label>Description:</label>
                    <input type="text" value={description} name="name" onChange = {(e)=> setDescription(e.target.value)}/>
                </p>
            </div>
        {/* ternary or if else statement (react return statement use ternary only) */}
            <input value={isUpdate ? "Update Safari" : "Add Safari"} type="submit"/>
        </form>
        <div><Link to={'/'}>Back to Home</Link></div>
        </div>
        
    );
};

export default Safari;