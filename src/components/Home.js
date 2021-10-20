import React from 'react'
import AddTrans from './AddTrans'
import TransHist from './TransHist'

const Home = () => {
    return (
        <div className="my-6">
            <AddTrans/>
            <hr/>
            <TransHist/>
        </div>    
    )
}

export default Home
