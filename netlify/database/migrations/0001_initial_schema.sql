CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL DEFAULT '',
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer',
  address TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  stock INTEGER NOT NULL DEFAULT 0,
  badge TEXT,
  description TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT 'default',
  details JSONB NOT NULL DEFAULT '{}',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  user_email TEXT NOT NULL DEFAULT '',
  user_name TEXT NOT NULL DEFAULT '',
  customer JSONB NOT NULL DEFAULT '{}',
  items JSONB NOT NULL DEFAULT '[]',
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  shipping NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  payment_method TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS carts (
  user_id TEXT PRIMARY KEY,
  items JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMP DEFAULT NOW()
);
