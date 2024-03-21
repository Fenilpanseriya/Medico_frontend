import React, { useEffect ,useState} from 'react'
import Header from '../Header'
import { Box, HStack, Stack } from '@chakra-ui/react'
import ProfileSidebar from './ProfileSidebar'
import UserAccount from './UserAccount'
import Reports from './Reports'
import LabTests from './LabTests'
import UserAppointments from './UserAppointments'
import Medicines from './Medicines'
const UserProfile = ({url="/account"}) => {
    const [status,setStatus]=useState("logout")
    useEffect(()=>{
        setStatus(localStorage.getItem("status"))
    },[])

    
  return (
    <div style={{backgroundColor:"whitesmoke"}}>
        <Header status={status} setStatus={setStatus}/>
        <Stack direction={["column","row"]} padding={"1rem"} minHeight={"100vh"} height={"100%"} maxWidth={"1250px"} margin={"0 auto"} bgColor={"grey"}>
            <ProfileSidebar status={status}/>
            <Box width={"100%"} bgColor={"whitesmoke"}  height={"100%"}minHeight={"100vh"}>
                {
                    url==="/account" && <UserAccount/>
                }
                {
                    url==="/reports" && <Reports/>
                }
                {
                    url==="/labtests" && <LabTests/>
                }
                {
                    url==="/appointments" && <UserAppointments/>
                }
                {
                    url==="/medicines" && <Medicines/>
                }

            </Box>   
        </Stack>
    </div>
  )
}

export default UserProfile