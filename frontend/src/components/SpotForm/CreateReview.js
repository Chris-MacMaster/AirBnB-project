//src/components/SpotForm/CreateSpot.js




// to do: must make a create review regular form 


import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux"
// import { makeSpot } from '../../store/spot';

import "./CreateSpot.css"
import { makeReview } from '../../store/review';

import { useParams } from 'react-router-dom';

import { useModal } from "../../context/Modal"


import "./CreateReview.css"


const ReviewForm = ({spotId}) => {
    const history = useHistory();
    const dispatch = useDispatch()

    const params = useParams()
    const { closeModal } = useModal()

    // const {spotId} = params

    // console.log("PARAMS", params)
    // console.log("SPOTID", spotId)



    // let url = window.location.href
    // let lastInURL = url[url.length - 1]

    // console.log(lastInURL)

  
    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault();

        //trying to be careful about data types
        const starsNum = parseInt(stars)


        if (review.length < 10) {
            window.alert("Review must be at least 10 characters")
            return
        }

        const newReview = {
            review,
            stars: starsNum
        }
        // console.log("FORM DATA", newReview)

        dispatch(makeReview(newReview, spotId))

        closeModal()

        // closeModal()

        // console.log("asd")
        // history.push("/spots/current")


        // INSERT MAKE REVIEW FIRING ROUTE AND ALL
        // const reviewResponse = dispatch(makeReview(newReview))
        // if (reviewResponse) {
        //     reset()
        //     history.push("/spots/current") //CHANGE TO SOMEWHERE, mayve nowwhere
        // }
    };

    const reset = () => {
        setReview('');
        setStars('');
    };


    const CreateTest = (e) => {
        e.preventDefault();

        dispatch(makeReview("sse"))
        // history.push(`/spots`);
    };

    return (
        <div>
            <form className='login-form' onSubmit={handleSubmit} >

                <div className='description-label'>
                    <p id='how-was-stay'>
                        How was your stay?
                    </p>
                
                </div>
                <textarea className='description-textarea'
                    placeholder='Just a quick review'
                    value={review}
                    onChange={(e) => {
                        setReview(e.target.value)
                    }}>

                </textarea>

                <div className='star-rating' >
                    
                    <label>
                        1
                        <input 
                        type="radio"
                        value={5}
                        onChange={(e) => {
                            setStars(e.target.value)
                        }}
                        className="input-1"
                        />
                        2
                    

                        <input
                            type="radio"
                            value={5}
                            onChange={(e) => {
                                setStars(e.target.value)
                            }}
                            className="input-2"
                        />
                        3

                        <input
                            type="radio"
                            value={5}
                            onChange={(e) => {
                                setStars(e.target.value)
                            }}
                            className="input-3"
                        />
                        4

                        <input
                            type="radio"
                            value={5}
                            onChange={(e) => {
                                setStars(e.target.value)
                            }}
                            className="input-4"
                        />
                        5

                        <input
                            type="radio"
                            value={5}
                            onChange={(e) => {
                                setStars(e.target.value)
                            }}
                            className="input-5"
                        />
                    </label>
                </div>

                

                {/* <div className=”rating”>
                    <input type=”radio” name=”rating” value=”5″ id=”5″><label for=”5″>☆</label>
                    <input type=”radio” name=”rating” value=”4″ id=”4″><label for=”4″>☆</label>
                    <input type=”radio” name=”rating” value=”3″ id =”3″> <label for=”3″>☆</label >
                  <input type=” radio” name=” rating” value=”2″ id =”2″> <label for=”2″>☆</label >
                <input type=” radio” name=” rating” value=”1″ id =”1″> <label for=”1″>☆</label >
                </div > */}


                <input className='submit-button modal-button button white-button create-review-button' type="submit" value="Create Review" />
            </form>
            

        </div>
    );
}

export default ReviewForm;