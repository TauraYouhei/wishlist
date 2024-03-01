import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://qxcsrnquzswriawexpni.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4Y3NybnF1enN3cmlhd2V4cG5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2NTg2MDMsImV4cCI6MjAyNDIzNDYwM30.yr9gQjpJO20kK9nkUqXRXbqLFMjz8_pgcisbnUtjhGE'
)
