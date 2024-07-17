
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
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


const port = process.env.PORT || 5051;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
