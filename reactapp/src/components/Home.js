import React, { useEffect } from 'react'
import Navbar from './Navbar'
import './Home.css'
import { Card,Button ,Form,FormText, Toast} from 'react-bootstrap'
import { useState,useRef } from 'react'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';
import user from './Login'
import { useNavigate } from 'react-router-dom';
import {fetchUserData} from './api/Authentication'
import axios from 'axios'

function Home(props) {


    const [authid,setAuthId]=useState(JSON.parse(localStorage.getItem('userdata')).authorities[0].id);
    const [name,setName]=useState(JSON.parse(localStorage.getItem('userdata')).firstname);
    //console.log(authid);

    console.log(JSON.parse(localStorage.getItem('userdata')));


  const navigate= useNavigate();

  const form = useRef();

  const form1=useRef();

  const [firstname,setFirstName]=useState("");
  const [middleName,setMiddleName]=useState("");
  const [lastname,setLastName]=useState("");
  const [email,setEmail]=useState("");

 
    var cand={
          'cemail':'',
          'cpassword':'',
          'cname':'',
          'crole':'',
          'ctasks':'',
    }

    

     function passwordGenerator()
    {
        var ualp="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var lalp="abcdefghijklmnopqrstuvwxyz";
        var dig="0123456789";
        var sp="!@^";

        var password=""

        for(let i=0;i<2;i++)
        {
            password=password+ualp.charAt(Math.floor(Math.random()*26));
        }

        for(let i=0;i<3;i++)
        {
            password=password+lalp.charAt(Math.floor(Math.random()*26));
        }

        for(let i=0;i<1;i++)
        {
            password=password+sp.charAt(Math.floor(Math.random()*3));
        }

        for(let i=0;i<4;i++)
        {
            password=password+dig.charAt(Math.floor(Math.random()*10));
        }

          //document.getElementById("password").value=password;


          return password;

    }

    const  addCandidate = (e) =>{

      console.log(cand);
     
        var cp = (passwordGenerator());

       cand['cpassword']=cp;

        document.getElementById("cpassword").value=cp;

        //  console.log(candidateEmail, document.getElementById("cpassword").value);

          console.log(cand);

         if(!cand.cpassword||!cand.cemail||!cand.cname||!cand.crole||!cand.ctasks)
        {
            toast.error("fill all the details!!!");
            return 
        }


          console.log(cand);

          axios({
            method:'POST',
            url:`https://8080-ddaedfbeaebcdffcebcccefaedfbdbebed.project.examly.io/addCandidate`,
            headers:{
              'Authorization':'Bearer '  + localStorage.getItem('USER_KEY'),
              'Content-Type': 'application/json'
          },
           data:cand
          }).then(res=>{
            console.log(res);

            if(res.data==false)
            {
               toast.error("Candidate exists");
            }

            else
            {
              emailjs.sendForm('service_pnzzwnz', 'template_yk5q6bt', form.current, '4Ctb_sqQaySydPYc-')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });

              toast.success("Candidate added");
            }


          }).catch(res=>{
            console.log(res);

            toast.error("try again");

          })


    }

  const sendEmail= async (e)=>{
    e.preventDefault();

    if(!firstname||!lastname)
          {
                toast.error("Fill all the required fields");
          }

          else{

            let password = passwordGenerator();

            let virtusaemail = firstname+middleName+lastname+"@virtusa.com";

            console.log(virtusaemail);

            console.log(password);

            document.getElementById("pass_word").value=password;

            document.getElementById("email").value=localStorage.getItem('username');

            axios.post(`https://8080-ddaedfbeaebcdffcebcccefaedfbdbebed.project.examly.io/generatemail/${localStorage.getItem('username')}/${virtusaemail}/${password}`).then(res=>
           {
                emailjs.sendForm('service_pnzzwnz', 'template_8zsenzm', form1.current, '4Ctb_sqQaySydPYc-')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });

                toast.success("check your mail");

                console.log(res);
          
           }).catch(res=>{
                console.log(res);
                toast.error(" try again ");
           })
         
    }
      
  }

  return (

    
    
    authid==1 ?

    <div >
         <Navbar/>
      
       <div style={{ display:'flex' , flexDirection:'column'  , marginTop:'10%' , justifyContent:'center' , alignItems:'center',color:'blue'  }} >
        <h1>Welcome Virtusian  {name}</h1>
        </div>
   

    <ToastContainer/>

    </div>

      :

      authid==2?

      (
        <div>
          <Navbar/>
          <div  className='home' style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <h1>Add Candidate</h1>
      <Card   className='card-home'>
      <Card.Body>

          <form  ref={form} >
          <div class="form-group row">
       <label  for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm mb-3">Email
       <b className='req'> *</b>
       </label>
        <div class="col-sm-10">
        <input type="email"  onChange={e=>{ cand[e.target.name]=e.target.value;  }} class="form-control form-control-sm"   placeholder='enter email address' name='cemail' />
        </div>
        <label  for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm mb-3">Name
       <b className='req'> *</b>
       </label>
        <div class="col-sm-10">
        <input type="text"  onChange={e=>{ cand[e.target.name]=e.target.value;  }} class="form-control form-control-sm"   placeholder='enter name' name='cname' />
        </div>


        
      <label  for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm mb-3">Task
       <b className='req'> *</b>
       </label>
        <div class="col-sm-10">
        <input type="text"  onChange={e=>{cand[e.target.name]=e.target.value}} class="form-control form-control-sm"   placeholder='enter Task' name='ctasks' />
        </div>




        <label  for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm mb-3">Role
       <b className='req'> *</b>
       </label>
        <div class="col-sm-10">
        <input type="text"  onChange={e=>{cand[e.target.name]=e.target.value}} class="form-control form-control-sm"   placeholder='enter Role' name='crole' />
        </div>
        </div>
        <input style={{display:"none"}} type="text" class="form-control form-control-sm" name="cpassword"  id="cpassword"></input>
        </form>

        <button  class="btn btn-primary "  onClick={addCandidate} >Add Candidate</button>



      </Card.Body>
    </Card>
    </div>

    <ToastContainer/>

    </div>
      )


      :

      <div>
        <Navbar/>

        <div style={{ display:'flex' , flexDirection:'column'  , marginTop:'10%' , justifyContent:'center' , alignItems:'center'  }} >
        <h1>Welcome Virtusian</h1>
        </div>
             
      </div>


  )
}
export default Home;