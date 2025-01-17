import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import payRouter from './routes/userroutes.js';
import {User,Pay} from './models/schema.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to db');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(cors());
app.use(express.static('C:/Users/SOWMIKA/OneDrive/Desktop/fresh/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/pay',payRouter);


app.post('/signup/signup', async (req, res) => {
  try {
   
    const { name, email, pswd, cnfrm_pswd } = req.body;

    if (pswd !== cnfrm_pswd) {
      return res.status(400).json({ error: 'Password and confirm password do not match' });
    }

    
    const newUser = new User({ name, email, pswd, cnfrm_pswd });

   
    await newUser.save();

   
    res.sendFile("C:/Users/SOWMIKA/OneDrive/Desktop/fresh/public/student.html");

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/checkPayment', async (req, res) => {
  const { rollno } = req.body;
  console.log(req.body);
  const pay = await Pay.findOne({ rollno });
  console.log(pay);

  if (pay) {
    
    res.send(`
      <p>Payment status: Paid</p>
      <p>Name: ${pay.fullName}</p>
      <p>Transaction Date: ${pay.date}</p>
      <p>Address: ${pay.address}</p>
    `);
  } else {
    res.send(`
      <p>No payment found for Roll Number: ${rollno}</p>
    `);
  }
});


app.post('/checkPay_place', async (req, res) => {
  const { address } = req.body; 
  console.log(req.body);
  
  try {
    const payments = await Pay.find({ address });
    console.log(address);

    if (payments.length > 0) {
      let responseHtml = '<h2>Payment Status:</h2>';
      payments.forEach(payment => {
        responseHtml += `
          <div>
            <p><strong>Name:</strong> ${payment.fullName}</p>
            <p><strong>Transaction Date:</strong> ${payment.date}</p>
            <p><strong>Address:</strong> ${payment.address}</p>
            <hr>
          </div>
        `;
      });

      res.send(responseHtml);
    } else {
      res.send(`
        <p>No payments found for Place Name: ${address}</p>
      `);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('<p>Internal Server Error</p>');
  }
});


app.post('/checkPay_bus', async (req, res) => {
  const { bus_no } = req.body; 
  console.log(req.body);
  
  try {
      const students = await Pay.find({ bus_no });
      console.log(bus_no);

      if (students.length > 0) {
          let responseHtml = '<h2>Payment Status for Bus No: ' + bus_no + '</h2>';
          students.forEach(student => {
              responseHtml += `
                  <div>
                      <p><strong>Name:</strong> ${student.fullName}</p>
                      <p><strong>Roll No:</strong> ${student.rollno}</p>
                      <p><strong>Paid:</strong> ${student.paid ? 'Yes' : 'No'}</p>
                      <hr>
                  </div>
              `;
          });

          res.send(responseHtml);
      } else {
          res.send(`
              <p>No students found for Bus Number: ${bus_no}</p>
          `);
      }
  } catch (error) {
      console.error(error);
      res.status(500).send('<p>Internal Server Error</p>');
  }
});


const port = process.env.PORT || 5051;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
