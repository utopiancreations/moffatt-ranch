
-- This SQL function helps find orders by partial ID.
-- Add this to your Supabase SQL editor:

CREATE OR REPLACE FUNCTION find_order_by_partial_id(partial_id TEXT)
RETURNS UUID[] AS $$
BEGIN
  RETURN ARRAY(
    SELECT id FROM public.orders
    WHERE id::text LIKE '%' || partial_id || '%'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
