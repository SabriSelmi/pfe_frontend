import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
<div>
<Header></Header>
  {/* banner part start*/}
<Outlet></Outlet>
  {/*::footer_part end::*/}
</div>



  )
}

export default Home
