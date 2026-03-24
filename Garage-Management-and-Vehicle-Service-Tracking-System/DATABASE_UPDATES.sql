-- Database Management and Update Scripts for Garage Management System
-- Use these queries to manage and update your database

-- ============================================================================
-- 1. VIEW EXISTING DATA
-- ============================================================================

-- View all customers
SELECT * FROM customers;

-- View all vehicles
SELECT * FROM vehicles;

-- View all service types
SELECT * FROM service_types;

-- View all appointments with related information
SELECT 
    a.appointment_id,
    a.appointment_date,
    a.appointment_time,
    c.customer_name,
    v.vehicle_registration,
    v.vehicle_id,
    s.service_name,
    a.status,
    a.assigned_mechanic
FROM appointments a
JOIN customers c ON a.customer_id = c.customer_id
JOIN vehicles v ON a.vehicle_id = v.vehicle_id
LEFT JOIN service_types s ON a.service_type_id = s.service_type_id
ORDER BY a.appointment_date DESC;

-- ============================================================================
-- 2. ADD NEW CUSTOMERS (Required for creating appointments)
-- ============================================================================

-- Add a single customer
INSERT INTO customers (customer_name, email, phone, address, city, postal_code)
VALUES (
    'John Doe',
    'john@example.com',
    '555-1234',
    '123 Main St',
    'Springfield',
    '12345'
);

-- Add multiple customers
INSERT INTO customers (customer_name, email, phone, address, city, postal_code)
VALUES 
    ('Alice Smith', 'alice@example.com', '555-5678', '456 Oak Ave', 'Springfield', '12345'),
    ('Bob Johnson', 'bob@example.com', '555-9012', '789 Elm St', 'Springfield', '12345'),
    ('Carol White', 'carol@example.com', '555-3456', '321 Pine Rd', 'Springfield', '12345');

-- ============================================================================
-- 3. ADD NEW VEHICLES (Required for creating appointments)
-- ============================================================================

-- Add a vehicle for a customer (Replace {customer_id} with actual ID)
INSERT INTO vehicles (vehicle_registration, customer_id, make, model, year, color, vehicle_type, license_plate, vin)
VALUES (
    'CAD-8768',
    1,
    'Toyota',
    'Camry',
    2020,
    'Silver',
    'Sedan',
    'ABC-1234',
    'VIN123456789ABC12'
);

-- Add multiple vehicles
INSERT INTO vehicles (vehicle_registration, customer_id, make, model, year, color, vehicle_type, license_plate, vin)
VALUES 
    ('CAD-8769', 2, 'Honda', 'Civic', 2021, 'Blue', 'Sedan', 'ABC-1235', 'VIN223456789ABC12'),
    ('CAD-8770', 3, 'Ford', 'F-150', 2019, 'Red', 'Truck', 'ABC-1236', 'VIN323456789ABC12'),
    ('CAD-8771', 1, 'Toyota', 'RAV4', 2022, 'White', 'SUV', 'ABC-1237', 'VIN423456789ABC12');

-- ============================================================================
-- 4. ADD NEW SERVICE TYPES (Required for creating appointments)
-- ============================================================================

-- Add service types
INSERT INTO service_types (service_name, description, estimated_duration, cost, is_active)
VALUES 
    ('Oil Change', 'Regular oil and filter change', 30, 49.99, TRUE),
    ('Tire Rotation', 'Rotate and balance tires', 45, 79.99, TRUE),
    ('Full Service', 'Complete vehicle maintenance and inspection', 120, 199.99, TRUE),
    ('Brake Inspection', 'Check brake pads and system', 30, 59.99, TRUE),
    ('Battery Replacement', 'Replace vehicle battery', 30, 149.99, TRUE),
    ('Transmission Fluid Change', 'Change transmission fluid', 60, 129.99, TRUE);

-- ============================================================================
-- 5. CREATE APPOINTMENTS (After adding customers, vehicles, and services)
-- ============================================================================

-- Create a single appointment
-- Note: Replace {customer_id}, {vehicle_id}, and {service_type_id} with actual IDs
INSERT INTO appointments (vehicle_id, customer_id, appointment_date, appointment_time, service_type_id, status, assigned_mechanic)
VALUES (
    1,
    1,
    '2025-04-15',
    '10:00:00',
    1,
    'Pending',
    'John Smith'
);

-- Create multiple appointments
INSERT INTO appointments (vehicle_id, customer_id, appointment_date, appointment_time, service_type_id, status, assigned_mechanic)
VALUES 
    (2, 2, '2025-04-16', '14:30:00', 2, 'Pending', 'Mike Johnson'),
    (3, 3, '2025-04-17', '09:00:00', 3, 'Confirmed', 'Sarah Davis'),
    (1, 1, '2025-04-18', '15:00:00', 4, 'Pending', 'John Smith');

-- ============================================================================
-- 6. UPDATE APPOINTMENTS
-- ============================================================================

