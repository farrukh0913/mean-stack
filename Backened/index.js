const express = require('express');
const app = express();
let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const TOKEN_KEY = "1221212121"

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
const dataSchema = new mongoose.Schema({
  userName: String,
  email: String,
  encryptedPassword: String,
})
const userModel = mongoose.model('User', dataSchema);

// Listen on port 3000

app.post('/newUser', async (req, res) => {
  const { userName, email, password } = req.body;
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }
  encryptedPassword = await bcrypt.hash(password, 10);
  console.log('encryptedPassword: ', encryptedPassword);
  const newUser = new userModel({ userName, email, encryptedPassword });
  newUser.save()
    .then(() => {
      const response =
      {
        user:req.body.userName,
        email:req.body.email
      }
      console.log('New user saved successfully');
      res.status(201).json(response);
    })
    .catch((error) => {
      console.error('Error saving new user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});
app.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  const user = await userModel.findOne({ userName });
  if (!user) {
    return res.status(400).json({ message: 'Invalid Email or Password' });
  }
  const passwordMatch = await bcrypt.compare(password, user.encryptedPassword);
  console.log('user: ', user);
  if (passwordMatch) {
    const token = jwt.sign(
      { userName: userName },
      process.env.TOKEN_KEY || TOKEN_KEY,
      { expiresIn: '24h' }
    );
    const response = {
      userName: userName,
      jwt_Token: token,
      email:user.email
    };
    return res.status(201).json(response);
  } else {
    return res.status(400).json({ message: 'Invalid Email or Password' });
  }
});
app.put('/updateUser', async (req, res) => {
  const updatedData = {
    userName: req.body.data.userNewName,
    email: req.body.data.email,
    encryptedPassword: await bcrypt.hash(req.body.data.password, 10),
  };
  
  console.log('updatedData: ', updatedData);

  try {
    const response = await userModel.findOneAndUpdate(
      { email: req.body.email }, 
      { $set: updatedData },     
      { new: true }              
    );

    if (response) {
      console.log('Updated user:', response);
      return res.status(200).json(response);
    } else {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function connection() {
  await mongoose.connect('mongodb+srv://umarfarooq132333:GTDnQr2w8AWVIVsu@mean-blog.20yjaud.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log("connection sucees")
  })
}
connection();
