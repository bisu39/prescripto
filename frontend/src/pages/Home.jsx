import React from 'react'
import Header from '../components/Header'
import SecialityMenu from '../components/SecialityMenu.jsx'
import TopDoctors from '../components/TopDoctors.jsx'
import Banner from '../components/Banner.jsx'

const Home = () => {
  return (
    <div>
      <Header/>
      <SecialityMenu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home
