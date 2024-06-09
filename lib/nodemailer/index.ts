"use server"
import nodemailer from "nodemailer";
import { EmailContent} from "@/type";
export async  function  generateEmailBody(){
   

   let subject =''
   let body = ''
   
    
        subject= 'Hello world!'
        body = `
        <div>
          <h2> Hello world</h2>
          
        </div>
        `
     
        
             
   
   return { subject, body };
}

const transporter = nodemailer.createTransport({
   pool: true,
   service: 'hotmail',
   secure:false, // Use TLS
   auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS
   },
  
   maxConnections: 34,
   maxMessages: 100, // Example rate limiting
   rateDelta: 10000, // Example rate limiting (10 seconds)
   rateLimit: 5 // Max 5 messages per 10 seconds
});



export const sendEmail =async (emailContent:EmailContent,sendTo:string[])=>{
 const mailOption = {
    from:'https://mali-send.vercel.app<shijan23@hotmail.com>',
    to:sendTo,
    html:emailContent.body,
    subject:emailContent.subject

 }
 transporter.sendMail(mailOption,(error:any,info:any) => {
    if (error) return console.log(error)
        console.log('Email sent',info)
 })
}