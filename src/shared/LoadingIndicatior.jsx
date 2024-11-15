import { CircularProgress } from '@mui/material'
import React from 'react'
import { useIsFetching } from 'react-query'

export const LoadingIndicatior = () => {

  const fetching = useIsFetching();
  console.log('fetching : ', fetching);

  return (
    <div className='w-full h-full fixed top-0 left-0 opacity-50 bg-black z-[999]'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <CircularProgress />
      </div>
    </div>

  )
}
