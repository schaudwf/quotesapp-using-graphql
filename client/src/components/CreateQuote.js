import { useMutation } from '@apollo/client'
import React , {useState} from 'react'
import { CREATE_QUOTE } from '../gqloperations/mutation'
import {GET_ALL_QUOTES} from "../gqloperations/queries"


export default function CreateQuote() {
    const[quote,setQuote] = useState("")
    const [createQuote,{loading,error,data}]=useMutation(CREATE_QUOTE,{
      refetchQueries: [
        { query: GET_ALL_QUOTES },
        'getAllQuotes' // Correct format for refetching the query
      ],
    })
    const  handleSubmit=(e)=>{
        e.preventDefault()
        createQuote({
             variables:{
              name:quote
                         }
        })
    }
    if(loading) return <h1>Loading</h1>
    if(error){
      console.log(error.message)
    }
    if(data){
      console.log(data)
    }
  return (
    <div className="container my-container">
      {
      error &&
      <div className='red card-panel'>{error.message}</div>

    }
      
        <form onSubmit={handleSubmit}>
      <input
      type='text'
      value={quote}
      onChange={e=>setQuote(e.target.value)}
      placeholder='Write Your Quote Here'
      
      />
      <button className='btn green'>Create Quote</button>
      </form>
    </div>
  )
}
