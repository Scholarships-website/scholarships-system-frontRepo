import React, { useContext } from 'react'
import './Home.css'
import { UserContext } from '../../../Context/UserContext';

export default function Home() {
  let { userToken, setUserToken, userData } = useContext(UserContext);
  return (
    <>
      {/* <h1 className='ps-3 pt-3 pb-3 mt-3'><span className='border border-2 p-2 border-primary-subtle border'>Welcome "{userData.firstName} {userData.lastName}"</span></h1> */}
      <div className="image-container">
      <iframe src="https://lottie.host/embed/7eb9c883-adbb-4fdb-94c6-a697e64b8f54/jZjKY4SR6q.json" width="500px" height="500px" />
      </div>
    </>
  )
}