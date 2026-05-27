-- ============================================================
-- Velória Imóveis — Tabela de Configurações do Site
-- Execute no SQL Editor do Supabase
-- ============================================================

CREATE TABLE IF NOT EXISTS configuracoes (
  chave TEXT PRIMARY KEY,
  valor TEXT NOT NULL DEFAULT ''
);

-- Dados iniciais
INSERT INTO configuracoes (chave, valor) VALUES
  ('whatsapp_number', '5531999999999'),
  ('instagram_url', ''),
  ('facebook_url', ''),
  ('linkedin_url', ''),
  ('telefone', '(31) 9 9999-9999'),
  ('email', 'contato@veloriaimoveis.com.br'),
  ('endereco', 'Av. Getúlio Vargas, 1.250 · Savassi, Belo Horizonte – MG'),
  ('horario', 'Seg–Sex: 8h–18h · Sáb: 9h–13h'),
  ('creci', 'CRECI-MG 12.345-J')
ON CONFLICT (chave) DO NOTHING;

-- RLS
ALTER TABLE configuracoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_configuracoes" ON configuracoes
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "service_role_all_configuracoes" ON configuracoes
  USING (auth.role() = 'service_role');
