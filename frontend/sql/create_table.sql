-- DROP EXISTING TABLES (for development reset only)
DROP TABLE IF EXISTS trip_chats CASCADE;
DROP TABLE IF EXISTS trips CASCADE;
DROP TABLE IF EXISTS vehicles CASCADE;
DROP TABLE IF EXISTS destinations CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TYPE user_role AS ENUM ('admin', 'driver', 'director');
-- USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role user_role NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- VEHICLES
CREATE TABLE vehicles (
  id SERIAL PRIMARY KEY,
  plate_no TEXT NOT NULL UNIQUE,
  model TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- DESTINATIONS
CREATE TABLE destinations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  address TEXT
);

-- Updated TRIPS (with foreign keys to destinations)
CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  vehicle_id INTEGER NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  driver_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  trip_number INTEGER NOT NULL CHECK (trip_number IN (1, 2, 3)),
  is_gantung BOOLEAN DEFAULT FALSE,
  start_destination_id INTEGER NOT NULL REFERENCES destinations(id) ON DELETE RESTRICT,
  end_destination_id INTEGER NOT NULL REFERENCES destinations(id) ON DELETE RESTRICT,
  is_checked BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  is_double_checked BOOLEAN DEFAULT FALSE,
  is_incomplete BOOLEAN DEFAULT FALSE,
  remark TEXT,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- TRIP CHATS
CREATE TABLE trip_chats (
  id SERIAL PRIMARY KEY,
  trip_id INTEGER NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES
CREATE INDEX idx_trip_date_vehicle ON trips (date, vehicle_id);
CREATE INDEX idx_chat_trip_id ON trip_chats (trip_id);

-- FUNCTION TO ENFORCE MAX TRIP PER DAY PER VEHICLE
CREATE OR REPLACE FUNCTION enforce_trip_limits() RETURNS TRIGGER AS $$
DECLARE
  non_gantung_count INTEGER;
  gantung_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO non_gantung_count
  FROM trips
  WHERE date = NEW.date AND vehicle_id = NEW.vehicle_id AND is_gantung = FALSE;

  SELECT COUNT(*) INTO gantung_count
  FROM trips
  WHERE date = NEW.date AND vehicle_id = NEW.vehicle_id AND is_gantung = TRUE;

  IF NEW.is_gantung = FALSE AND non_gantung_count >= 2 THEN
    RAISE EXCEPTION 'Only 2 normal trips allowed per vehicle per day.';
  ELSIF NEW.is_gantung = TRUE AND gantung_count >= 1 THEN
    RAISE EXCEPTION 'Only 1 gantung trip allowed per vehicle per day.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER FOR TRIP LIMIT
CREATE TRIGGER trip_limit_trigger
BEFORE INSERT ON trips
FOR EACH ROW
EXECUTE FUNCTION enforce_trip_limits();

-- Step 1: Add fields to existing users table
ALTER TABLE users
ADD COLUMN username TEXT UNIQUE,
ADD COLUMN email TEXT UNIQUE,
ADD COLUMN hashed_password TEXT;

-- Step 2: Create sessions table for Lucia
CREATE TABLE session (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at TIMESTAMPTZ NOT NULL
);

-- Optional Index for session expiration (recommended for cleanup jobs)
CREATE INDEX idx_session_expires_at ON session (expires_at);
