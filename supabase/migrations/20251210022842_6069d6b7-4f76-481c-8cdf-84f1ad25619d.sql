-- Create storage bucket for watch images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('watch-images', 'watch-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow admins to upload images
CREATE POLICY "Admins can upload watch images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'watch-images' AND has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update watch images
CREATE POLICY "Admins can update watch images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'watch-images' AND has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to delete watch images
CREATE POLICY "Admins can delete watch images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'watch-images' AND has_role(auth.uid(), 'admin'::app_role));

-- Allow public to view watch images
CREATE POLICY "Anyone can view watch images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'watch-images');