-- as `to_regclass` returns the string NULL if there's no match, we need to do this 
-- crazy excess stuff to essentially perform a `does this name exist in the regclass?`
--

WITH reg_class_normalized AS (
  SELECT
    NULLIF(
      to_regclass('public.schema_migrations')::TEXT,
	    'NULL'
    ) AS exists
) 
            
SELECT EXISTS(
  SELECT 1 FROM reg_class_normalized WHERE exists IS NOT NULL
);
