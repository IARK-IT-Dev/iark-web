-- 1. SEED DATA PENGURUS (BIDANG & STRUKTURAL)
-- AMAN: Tidak perlu profile_id (relasi ke auth.users tidak wajib di tabel management)

INSERT INTO public.management (name, position, angkatan, role, photo, order_index)
VALUES
  -- Wakil Ketua Umum
  ('Fajar Sidiq', 'Wakil Ketua Umum', 'Angkatan 6', 'pengurus_inti', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80', 2),
  
  -- Tambahan Sekretariat
  ('Rina Amelia', 'Wakil Sekretaris Jenderal', 'Angkatan 7', 'pengurus_inti', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80', 4),
  ('Dimas Anggara', 'Wakil Bendahara', 'Angkatan 7', 'pengurus_inti', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', 6),

  -- Ketua Bidang (Untuk halaman /bidang)
  ('Arief Budiman', 'Ketua Bidang Kaderisasi', 'Angkatan 8', 'pengurus_inti', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', 10),
  ('Siti Nurhaliza', 'Ketua Bidang Sosial Masyarakat', 'Angkatan 9', 'pengurus_inti', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80', 11),
  ('Reza Rahadian', 'Ketua Bidang Media & Komunikasi', 'Angkatan 8', 'pengurus_inti', 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80', 12),
  ('Maya Putri', 'Ketua Bidang Kewirausahaan', 'Angkatan 7', 'pengurus_inti', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', 13),
  ('Eko Prasetyo', 'Ketua Bidang Hubungan Alumni', 'Angkatan 6', 'pengurus_inti', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', 14),
  ('Dinda Kanya', 'Ketua Bidang Pendidikan', 'Angkatan 9', 'pengurus_inti', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80', 15);
