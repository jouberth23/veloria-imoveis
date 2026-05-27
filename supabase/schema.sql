-- ============================================================
-- Velória Imóveis — Schema Supabase
-- Execute no SQL Editor do Supabase
-- ============================================================

-- Tabela principal de imóveis
CREATE TABLE IF NOT EXISTS imoveis (
  id            UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  slug          TEXT         UNIQUE NOT NULL,
  titulo        TEXT         NOT NULL,
  descricao     TEXT,
  preco         NUMERIC,
  preco_aluguel NUMERIC,
  bairro        TEXT         NOT NULL,
  cidade        TEXT         NOT NULL DEFAULT 'Belo Horizonte',
  area          INTEGER,
  quartos       INTEGER,
  suites        INTEGER,
  vagas         INTEGER,
  tipo          TEXT         NOT NULL CHECK (tipo IN ('Venda', 'Aluguel', 'Lançamento')),
  status        TEXT         NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
  destaque      BOOLEAN      NOT NULL DEFAULT false,
  imagens       TEXT[],
  video_url     TEXT,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER imoveis_updated_at
  BEFORE UPDATE ON imoveis
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS: habilitar segurança por linha
ALTER TABLE imoveis ENABLE ROW LEVEL SECURITY;

-- Leitura pública apenas de imóveis ativos
CREATE POLICY "public_read_active" ON imoveis
  FOR SELECT TO anon, authenticated
  USING (status = 'ativo');

-- Service role tem acesso total (usado pelo admin)
CREATE POLICY "service_role_all" ON imoveis
  USING (auth.role() = 'service_role');

-- ============================================================
-- Storage bucket para imagens dos imóveis
-- ============================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'imoveis',
  'imoveis',
  true,
  52428800,  -- 50MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']
)
ON CONFLICT (id) DO NOTHING;

-- Policy: leitura pública do bucket
CREATE POLICY "public_read_imoveis_storage" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'imoveis');

-- Policy: service role pode inserir/deletar (admin)
CREATE POLICY "service_role_write_imoveis_storage" ON storage.objects
  FOR ALL TO service_role
  USING (bucket_id = 'imoveis');
