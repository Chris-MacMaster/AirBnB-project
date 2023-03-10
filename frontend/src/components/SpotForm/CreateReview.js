//src/components/SpotForm/CreateSpot.js




// to do: must make a create review regular form 


import { useEffect, useState } from 'react';
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
  
    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")

    const [activeRating, setActiveRating] = useState(stars)

    const onChange = (number) => {
        setStars(number)
    }

    useEffect(() => {
        setActiveRating(stars)
    }, [stars])

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
        console.log("REVIEW FORM DATA", newReview)

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
                    placeholder='Leave your review here...'
                    value={review}
                    onChange={(e) => {
                        setReview(e.target.value)
                    }}>

                </textarea>

                {/* <div className='star-rating' >
                    
                    <label>
                        1
                        <input 
                        type="radio"
                        name='star-radio'
                        value={stars}
                        onChange={(e) => {
                            setStars(1)
                            console.log("TRIGGERED 1")
                        }}
                        className="input-1"
                        />
                        2
                    

                        <input
                            type="radio"
                            name='star-radio'
                            value={stars}
                            onChange={(e) => {
                                setStars(2)
                            }}
                            className="input-2"
                        />
                        3

                        <input
                            type="radio"
                            name='star-radio'
                            value={stars}
                            //maybe isnt needed, check
                            defaultChecked={true}
                            onChange={(e) => {
                                setStars(3)
                            }}
                            className="input-3"
                        />
                        4

                        <input
                            type="radio"
                            name='star-radio'
                            value={stars}
                            onChange={(e) => {
                                setStars(4)
                            }}
                            className="input-4"
                        />
                        5

                        <input
                            type="radio"
                            name='star-radio'
                            value={stars}
                            onChange={(e) => {
                                setStars(5)
                            }}
                            className="input-5"
                        />
                    </label>
                </div>

                 */}

                <div className="rating-input paw-stars">
                    <div onClick={() => onChange(1)} onMouseEnter={() => setActiveRating(1)} onMouseLeave={() => setActiveRating(stars)} className={activeRating < 1 ? "empty" : "filled"} >
                        <i className="fa fa-star"></i>
                    </div>
                    <div onClick={() => onChange(2)} onMouseEnter={() => setActiveRating(2)} onMouseLeave={() => setActiveRating(stars)} className={activeRating < 2 ? "empty" : "filled"} >
                        <i className="fa fa-star"></i>
                    </div>
                    <div onClick={() => onChange(3)} onMouseEnter={() => setActiveRating(3)} onMouseLeave={() => setActiveRating(stars)} className={activeRating < 3 ? "empty" : "filled"} >
                        <i className="fa fa-star"></i>
                    </div>
                    <div onClick={() => onChange(4)} onMouseEnter={() => setActiveRating(4)} onMouseLeave={() => setActiveRating(stars)} className={activeRating < 4 ? "empty" : "filled"} >
                        <i className="fa fa-star"></i>
                    </div>
                    <div onClick={() => onChange(5)} onMouseEnter={() => setActiveRating(5)} onMouseLeave={() => setActiveRating(stars)} className={activeRating < 5 ? "empty" : "filled"} >
                        <i className="fa fa-star"></i>
                    </div>
                </div>

                <input className='submit-button modal-button button white-button create-review-button' type="submit" value="Create Review" />
            </form>
            

        </div>
    );
}

export default ReviewForm;