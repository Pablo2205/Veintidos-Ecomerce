import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import Categories from '../components/Categories.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import Features from '../components/Features.jsx'
import Plans from '../components/Plans.jsx'
import Faq from '../components/Faq.jsx'
import CtaFinal from '../components/CtaFinal.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="bg-background text-primary pt-10 pb-6 border-b border-outlineVariant/20">
        <Marquee />
      </div>
      <Categories />
      <HowItWorks />
      <Features />
      <Plans />
      <Faq />
      <CtaFinal />
    </>
  )
}
