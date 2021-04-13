import React from 'react';
import '../App.css';
import {Box,Heading} from 'grommet';
import {Like} from 'grommet-icons';

function Thank(props) {
   

    return (
        <>
            <Box fill justify="center" align="center" >
            <Box width="60%"  direction="column" className="ques" justify="center" align="center" height={{max:"auto",min:"350px"}} background="white" >
                <Heading color="#4A164B" level="1"  > <Like color="orange" size="large" /> Thank You !!</Heading>
            </Box>
            </Box>
        </>
    )
}
export default Thank;