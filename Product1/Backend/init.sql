-- Create schema

-- Create schema
CREATE SCHEMA IF NOT EXISTS advisors;

-- Create table user_information
CREATE TABLE IF NOT EXISTS advisors.user_information (
    user_id SERIAL PRIMARY KEY,
    user_first_name VARCHAR(255) NOT NULL,
    user_last_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_phone VARCHAR(20) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'utc')
);

-- Create table company_size
CREATE TABLE IF NOT EXISTS advisors.company_size (
    size_id SERIAL PRIMARY KEY,
    size_description VARCHAR(20) NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT true
);

-- Populate company_size table with predefined values
insert into advisors.company_size (size_description) values
('0-10'),
('11-20'),
('21-50'),
('50-100'),
('100+');


-- Create table company_information
CREATE TABLE IF NOT EXISTS advisors.company_information (
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    company_email VARCHAR(255) NOT NULL,
    company_country VARCHAR(255) NOT NULL,
    company_city VARCHAR(255) NOT NULL,
    company_phone VARCHAR(20) NOT NULL,
    user_id INTEGER NOT NULL,
    -- company_size_id INTEGER NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'utc'),
    FOREIGN KEY (user_id) REFERENCES advisors.user_information(user_id)
    -- FOREIGN KEY (company_size_id) REFERENCES advisors.company_size(size_id)
);
