import React,{useState} from 'react';
import './App.css';
import {Box,Text,Heading,Button} from 'grommet';
import {Video} from 'grommet-icons';


import Recorder from './component/videorecorder';
const questions=[{qs:"What is your name?"},{qs:"What is your Father's name ?"},{qs:"What is your qualifiacations?"},{qs:"What is your skills?"},{qs:"What is your strength?"}];

function App() {
  const [index,setindex]=useState(0);
  
  const [disp,setdisp]=useState(true);
  const [vid,setvid]=useState(false);
  const next=()=>{
    setvid(!vid);
    setdisp(!disp);
    if(index!==(questions.length-1)){
      setindex(index+1);
    }
  }

  
  if(disp){
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
                <Button onClick={()=> {setdisp(!disp);setvid(!vid);}} label={<Text weight="bold" color="#4A164B">Record Answer</Text>} icon={<Video />}  primary color="orange" />
              </Box>
            </Box>
          </Box>
          
        </Box>
      </>
      
    );
  }
  if(vid){
    return(
      <>
        <Recorder next={next} />
      </>
    );
  }
}

export default App;