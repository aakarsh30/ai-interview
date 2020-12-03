import React,{useState} from 'react';
import './App.css';
import {Box,Text,Heading,Button} from 'grommet';
import {Video} from 'grommet-icons';
import {useHistory} from 'react-router-dom';
import Recorder from './component/videorecorder';
const questions=[{qs:"What is your name?"},{qs:"What is your qualifiacations?"},{qs:"What is your skills?"},{qs:"What is your strength?"}];
function App() {
  const [index,setindex]=useState(0);
  const [rec,setrec]=useState(false);
  const history = useHistory();
  return (
    <>
      <Box fill>
        <Box direction="row" width="xxlarge" className="head" height="15%" justify="center" align="center" >
          <Heading level="2" color="#4A164B" >AI-INTERVIEW</Heading>
        </Box>
        <Box width="xxlarge" justify="center" align="center" height="85%">
          <Box width="60%"  direction="column" className="ques" height={{max:"auto",min:"350px"}} background="white" >
            <Box justify="center" align="center" height="80%" >
              {<Heading color="#4A164B" level="2"  >Q{index+1} : {questions[index].qs}</Heading>}
            </Box>
            <Box gap="small" height="20%" justify="end" direction="row" pad="small" >
              <Button onClick={()=> {history.push('/rec')}} label={<Text weight="bold" color="#4A164B">Record Answer</Text>} icon={<Video />}  primary color="orange" />
            </Box>
          </Box>
        </Box>
        
      </Box>
    </>
    
  );
}

export default App;
