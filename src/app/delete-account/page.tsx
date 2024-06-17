'use client'
import DialogBox from '@/components/DialogBox'
import { Button, Input, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [isError, setIsError] = useState(false)
  const router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsError(false)
    setPhoneNumber(e.target.value)
  }
  const handleSubmit = async () => {
    try {
      if (phoneNumber.length != 10) {
        setIsError(true)
        return
      }

      const response = await axios.post('https://stocksmentor-d4244.el.r.appspot.com/users/deleteUser', { phoneNumber })
      setOpenDialog(true)
      console.log(response.data)
      setOpenDialog(true)
    } catch (error) {}
  }

  return (
    <div className='pt-32  pb-6 delete-page px-6  font-sans sm:px-[10%] md:px-[20%] lg:px-[20%] h-screen'>
      <div className='font-sans   leading-[24px] text-xl font-semibold mx-auto text-center pb-4'>Delete My Account</div>
      <div className='flex justify-center flex-col gap-6 pt-6 px-6 lg:px-[20%]'>
        {/* <Input onChange={handleChange} /> */}
        <TextField
          type='number'
          error={isError}
          InputProps={{
            style: { color: 'white' }, // Change 'red' to your desired color
          }}
          name='Phone Number'
          // value={createCallData.stockName}
          onChange={handleChange}
          label='Phone Number'
          placeholder='Enter Phone Number'
          id='outlined-basic'
          variant='outlined'
          sx={{
            '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },

            '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
              color: 'white',
            },
            '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
              color: '#008f6b',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#008f6b',
              },
            },
            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#008f6b',
            },

            '& .css-mg49gn-MuiFormControl-root-MuiTextField-root': {
              width: '100%',
            },
            '& .css-1m0k0mb-MuiFormLabel-root-MuiInputLabel-root': {
              color: 'white',
            },
            '& .css-exojdm-MuiFormLabel-root-MuiInputLabel-root': {
              color: 'white',
            },
          }}
        />
        {isError && <h1 className='text-red-600 mt-[-8px]'>Invalid Phone Number</h1>}
        <Button variant='contained' style={{ backgroundColor: '#008f6b' }} onClick={handleSubmit}>
          Submit
        </Button>

        <Modal
          open={openDialog}
          onClose={() => {
            setOpenDialog(false)
          }}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <div className='flex flex-col justify-center items-center bg-[#212429] p-4 rounded-md w-[80%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] gap-4 max-w-sm'>
            <Typography id='modal-modal-title' className='font-bold' variant='h6' component='h2'>
              Success
            </Typography>
            <Typography id='modal-modal-description' className='text-center pb-4'>
              Request posted successfully. Your account will be deleted in few hours.
            </Typography>
            <Button
              variant='contained'
              className='w-[50%]'
              style={{ backgroundColor: '#008f6b' }}
              onClick={() => {
                setOpenDialog(false)
                router.push('/')
              }}
            >
              Close
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Page