-- Update appointment status
UPDATE appointments 
SET status = 'Confirmed' 
WHERE appointment_id = 1;

-- Update appointment with new date and time
UPDATE appointments 
SET appointment_date = '2025-04-20', 
    appointment_time = '11:00:00' 
WHERE appointment_id = 1;

-- Assign mechanic to appointment
UPDATE appointments 
SET assigned_mechanic = 'David Wilson' 
WHERE appointment_id = 2;

-- Update multiple appointments at once
UPDATE appointments 
SET status = 'Confirmed' 
WHERE appointment_date BETWEEN '2025-04-15' AND '2025-04-20';

-- ============================================================================
-- 7. DELETE APPOINTMENTS
-- ============================================================================

-- Delete a single appointment
DELETE FROM appointments WHERE appointment_id = 1;

-- Delete all pending appointments for a specific date
DELETE FROM appointments 
WHERE status = 'Pending' AND appointment_date = '2025-04-15';

-- ============================================================================
-- 8. USEFUL QUERIES FOR MANAGEMENT
-- ============================================================================

-- Get all appointments for a specific customer
SELECT a.*, c.customer_name, v.vehicle_registration, s.service_name
FROM appointments a
JOIN customers c ON a.customer_id = c.customer_id
JOIN vehicles v ON a.vehicle_id = v.vehicle_id
LEFT JOIN service_types s ON a.service_type_id = s.service_type_id
WHERE c.customer_name = 'John Doe'
ORDER BY a.appointment_date DESC;

-- Get all appointments for a specific date
SELECT a.*, c.customer_name, v.vehicle_registration, s.service_name
FROM appointments a
JOIN customers c ON a.customer_id = c.customer_id
JOIN vehicles v ON a.vehicle_id = v.vehicle_id
LEFT JOIN service_types s ON a.service_type_id = s.service_type_id
WHERE a.appointment_date = '2025-04-15'
ORDER BY a.appointment_time;

-- Get all pending appointments
SELECT a.*, c.customer_name, v.vehicle_registration, s.service_name
FROM appointments a
JOIN customers c ON a.customer_id = c.customer_id
JOIN vehicles v ON a.vehicle_id = v.vehicle_id
LEFT JOIN service_types s ON a.service_type_id = s.service_type_id
WHERE a.status = 'Pending'
ORDER BY a.appointment_date, a.appointment_time;

-- Get appointments by service type
SELECT a.*, c.customer_name, v.vehicle_registration
FROM appointments a
JOIN customers c ON a.customer_id = c.customer_id
JOIN vehicles v ON a.vehicle_id = v.vehicle_id
WHERE a.service_type_id = 1
ORDER BY a.appointment_date DESC;

-- Get appointment count by status
SELECT status, COUNT(*) as count
FROM appointments
GROUP BY status;

-- Get upcoming appointments (next 7 days)
SELECT a.*, c.customer_name, v.vehicle_registration, s.service_name
FROM appointments a
JOIN customers c ON a.customer_id = c.customer_id
JOIN vehicles v ON a.vehicle_id = v.vehicle_id
LEFT JOIN service_types s ON a.service_type_id = s.service_type_id
WHERE a.appointment_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)
ORDER BY a.appointment_date, a.appointment_time;

-- ============================================================================
-- 9. VERIFY DATA INTEGRITY
-- ============================================================================

-- Check for appointments without valid customer
SELECT * FROM appointments 
WHERE customer_id NOT IN (SELECT customer_id FROM customers);

-- Check for appointments without valid vehicle
SELECT * FROM appointments 
WHERE vehicle_id NOT IN (SELECT vehicle_id FROM vehicles);

-- Check for vehicles without valid customer
SELECT * FROM vehicles 
WHERE customer_id NOT IN (SELECT customer_id FROM customers);

-- ============================================================================
-- 10. RESET/CLEAN DATABASE (USE WITH CAUTION!)
-- ============================================================================

-- Delete all appointments (but keep customers, vehicles, services)
-- DELETE FROM appointments;

-- Reset auto-increment counter for appointments
-- ALTER TABLE appointments AUTO_INCREMENT = 1;

-- Delete all services (WARNING: Will cascade delete appointments!)
-- DELETE FROM service_types;

-- Delete all vehicles (WARNING: Will cascade delete appointments!)
-- DELETE FROM vehicles;

-- Delete all customers (WARNING: Will cascade delete vehicles and appointments!)
-- DELETE FROM customers;

-- ============================================================================
-- NOTES:
-- ============================================================================
-- 1. Always ensure customer_id exists before creating appointment
-- 2. Always ensure vehicle_id and customer_id match (vehicle belongs to customer)
-- 3. Service types are optional for appointments (can be NULL)
-- 4. Status values: 'Pending', 'Confirmed', 'Completed', 'Cancelled'
-- 5. Times should be in HH:MM:SS format (24-hour)
-- 6. Dates should be in YYYY-MM-DD format
-- 7. Use BEFORE deleting to check referential integrity
