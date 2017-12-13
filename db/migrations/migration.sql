CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  password_digest TEXT NOT NULL,
  name VARCHAR,
  company VARCHAR,
  icon VARCHAR,
  signature VARCHAR
);

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  owed INTEGER DEFAULT 0,
  service VARCHAR NOT NULL,
  contractor INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  template TEXT
);
