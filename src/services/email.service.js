import nodemailer from 'nodemailer';
import config from "../config/config.js";



const transporter = nodemailer.createTransport({
    service : "gmail",
    auth: {
        type: "OAuth2",
        user: config.USER,
        clientId: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        refreshToken: config.REFRESH_TOKEN,
        accessUrl: "https://oauth2.googleapis.com/token",
    }
    
})

console.log("Auth Debug:", {
    user: config.USER,
    googleUser: config.USER,   // check if this is undefined
    hasClientId: !!config.CLIENT_ID,
    hasSecret: !!config.CLIENT_SECRET,
    hasRefresh: !!config.REFRESH_TOKEN,
});

// verify the connection configuration
transporter.verify((error,success) => {
    if(error){
        console.error("Error connecting to email server",error);
    }else{
        console.log("Email server is ready to send messages");
    }
});

export const sendEmail = async (to, subject,text,html) => {
    try {
        const info = await transporter.sendMail({
            from : `"Your Name" <${config.USER}>`,
            to,
            subject,
            text,
            html
        });
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }catch(error){
        console.error('Error sending email:',error);
    }
}



/*

Luvin Singh

RAG --> Why we use in GPT aplication.

AI Providers --> 

Server --> authentication , authorization --> store the msg history
User
Ai 

User 
AI  --> Store in DB.

Problem --> 
--> Gerate the big response.

--> ALl the msg feed give to ai , token will increase --> Then cost also increase.

How LLM read the data. 

Rag used augment , like skipping the is , and other data.
--> tokenization --> in filler word remove it. --> less token 
--> In each model is different way to do it.

If i give the content then cost will increase --> If i ask the question related to chapter-2 , so don't 
relevant to other chapter.

--> the content is not necessary then why you give to me.
--> help me in cost saving.

--> If give the history then will cost you more.

Now user ask the cross question --> 


*/