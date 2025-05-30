import ScrollReveal from '@/components/website/scroll-reveal';

const PortofolioDescription = () => {

   const description: string =
       'Kami telah menyelesaikan berbagai proyek strategis di bidang lingkungan dan infrastruktur, mulai dari studi kelayakan hingga perencanaan dan pemantauan lingkungan. Setiap proyek kami tangani dengan pendekatan profesional dan berbasis data, guna memastikan solusi yang berkelanjutan dan sesuai regulasi. Komitmen kami adalah memberikan hasil kerja terbaik yang tidak hanya memenuhi kebutuhan klien, tetapi juga berkontribusi positif terhadap lingkungan dan masyarakat.';

  return (
      <section id="portofolioDescription" className="flex w-full flex-col items-start gap-5 md:flex-row">
          <div className="aspect-video place-self-center md:w-2/5 md:place-self-start lg:pl-5">
              <div className="flex h-full items-center justify-center text-center md:text-start">
                  <ScrollReveal direction="right">
                      <h2 className="text-3xl font-light">EXPLORE</h2>
                      <h2 className="text-3xl font-bold">OUR PROJECT</h2>
                  </ScrollReveal>
              </div>
          </div>
          <div className="justify-end gap-5 md:w-3/5">
              <ScrollReveal direction="left">
                  <div className="my-6 text-lg leading-relaxed text-gray-700 dark:text-gray-50">
                      {description.split('.').map(s => s.trim()).map((sentence, index) => (
                        <p className='mb-4' key={index}>{sentence}</p>
                      ))}
                  </div>
              </ScrollReveal>
          </div>
      </section>
  );
}

export default PortofolioDescription