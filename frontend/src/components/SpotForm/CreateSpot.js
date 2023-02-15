//src/components/SpotForm/CreateSpot.js
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { makeSpot } from '../../store/spot';


const SpotForm = ({ report, formType }) => {
    const history = useHistory();
    const dispatch = useDispatch()


    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    //lat and lng optional?
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)


    // let 

    const handleSubmit = (e) => {
        e.preventDefault();

        const newSpot = {
            address,
            city,
            country,
            state,
            lat,
            lng,
            name,
            description,
            price
        }
        console.log("FORM DATA", newSpot)
        history.push("/spots/current")

        // const spotResponse = dispatch(makeSpot(newSpot))
        // if (spotResponse) {
            //     reset()
            //     history.push("/spots/current")
        // }
    };

    const reset = () => {
        setAddress('');
        setCity('');
        setCountry('');
        setState('');
        setLat('');
        setLng('');
        setName('');
        setDescription('');
        setPrice('');
    };


    const CreateTest = (e) => {
        e.preventDefault();

        dispatch(makeSpot("sse"))
        // history.push(`/spots`);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <h2>{formType}</h2>
                <label>
                    Country
                    <input type="text" />
                    
                </label>


                {/* <label>
                    Understanding
                    <input
                        type="text"
                        value={4}
                        // onChange={e => setUnderstanding(e.target.value)}
                    />
                </label>
                <label>
                    Improvement
                    <textarea
                        value={4}
                        // onChange={e => setImprovement(e.target.value)}
                    />
                </label> */}
                <input type="submit" value="Create Spot" />
            </form>
            <button onClick={CreateTest} type='button'>
                CreateSpotTest
            </button>

        </div>
    );
}

export default SpotForm;