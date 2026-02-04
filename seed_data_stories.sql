-- SQL Script untuk Seed Stories (Otomatis ambil author_id valid)

DO $$
DECLARE
  v_author_id uuid;
BEGIN
  -- 1. Ambil ID user pertama yang ditemukan di auth.users limit 1
  SELECT id INTO v_author_id FROM auth.users LIMIT 1;

  -- 2. Jika tidak ada user, hentikan proses (harus signup dulu minimal 1 user)
  IF v_author_id IS NULL THEN
    RAISE NOTICE 'Skipping seed stories: No users found in auth.users table. Please sign up a user first.';
    RETURN;
  END IF;

  -- 3. Pastikan user tersebut punya profile (insert only if not exists)
  INSERT INTO public.profiles (id, name, email, role, created_at, updated_at)
  SELECT 
    v_author_id, 
    'Admin Redaksi', 
    email, 
    'admin', 
    NOW(), 
    NOW()
  FROM auth.users WHERE id = v_author_id
  ON CONFLICT (id) DO NOTHING;

  -- 4. Insert stories menggunakan ID tersebut
  INSERT INTO public.stories (title, slug, excerpt, content, category, author_id, hero_image, status, published_at, created_at, updated_at)
  VALUES
  (
    'Membangun Startup Edukasi di Pelosok Negeri',
    'membangun-startup-edukasi-pelosok-negeri',
    'Kisah inspiratif Fakhri, alumni angkatan 5 yang mendedikasikan dirinya untuk pemerataan pendidikan.',
    '<p>Pendidikan adalah hak segala bangsa...</p>',
    'pengabdian',
    v_author_id,
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
    'published',
    NOW(),
    NOW(),
    NOW()
  ),
  (
    'Kepemimpinan Profetik di Era Disrupsi Digital',
    'kepemimpinan-profetik-era-disrupsi',
    'Bagaimana nilai-nilai luhur tetap relevan menghadapi tantangan zaman modern dan teknologi AI.',
    '<p>Di tengah gempuran teknologi...</p>',
    'kepemimpinan',
    v_author_id,
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    'published',
    NOW(),
    NOW(),
    NOW()
  ),
  (
    'Tips Sukses Meraih Beasiswa LPDP Luar Negeri',
    'tips-sukses-beasiswa-lpdp',
    'Sharing session eksklusif dari para awardee alumni RK yang sedang menempuh studi di Eropa.',
    '<p>Persiapan adalah kunci...</p>',
    'akademik',
    v_author_id,
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80',
    'published',
    NOW(),
    NOW(),
    NOW()
  );

  RAISE NOTICE 'Successfully seeded stories using author_id: %', v_author_id;
END $$;
