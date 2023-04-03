INSERT INTO public.role (id, role_name) VALUES (1, 'SUPER_USER') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.role (id, role_name) VALUES (2, 'USER') ON CONFLICT (id) DO NOTHING;