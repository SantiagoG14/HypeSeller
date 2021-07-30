import React from 'react'
import PageIntro from './home-components/pageIntro'
import Collection from './home-components/collectionItems';
import Title from './home-components/title'
import NewArrivals from './home-components/newArrival';
const Home = ()=> {
    return(
        <>
            <PageIntro />
            <Title title="Our Collection" />
            <Collection />
            <Title title="New Heat" />
            <NewArrivals />
        </>
        
    )
}

export default Home

