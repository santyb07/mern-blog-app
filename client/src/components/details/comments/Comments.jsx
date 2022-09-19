import React,{useState, useContext} from 'react'
import {Box, Button, TextareaAutosize, styled} from "@mui/material"

import {API} from "../../../service/api"

import { DataContext } from '../../../context/DataProvider';
import { useEffect } from 'react';

import Comment from './Comment';

const Container=styled(Box)`
margin-top:100px;
display:flex;
`

const Image=styled('img')({
    width:'50px',
    height:'50px',
    borderRadius:'50%'
});

const StyledTextArea= styled(TextareaAutosize)`
height:100px;
width:100%;
margin:0 20px;
`

const initialvalues={
    name:'',
    postId:'',
    comments:'',
    date:new Date(),
}

const Comments = ({post}) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment,setComment]= useState(initialvalues);
    const {account}= useContext(DataContext);
    const [comments,setComments]= useState([]);
    const [toggle,setToggle]=useState(false);


    useEffect(()=>{
        const getData= async()=>{
            console.log(post);
            try{
                const response= await API.getAllComments(post._id);
            if(response.isSuccess){
                setComments(response.data);
            }else{
                console.log('error has occured but you are not getting')
            }
            }catch(error){
                console.log('something went wrong',error);
            }
            
        }
        getData();
    },[toggle,post]);      

    const handleChange=(e)=>{
        setComment({
            ...comment,
            name:account.username,
            postId: post._id,
            comments:e.target.value,
        })
    }

    const addComment= async()=>{
        let response= await API.newComment(comment);
        if(response.isSuccess){
            setComment(initialvalues);
            console.log('comment is added sucessfully');
            setToggle(prev=> !prev);
        }
    }
  return (
    <Box>
        <Container>
            <Image src={url} alt='dp'/>
            <StyledTextArea
            value={comment.comments}
            onChange={(e)=> handleChange(e)}
            minRows={5}
            placeholder="what's on your mind?"            
            />
            <Button 
            variant='contained' 
            color='primary' 
            style={{height:40}}
            onClick={(e)=>addComment(e)}
            >Post</Button>
        </Container>
        <Box>
            {
                comments && comments.length > 0 && comments.map((comment)=>(
                    <Comment comment={comment} setToggle={setToggle}/>
                ))
            }
        </Box>
    </Box>
  )
}

export default Comments