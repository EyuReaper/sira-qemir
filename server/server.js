const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const supabase = require('./config/supabase');

dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
// Test Supabase connection
app.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('test').select('*');
    if (error) throw error;
    res.json({ message: 'Welcome to Sira Qemir API', supabaseData: data });
  } catch (error) {
    res.status(500).json({ message: 'Supabase error', error: error.message });
  }
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});