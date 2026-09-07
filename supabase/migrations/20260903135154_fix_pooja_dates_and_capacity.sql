-- Remove incorrectly seeded slots
DELETE FROM public.pooja_slots
WHERE slot_date BETWEEN '2026-08-27'::date AND '2026-09-06'::date;

-- Remove existing slots for the festival period
DELETE FROM public.pooja_slots
WHERE slot_date BETWEEN '2026-09-14'::date AND '2026-09-24'::date;

-- Create correct Pooja slots
-- 6 slots per day, 30 minutes each, capacity 50
INSERT INTO public.pooja_slots (
  slot_date,
  start_time,
  end_time,
  capacity
)
SELECT
  d::date,
  t::time,
  (t::time + interval '30 minutes')::time,
  50
FROM generate_series(
  '2026-09-14'::date,
  '2026-09-24'::date,
  '1 day'
) AS d
CROSS JOIN unnest(
  ARRAY[
    '18:00'::time,
    '18:30'::time,
    '19:00'::time,
    '19:30'::time,
    '20:00'::time,
    '20:30'::time
  ]
) AS t;