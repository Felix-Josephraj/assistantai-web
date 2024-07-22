'use client'
import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {
  const baseUrl = 'https://gptai-kltryxbqkq-el.a.run.app'
  // const baseUrl = 'http://192.168.29.7:8080'
  const [userDetails, setUserDetails] = useState<{ id: string; createdAt: string }[]>([])
  const [paymentDetails, setPaymentDetails] = useState(true)
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users/getUserAnalytics`)
      console.log(response.data)
      setUserDetails(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchPaymentDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users/getPaymetAnalytics`)
      console.log(response.data)
      setUserDetails(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  return (
    <div className='p-4'>
      <Button
        variant='contained'
        // className='w-[50%]'
        style={{ backgroundColor: '#008f6b' }}
        onClick={() => {
          // setOpenDialog(false)
          // router.push('/')
          if (paymentDetails) {
            fetchPaymentDetails()
          } else {
            fetchUserDetails()
          }
          setPaymentDetails((prev) => !prev)
        }}
      >
        {paymentDetails ? 'Payment Details' : 'User Details'}
      </Button>
      {userDetails.map(({ createdAt, id }) => {
        return (
          <div key={id} className='flex flex-row gap-3 pt-4'>
            <div>{id}</div>
            <div>{createdAt}</div>
          </div>
        )
      })}
    </div>
  )
}

export default page
