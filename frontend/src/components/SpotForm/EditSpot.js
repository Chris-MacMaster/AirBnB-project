//src/components/SpotForm/CreateSpot.js
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { editSpot, makeSpot } from '../../store/spot';
import { fetchOneSpot } from '../../store/spot';

import "./CreateSpot.css"
import "./EditSpot.css"


const EditSpotForm = ({ report, formType }) => {
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


    const urlArr = window.location.href.split("/")
    const spotId = urlArr[urlArr.length - 1]


    //get spot ID
    useEffect(() => {
        const fillFeilds = async () => {
            let spotInfo = await dispatch(fetchOneSpot(spotId));

            console.log(spotInfo)
            setCountry(spotInfo.country)
            setAddress(spotInfo.address)
            setCity(spotInfo.city)
            setState(spotInfo.state)
            
            setLat(spotInfo.lat)
            setLng(spotInfo.lng)

            setName(spotInfo.name)
            setDescription(spotInfo.description)
            setPrice(spotInfo.price)

            // setCountry(spotInfo.country)
            // setTitle(spotInfo.name)
        }
        fillFeilds()
    }, [dispatch]);


    const handleSubmit = (e) => {
        e.preventDefault();

        //trying to be careful about data types
        let latNum = parseInt(lat)
        let lngNum = parseInt(lng)
        let priceNum = parseInt(price)



        // const id = window


        const editedSpot = {
            spotId,
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
        console.log("FORM DATA", editedSpot)

        // if (dispatch(editSpot(editedSpot)) === true) {
            history.push(`/spots/${spotId}`)
        // }

        

        // history.push("/spots/current")

        //**CHANGE TO EDIT SPOT */
        // console.log("asd")
        // history.push("/spots/current")

        // const spotResponse = dispatch(makeSpot(editedSpot))
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


    const EditTest = (e) => {
        e.preventDefault();
        // console.log(spotId)

        dispatch(editSpot({
            spotId
        }))
        history.push(`/spots`);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <h2>{formType}</h2>
                <div className='edit-intro-div'>
                    <p id='update-your-spot'>
                        Update your Spot
                    </p>
                    <p id='where-place'>
                        Where's your place located?
                    </p>
                    <p id='only-booked'>
                        Guests will only get your exact address once they booked a reservation.
                    </p>
                </div>
                <div className='country-address-div'>
                    <label className='country-label' >
                        Country
                        <input className='country-input' type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder='Country' />
                    </label>

                    <label className='address-label'>
                        Street Address
                        <input className='address-input' type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='Address' />
                    </label>
                </div>


                <div className='city-state-div'>
                    <label id='city-input-label'>
                        City
                        <input className='city-input' type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder='City' />
                    </label>

                    <p className='comma'>
                        ,
                    </p>

                    <label id="state-input-label">
                        State
                        <input className='state-input' type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder='State' />
                    </label>

                </div>


                <div className='lat-lng-div'>
                    <label>
                        Latitude
                        <input className='lat-input' type="text"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            placeholder='Latitude' />
                    </label>

                    <p className='comma'>
                        ,
                    </p>



                    <label>
                        Longitude
                        <input className='lng-input' type="text"
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            placeholder='Longitude' />
                    </label>

                </div>

                <div className='description-label'>
                    <p id='describe-to-guests'>
                        Describe your place to guests
                    </p>
                    <p className='desc-text mention-text'>
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
                    <p className='desc-text'>
                        Catch guests' attention with a spot title that
                        highlights what makes your place special.
                    </p>
                </div>


                <input className='name-input' type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name of your spot' />


                <div className='price-label'>
                    <p className='set-base-price'>
                        Set a base price for your spot
                    </p>
                    <p className='desc-text comp-pricing'>
                        Competitive pricing can help your listing stand out and rank
                        higher in search results.
                    </p>
                </div>


                <div className='price-div'>
                    <p className='dollar comma'>
                        $
                    </p>

                    <input className='price-input' type="text"
                        value={price}
                        onChange={(e) => {
                            setPrice(e.target.value)
                        }}
                        placeholder='Price per night (USD)' />


                </div>

                <input className='submit-button modal-button button edit-button' type="submit" value="Update your Spot" />
            </form>

        </div>
    );
}

export default EditSpotForm;