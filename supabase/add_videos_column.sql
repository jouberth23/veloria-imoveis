-- Execute no SQL Editor do Supabase para suportar múltiplos vídeos
ALTER TABLE imoveis ADD COLUMN IF NOT EXISTS videos TEXT[] DEFAULT '{}';
