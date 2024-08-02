import express from 'express';
import {User,Pay} from '../models/schema.js';

const payRouter = express.Router();

payRouter.post('/', async (req, res) => {
    try {
      const { fullName, rollno, email, year, bus_no, address, stop, zip, cardHolderName, date } = req.body;
  
      const newPay = new Pay({ fullName, rollno, email, year, bus_no, address, stop, zip, cardHolderName, date });
  
      await newPay.save();
      console.log('Payment details saved successfully.');
  
      // Construct HTML response with payment details
      const htmlResponse = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Payment Receipt</title>
        </head>
        <body>
          <h1>Payment Receipt</h1>
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Roll Number:</strong> ${rollno}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Year of Study:</strong> ${year}</p>
          <p><strong>Bus_No:</strong> ${bus_no}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Stopping:</strong> ${stop}</p>
          <p><strong>Zip Code:</strong> ${zip}</p>
          <p><strong>Zip Code:</strong> ${cardHolderName}</p>
          <p><strong>Transaction Date:</strong> ${date}</p>
          <!-- You can include more payment details here -->
        </body>
        </html>
      `;
  
      // Send HTML response with payment details
      res.status(200).send(htmlResponse);
    } catch (error) {
      console.error('Error saving payment details:', error);
      res.status(500).send('Internal server error');
    }
  });

  export default payRouter;