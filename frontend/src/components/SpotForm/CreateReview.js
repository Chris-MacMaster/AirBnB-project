//src/components/SpotForm/CreateSpot.js




// to do: must make a create review regular form 


import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux"
// import { makeSpot } from '../../store/spot';

import "./CreateSpot.css"
import { makeReview } from '../../store/review';

import { useParams } from 'react-router-dom';


const ReviewForm = ({spotId}) => {
    const history = useHistory();
    const dispatch = useDispatch()

    const params = useParams()

    // const {spotId} = params

    console.log("PARAMS", params)
    console.log("SPOTID", spotId)



    // let url = window.location.href
    // let lastInURL = url[url.length - 1]

    // console.log(lastInURL)

  
    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault();

        //trying to be careful about data types
        const starsNum = parseInt(stars)

        const newReview = {
            review,
            stars: starsNum
        }
        console.log("FORM DATA", newReview)

        dispatch(makeReview(newReview, spotId))

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
            <form onSubmit={handleSubmit} >

                <div className='description-label'>
                    <p>
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
                        <input
                        type="radio"
                        value={5}
                        onChange={(e) => {
                            setStars(e.target.value)
                        }}
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


                
                



                <input className='submit-button' type="submit" value="Create Review" />
            </form>
            {/* <button onClick={CreateTest} type='button'>
                EditReviewTest
            </button> */}

        </div>
    );
}

export default ReviewForm;