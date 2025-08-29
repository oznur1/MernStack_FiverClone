import React from 'react'
import Rating from '../../components/card/rating'

const GigInfo = ({ gig }) => {
    return (
        <div>


            {/* gig hakkında bilgiler */}
            <div className="w-full h-[30vh]">
                <img src={gig.coverImage} className='object-contain h-full w-full' />
            </div>

            <h1 className='text-3xl font-semibold'>{gig.title}</h1>

            <Rating rating={gig.starCount} reviews={gig.reviewCount} />

            {/* resim galerisi */}
        </div>
    )
}

export default GigInfo