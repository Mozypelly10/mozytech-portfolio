const {createServer}=require('node:http');
const assert=require('node:assert/strict');
const {createContactHandler}=require('../contact-handler');
(async()=>{
 let delivered=[];
 const env={SMTP_HOST:'smtp.example.net',SMTP_PORT:'465',SMTP_USER:'sender@example.net',SMTP_PASSWORD:'test-only',CONTACT_TO:'owner@example.net'};
 const handler=createContactHandler({env,sendMail:async mail=>{if(mail.text.includes('simulate-failure'))throw new Error('test-only delivery failure');delivered.push(mail);return {accepted:['owner@example.net']}}});
 const server=createServer(handler);await new Promise(r=>server.listen(0,'127.0.0.1',r));
 try{
 const url='http://127.0.0.1:'+server.address().port+'/api/contact';
 const submit=(body,ip='192.0.2.1',origin='https://mozytech.com.ng')=>fetch(url,{method:'POST',headers:{'Content-Type':'application/json',Origin:origin,'X-Forwarded-For':ip},body:JSON.stringify(body)});
 let r=await submit({name:'Visitor',email:'visitor@example.net',message:'Project enquiry',to:'attacker@example.net'});assert.equal(r.status,201);assert.equal(delivered[0].to,'owner@example.net');assert.equal(delivered[0].replyTo,'visitor@example.net');
 r=await submit({name:'Visitor',email:'bad\r\nBcc:attacker@example.net',message:'hello'},'192.0.2.2');assert.equal(r.status,400);
 r=await submit({name:'Visitor',email:'visitor@example.net',message:'hello'},'192.0.2.3','https://other.example');assert.equal(r.status,403);
 r=await submit({name:'Visitor',email:'visitor@example.net',message:'simulate-failure'},'192.0.2.4');assert.equal(r.status,502);
 for(let i=0;i<5;i++)await submit({name:'Visitor',email:'visitor@example.net',message:'hello'},'192.0.2.5');r=await submit({name:'Visitor',email:'visitor@example.net',message:'hello'},'192.0.2.5');assert.equal(r.status,429);
 r=await submit({name:'Visitor',email:'visitor@example.net',message:'x'.repeat(20000)},'192.0.2.6');assert.equal(r.status,413);
 console.log('Passed: forwarding, fixed recipient, header-injection validation, origin check, delivery-failure response, rate limiting and body-size limit. No real email sent.');
 }finally{await new Promise(r=>server.close(r))}
})().catch(e=>{console.error(e);process.exit(1)});
