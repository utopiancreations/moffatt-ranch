
-- Create a secure function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_user_admin(user_id_param UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM admin_users
        WHERE user_id = user_id_param
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
