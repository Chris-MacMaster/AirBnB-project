//src/components/SpotForm/CreateSpot.js
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { makeSpot } from '../../store/spot';

import "./CreateSpot.css"


const SpotForm = ({ report, formType }) => {
    const history = useHistory();
    const dispatch = useDispatch()


    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    //lat and lng optional?
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    const [previewUrl, setPreviewUrl] = useState("")
    const [url1, setUrl1] = useState("")
    const [url2, setUrl2] = useState("")
    const [url3, setUrl3] = useState("")
    const [url4, setUrl4] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault();

        //trying to be careful about data types
        let latNum = parseInt(lat)
        let lngNum = parseInt(lng)
        let priceNum = parseInt(price)


        const newSpot = {
            address,
            city,
            country,
            state,
            lat: latNum,
            lng: lngNum,
            name,
            description,
            price: priceNum
        }
        console.log("FORM DATA", newSpot)
        // console.log("asd")
        // history.push("/spots/current")

        const spotResponse = dispatch(makeSpot(newSpot))
        if (spotResponse) {
                reset()
                history.push("/spots/current")
        }
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
                <div className='country-address-div'>
                    <label className='country-label' >
                        Country
                        <input className='country-input' type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)} 
                        placeholder='Country'/>
                    </label>

                    <label className='address-label'>
                        Address
                        <input className='address-input' type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} 
                            placeholder='Address'/>
                    </label>
                </div>


                <div className='city-state-div'>
                    <label>
                        City
                        <input className='city-input' type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)} 
                            placeholder='City'/>
                    </label>

                    <label>
                        State
                        <input className='state-input' type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)} 
                            placeholder='State'/>
                    </label>

                </div>


                <div className='lat-lng-div'>
                    <label>
                        Latitude
                        <input className='lat-input' type="number"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)} 
                            placeholder='Latitude'/>
                    </label>

                    <label>
                        Longitude
                        <input className='lng-input' type="number"
                            value={lng}
                            onChange={(e) => setLng(e.target.value)} 
                            placeholder='Longitude'/>
                    </label>

                </div>

                <div className='description-label'>
                    <p>
                        Describe your place to guests
                    </p>
                    <p>
                        Mention the best features of your space, any special amenities like 
                        fast wifi or parking, and what you love about the neighborhood. 
                    </p>
                </div>


                <textarea className='description-textarea'
                placeholder='Please write at least 30 characters'
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value)
                }}>

                </textarea>

                <div className='title-label'>
                    <p >
                        Create a title for your spot
                    </p>
                    <p>
                        Catch guests' attention with a spot title that 
                        highlights what makes your place special.
                    </p>
                </div>


                <input className='name-input' type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name of your spot' />


                <div className='price-label'>
                    <p>
                        Set a base price for your spot
                    </p>
                    <p>
                        Competitive pricing can help your listing stand out and rank
                        higher in search results.
                    </p>
                </div>


                <div className='price-div'>
                    <p className='dollar'>
                        $
                    </p>

                    <input className='price-input' type="number"
                        value={price}
                        onChange={(e) => {
                            setPrice(e.target.value)
                        }}
                        placeholder='Price per night (USD)' />


                </div>



                <div className='urls-label'>
                    <p>
                        Liven up your spot with photos
                    </p>
                    <p>
                        Submit a link to at least one photo to bublish your spot.
                    </p>
                </div>

                <div className='urls'>
                    <input className='image-url' type="text" 
                    value={previewUrl}
                    onChange={(e) => {
                        setPreviewUrl(e.target.value)
                    }}
                        placeholder='Preview Image URL'
                    />

                    <input className='image-url' type="text"
                        value={url1}
                        onChange={(e) => {
                            setUrl1(e.target.value)
                        }}
                        placeholder='Image URL'
                    />

                    <input className='image-url' type="text"
                        value={url2}
                        onChange={(e) => {
                            setUrl2(e.target.value)
                        }}
                        placeholder='Image URL'
                    />

                    <input className='image-url' type="text"
                        value={url3}
                        onChange={(e) => {
                            setUrl3(e.target.value)
                        }}
                        placeholder='Image URL'
                    />

                    <input className='image-url url4' type="text"
                        value={url4}
                        onChange={(e) => {
                            setUrl4(e.target.value)
                        }}
                        placeholder='Image URL'
                    />
                </div>


                <input className='submit-button' type="submit" value="Create Spot" />
            </form>
            <button onClick={CreateTest} type='button'>
                CreateSpotTest
            </button>

        </div>
    );
}

export default SpotForm;