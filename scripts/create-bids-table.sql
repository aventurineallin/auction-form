-- Create the bids table for auction submissions
CREATE TABLE IF NOT EXISTS bids (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  bid_amount_1 DECIMAL(10, 2) DEFAULT 0,
  bid_amount_2 DECIMAL(10, 2) DEFAULT 0,
  bid_amount_3 DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_bids_email ON bids(email);

-- Add an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_bids_created_at ON bids(created_at);
