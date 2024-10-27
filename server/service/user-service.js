const User = require('../database/model/User');
const bcrypt = require('bcrypt'); // Make sure to install 'bcrypt' not 'bcryptjs'
const jwt = require('jsonwebtoken');

const signUp = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error('All fields are required.');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  const token = jwt.sign({ id: user.id }, 'SECRET_KEY', { expiresIn: '1h' });

  return { id: user.id, name: user.name, email: user.email, token };
};


// Log In function
const logIn = async (_, { email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    // Compare the input password with the hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Incorrect password');

    // Create a JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'SECRET_KEY', { expiresIn: '1h' });

    return { id: user.id, email: user.email, token };
}

// signUp("ram", "sss", "123")
module.exports = {
    signUp,
    logIn,
};
