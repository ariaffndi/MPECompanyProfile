import ScrollReveal from '@/components/website/scroll-reveal';
import ButtonTemplate from '../../button-template';
import { usePage, Link } from '@inertiajs/react';

type Company = {
    name: string;
    description: string;
};

const AboutJourney = () => {
   const { company } = usePage<{ company: Company }>().props;
  return (
      <section id="aboutJourney" className="flex w-full flex-col items-start gap-5 md:flex-row">
          <div className="aspect-video place-self-center md:w-2/5 md:place-self-start lg:pl-5">
              <div className="flex h-full items-center justify-center text-center md:text-start">
                  <ScrollReveal direction="right">
                      <h2 className="text-3xl font-light">OUR AMAZING</h2>
                      <h2 className="text-3xl font-bold">JOURNEY</h2>
                      <ButtonTemplate size="btn-md">
                          <Link href="#">Lets Talk</Link>
                      </ButtonTemplate>
                  </ScrollReveal>
              </div>
          </div>
          <div className="justify-end gap-5 md:w-3/5">
              <ScrollReveal direction="left">
                  <div className="my-6 text-lg leading-relaxed text-gray-700 dark:text-gray-50">
                      {company.description.split('.').map(s => s.trim()).map((sentence, index) => (
                        <p className='mb-4' key={index}>{sentence}</p>
                      ))}
                  </div>
              </ScrollReveal>
          </div>
      </section>
  );
}

export default AboutJourney