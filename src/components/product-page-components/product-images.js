import React from 'react'



const Picture = (props) => {

    return(
        <img src={props.image} alt="" className="display-image" />
    )
}

const PictureDisplay = (props) => {
    const images = props.images
    return(
        <section className="image__display">
            {
            images.map((image, index) =>(
                <Picture image={image} key={index}/> 
            ))
            }   
        </section>
    )
}


export default PictureDisplay
