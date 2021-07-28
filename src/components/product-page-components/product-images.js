import React from 'react'



const Picture = (props) => {

    return(
        <img src={props.image} alt="" class="display-image" />
    )
}

const PictureDisplay = (props) => {
    const images = props.images
    return(
        <section className="image__display">
            {
            images.map(image =>(
                <Picture image={image}/> 
            ))
            }   
        </section>
    )
}


export default PictureDisplay
