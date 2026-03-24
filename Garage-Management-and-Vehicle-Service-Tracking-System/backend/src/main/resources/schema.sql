/*-- 1) create DB if not exists
CREATE DATABASE IF NOT EXISTS GarageMS_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE GarageMS_db;*/

-- 2) Tables
CREATE TABLE IF NOT EXISTS holidays (
    id INT AUTO_INCREMENT PRIMARY KEY,
    holiday_date DATE NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customers (
    customer_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(50),
    postal_code VARCHAR(10),
    date_registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vehicles (
    vehicle_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vehicle_registration VARCHAR(50) UNIQUE NOT NULL,
    customer_id BIGINT NOT NULL,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    vehicle_year INT NOT NULL,
    color VARCHAR(30),
    vehicle_type VARCHAR(50),
    license_plate VARCHAR(20) UNIQUE,
    vin VARCHAR(17) UNIQUE,
    mileage INT DEFAULT 0,
    fuel_type VARCHAR(20),
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_vehicle_customer FOREIGN KEY (customer_id)
      REFERENCES customers(customer_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS service_types (
    service_type_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    estimated_duration INT,
    cost DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
    appointment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id BIGINT NOT NULL,
    customer_id BIGINT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    service_type_id BIGINT,
    status VARCHAR(20) DEFAULT 'PENDING',
    notes VARCHAR(500),
    cancellation_reason VARCHAR(500),
    assigned_mechanic VARCHAR(100),
    customer_email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_appointment_vehicle FOREIGN KEY (vehicle_id)
      REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
    CONSTRAINT fk_appointment_customer FOREIGN KEY (customer_id)
      REFERENCES customers(customer_id) ON DELETE CASCADE,
    CONSTRAINT fk_appointment_service FOREIGN KEY (service_type_id)
      REFERENCES service_types(service_type_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS service_history (
    service_history_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id BIGINT NOT NULL,
    appointment_id BIGINT,
    service_type_id BIGINT,
    service_date DATE NOT NULL,
    completion_date DATE,
    cost DECIMAL(10,2),
    mechanic_name VARCHAR(100),
    parts_used VARCHAR(500),
    notes VARCHAR(500),
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_history_vehicle FOREIGN KEY (vehicle_id)
      REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
    CONSTRAINT fk_history_appointment FOREIGN KEY (appointment_id)
      REFERENCES appointments(appointment_id) ON DELETE SET NULL,
    CONSTRAINT fk_history_service FOREIGN KEY (service_type_id)
      REFERENCES service_types(service_type_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS payments (
    payment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    appointment_id BIGINT,
    service_history_id BIGINT,
    customer_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(20) DEFAULT 'Cash',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'PENDING',
    reference_number VARCHAR(50),
    notes VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_payment_appointment FOREIGN KEY (appointment_id)
      REFERENCES appointments(appointment_id) ON DELETE SET NULL,
    CONSTRAINT fk_payment_history FOREIGN KEY (service_history_id)
      REFERENCES service_history(service_history_id) ON DELETE SET NULL,
    CONSTRAINT fk_payment_customer FOREIGN KEY (customer_id)
      REFERENCES customers(customer_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'Mechanic',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inventory (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    part_name VARCHAR(100) NOT NULL,
    part_code VARCHAR(50) UNIQUE,
    quantity INT DEFAULT 0,
    unit_price DECIMAL(10,2) NOT NULL,
    supplier VARCHAR(100),
    last_restock_date TIMESTAMP NULL,
    reorder_level INT DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

/*-- 3) Optional seed service types
INSERT INTO service_types (service_name, description, estimated_duration, cost) VALUES
('Oil Change', 'Regular oil and filter change', 30, 50.00),
('Tire Rotation', 'Rotate and balance tires', 45, 60.00),
('Brake Inspection', 'Inspect brake system', 30, 40.00),
('Battery Replacement', 'Replace vehicle battery', 20, 80.00),
('Engine Diagnostic', 'Full engine diagnostic test', 60, 100.00),
('Air Filter Replacement', 'Replace engine air filter', 15, 25.00),
('Transmission Service', 'Transmission fluid and filter change', 90, 150.00),
('Wheel Alignment', 'Align vehicle wheels', 60, 120.00)
ON DUPLICATE KEY UPDATE service_name=VALUES(service_name);*/