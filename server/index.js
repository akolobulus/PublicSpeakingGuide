const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');

// Configure Neon WebSocket
neonConfig.webSocketConstructor = ws;

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Routes
app.get('/api/reviews', async (req, res) => {
  try {
    const query = `
      SELECT id, name, email, rating, title, content, created_at, updated_at
      FROM reviews 
      WHERE is_approved = true 
      ORDER BY created_at DESC 
      LIMIT 20
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const { name, email, rating, title, content } = req.body;
    
    // Validate required fields
    if (!name || !email || !rating || !title || !content) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    // Insert review (defaults to not approved)
    const query = `
      INSERT INTO reviews (name, email, rating, title, content, is_approved, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, false, NOW(), NOW())
      RETURNING *
    `;
    
    const result = await pool.query(query, [name, email, parseInt(rating), title, content]);
    
    res.status(201).json({ 
      message: 'Review submitted successfully! It will be displayed after approval.',
      review: result.rows[0]
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// Admin route to approve reviews (you can access this manually)
app.put('/api/reviews/:id/approve', async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id);
    
    const query = `
      UPDATE reviews 
      SET is_approved = true, updated_at = NOW() 
      WHERE id = $1 
      RETURNING *
    `;
    
    const result = await pool.query(query, [reviewId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    res.json({ message: 'Review approved successfully', review: result.rows[0] });
  } catch (error) {
    console.error('Error approving review:', error);
    res.status(500).json({ error: 'Failed to approve review' });
  }
});

// Get all reviews (including pending - for admin use)
app.get('/api/reviews/all', async (req, res) => {
  try {
    const query = `
      SELECT id, name, email, rating, title, content, is_approved, created_at, updated_at
      FROM reviews 
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.listen(PORT, () => {
  console.log(`Review server running on port ${PORT}`);
});