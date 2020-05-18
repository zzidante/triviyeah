BEGIN;

CREATE table schema_migrations (
  prefix TEXT,
  name VARCHAR NOT NULL,
  created_at TIMESTAMPTZ,
  status VARCHAR NOT NULL CONSTRAINT status_declared 
  CHECK ( 
    status IN (
      'up',
      'down',
      'deleted'
  	)
  )
);

-- This allows us to auto-generate the time prefix in tandem with setting the created_at
create or replace function generate_schema_migration_prefix() returns trigger as $$
declare 
  _now TIMESTAMPTZ := now() at time zone 'utc';
  _current_time TEXT;
begin

	SELECT to_char(_now, 'YYYYMMDDHHMISS') 
    INTO _current_time;
    
    NEW.prefix := _current_time;
    NEW.created_at := _now;
    
    return new;
end;
$$ language plpgsql;

CREATE TRIGGER generate_schema_migration_prefix_trigger
BEFORE INSERT ON schema_migrations
FOR EACH ROW
EXECUTE PROCEDURE generate_schema_migration_prefix();

COMMIT;
