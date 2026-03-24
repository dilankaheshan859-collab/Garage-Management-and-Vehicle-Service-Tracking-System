-- Seed service_types if they do not already exist
INSERT INTO service_types (service_name, description, estimated_duration, cost, is_active, created_at, updated_at)
SELECT 'Oil Change', 'Regular oil and filter change', 30, 50.00, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM service_types WHERE service_name = 'Oil Change');

INSERT INTO service_types (service_name, description, estimated_duration, cost, is_active, created_at, updated_at)
SELECT 'Tire Rotation', 'Rotate and balance tires', 45, 60.00, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM service_types WHERE service_name = 'Tire Rotation');

INSERT INTO service_types (service_name, description, estimated_duration, cost, is_active, created_at, updated_at)
SELECT 'Brake Inspection', 'Inspect brake system', 30, 40.00, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM service_types WHERE service_name = 'Brake Inspection');

INSERT INTO service_types (service_name, description, estimated_duration, cost, is_active, created_at, updated_at)
SELECT 'Battery Replacement', 'Replace vehicle battery', 20, 80.00, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM service_types WHERE service_name = 'Battery Replacement');

INSERT INTO service_types (service_name, description, estimated_duration, cost, is_active, created_at, updated_at)
SELECT 'Engine Diagnostic', 'Full engine diagnostic test', 60, 100.00, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM service_types WHERE service_name = 'Engine Diagnostic');

INSERT INTO service_types (service_name, description, estimated_duration, cost, is_active, created_at, updated_at)
SELECT 'Air Filter Replacement', 'Replace engine air filter', 15, 25.00, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM service_types WHERE service_name = 'Air Filter Replacement');

INSERT INTO service_types (service_name, description, estimated_duration, cost, is_active, created_at, updated_at)
SELECT 'Transmission Service', 'Transmission fluid and filter change', 90, 150.00, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM service_types WHERE service_name = 'Transmission Service');

INSERT INTO service_types (service_name, description, estimated_duration, cost, is_active, created_at, updated_at)
SELECT 'Wheel Alignment', 'Align vehicle wheels', 60, 120.00, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM service_types WHERE service_name = 'Wheel Alignment');
