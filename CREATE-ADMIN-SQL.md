# Direct SQL to Create Medusa Admin

## Step 1: Get Your Database URL
1. Go to Render Dashboard
2. Click on your PostgreSQL database
3. Copy the **External Database URL** (yes, external this time)

## Step 2: Use This Free Online Tool
1. Go to: https://www.adminer.org/en/editor/
2. Or download: https://www.adminer.org/downloads/

## Step 3: Connect to Database
- System: PostgreSQL
- Server: (from your database URL)
- Username: (from your database URL)
- Password: (from your database URL)
- Database: (from your database URL)

## Step 4: Run This SQL
```sql
-- First, let's see what tables exist
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Create a user with bcrypt password hash
INSERT INTO "user" (
    id,
    email,
    password_hash,
    metadata,
    created_at,
    updated_at
) VALUES (
    'usr_01J0123456789ABCDEF',
    'admin@indecisivewear.com',
    '$2b$10$AV4l1P9Z5V.2xlpKLmLkCe2kDbyqkCziWBNnGa03x3pFfJychXtYC',
    '{}',
    NOW(),
    NOW()
);

-- Password is: password123
-- Change it immediately after logging in!
```

## If "user" table doesn't exist, try:
```sql
-- Check for auth tables
SELECT * FROM auth_user LIMIT 1;

-- Or check what Medusa v2 actually created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%user%';
```