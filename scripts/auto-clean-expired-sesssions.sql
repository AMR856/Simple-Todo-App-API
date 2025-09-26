CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.schedule(
  'session_cleanup',
  '*/30 * * * *',
  $$DELETE FROM sessions WHERE expires_at <= NOW();$$
);