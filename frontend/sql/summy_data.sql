-- USERS
INSERT INTO users (name, role, phone) VALUES
('Alice Admin', 'admin', '0123456789'),
('Bob Driver', 'driver', '0123456790'),
('Charlie Director', 'director', '0123456791');

-- VEHICLES
INSERT INTO vehicles (plate_no, model) VALUES
('JRM1234', 'Hino 500'),
('BLK4321', 'Isuzu FVR');

-- DESTINATIONS
INSERT INTO destinations (name, address) VALUES
('Johor Bahru', 'JB Central, Johor'),
('Pasir Gudang', 'Pasir Gudang Port'),
('Skudai', 'Skudai Town'),
('Kulai', 'Kulai City Center');

-- Use IDs dynamically if needed, or hardcode based on insertion order
-- TODAY'S TRIPS
INSERT INTO trips (
  vehicle_id, driver_id, date, trip_number, is_gantung,
  start_destination_id, end_destination_id, created_by
) VALUES
(1, 2, CURRENT_DATE, 1, FALSE, 1, 2, 1),
(1, 2, CURRENT_DATE, 2, FALSE, 2, 3, 1);

-- GANTUNG TRIP FOR TOMORROW
INSERT INTO trips (
  vehicle_id, driver_id, date, trip_number, is_gantung,
  start_destination_id, end_destination_id, created_by
) VALUES
(1, 2, CURRENT_DATE + INTERVAL '1 day', 1, TRUE, 3, 4, 1);

-- CHAT MESSAGES
INSERT INTO trip_chats (trip_id, user_id, message) VALUES
(1, 2, 'Driver has arrived at Pasir Gudang.'),
(1, 1, 'Noted. Please proceed to next destination.');




