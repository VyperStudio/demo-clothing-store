
CREATE POLICY "public read noir-images" ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'noir-images');
CREATE POLICY "admins write noir-images" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'noir-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins update noir-images" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'noir-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins delete noir-images" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'noir-images' AND public.has_role(auth.uid(), 'admin'));
