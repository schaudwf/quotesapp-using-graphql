import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_MY_PROFILE } from '../gqloperations/queries'

export default function Profile() {
  const {loading,error,data}= useQuery(GET_MY_PROFILE)
  if(loading) return <h2>Profile is loading</h2>
  
  if(error){
    console.log(error)
  }

  return (
    <div className="container my-container">
      <div className='center-align'>
        <img className='circle' style={{border:"2px solid" , margin:"10px"}} src={`https://robohash.org/${data.myprofile.firstName}.png?size = 200x200`} alt='pic'/>
        <h5>{data.myprofile.firstName} {data.myprofile.lastName}</h5>
        <h5>{data.myprofile.email}</h5>
      </div>
      <h3>Your Quotes</h3>
      {
        data.myprofile.quotes.map(quo=>{
          return  <blockquote>
          <h6>{quo.name}</h6>
          
        </blockquote>
        })
      }
      
     
    </div>
  )
}
