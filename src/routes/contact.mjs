import { Router } from "express"
import cors from 'cors'
import database from "./databaseconnect.mjs"
import nodemailer from 'nodemailer'

const router = Router()

router.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH', 'PUT'],
    credentials: true
}))

router.post('/api/contact',  async(req, res) => {

        const data = [
            req.body.fullname,
            req.body.phonenumber,
            req.body.email,
            req.body.companyname,
            req.body.message
    ]
        
     database.query('INSERT INTO contacts (fullname,phonenumber,email,companyname,message) VALUES ($1,$2,$3,$4,$5)', data, (error, result) => {
         if (result.rowCount > 0) {
             
             const mailTransporter = nodemailer.createTransport({
                 host: process.env.SMTP_SERVICE,
                 secure: true,
                 port: process.env.PORT,
                 auth: {
                     user: process.env.SMTP_USER,
                     pass: process.env.SMTP_PASS 
                 }
             })
             
             const mailOptions = {
                 from: 'All Hopes For The Glory ©' + ' ' + process.env.SMTP_USER ,
                 to: [process.env.LEAD_EMAIL, process.env.SMTP_USER,],
                 subject: 'Service Request',
                 html: `<h1>New Service Request</h1>
                 <p>A new lead was generated from the All Hopes For The Glory Website.</p>
                 <p><strong>Name</strong> 👤: ${req.body.fullname}</p>
                 <p><strong>Phone</strong> 📞: '+' + ${req.body.phonenumber}</p>
                 <p><strong>Email</strong> 📧: ${req.body.email}</p>
                 <p><strong>Company Name</strong> 🏛️: ${req.body.companyname}</p>
                 <p><strong>Message</strong><br> ${req.body.message}</p>`
             }
             const ConfirmMailOptions = {
                 from: 'Request Received' + ' ' + process.env.SMTP_USER ,
                 to: req.body.email,
                 subject: 'Request Confirmation',
                 html: `<h2>Your request was received!</h2>
                 <p>Hi ${req.body.fullname},</p>
                 <p>Thank you for your submission. Our team is currently reviewing your request and you can expect a response within 24 hours. We appreciate your patience as we work to provide you with the best service possible.</p><br>
                 <p><i>Please do not reply to this email.</i></p>`
             }

            mailTransporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    res.send(true)
                }
            });
             
            mailTransporter.sendMail(ConfirmMailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    res.send(true)
                }
            });

         }
     })
   
})


export default router