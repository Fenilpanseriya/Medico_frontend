import { Button, Stack } from '@chakra-ui/react'
import React from 'react'


const TimeSlots = ({timeslots=[],handleClick}) => {
  return (
    <Stack direction={"row"} flexWrap={"wrap"} spacing={"1rem"} >
        {
            timeslots.map((timeslot)=>(
               
                    <Button id={timeslot.label}  variant={"outline"} colorScheme='blue' onClick={handleClick}>
                        {timeslot.label}
                    </Button>
                
                
            ))
        }
    </Stack>
  )
}

export default TimeSlots