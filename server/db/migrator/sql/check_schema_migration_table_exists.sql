SELECT EXISTS(
  SELECT to_regclass('public.migrations')
);
