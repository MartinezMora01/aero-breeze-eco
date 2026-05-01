DROP POLICY IF EXISTS "Anyone can submit contact requests" ON public.contact_requests;

CREATE POLICY "Anyone can submit valid contact requests"
ON public.contact_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(name)) BETWEEN 1 AND 100
  AND length(trim(email)) BETWEEN 5 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(trim(message)) BETWEEN 5 AND 2000
  AND (phone IS NULL OR length(phone) <= 30)
);