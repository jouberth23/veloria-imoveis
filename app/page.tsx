import { Hero }        from '@/components/sections/Hero'
import { Imoveis }     from '@/components/sections/Imoveis'
import { Categorias }  from '@/components/sections/Categorias'
import { Sobre }       from '@/components/sections/Sobre'
import { Servicos }    from '@/components/sections/Servicos'
import { Depoimentos } from '@/components/sections/Depoimentos'
import { Parceiros }   from '@/components/sections/Parceiros'
import { CTA }         from '@/components/sections/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Imoveis />
      <Categorias />
      <Sobre />
      <Servicos />
      <Depoimentos />
      <Parceiros />
      <CTA />
    </>
  )
}
