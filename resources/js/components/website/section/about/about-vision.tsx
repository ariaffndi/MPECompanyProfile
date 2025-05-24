import AnimatedNumber from '@/components/animate-number';
import { BicepsFlexed, Cpu, Handshake, Leaf } from 'lucide-react';
import ScrollReveal from '../../scroll-reveal';

interface Props {
   yearsExperience: number;
   totalProject: number;
   totalPartner: number;
   totalTeam: number;
}

const AboutVision = ({ yearsExperience, totalProject, totalPartner, totalTeam }: Props) => {
   return (
      <section id="boutVision" className="my-20">
            <ScrollReveal direction="up">
               <div className="mb-5">
                  <h2 className="text-center text-3xl font-light">WE ALWAYS MAKE</h2>
                  <h2 className="text-center text-3xl font-bold">THE BEST</h2>
               </div>

               <div className="my-10 grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div className="duration-300 ease-in hover:scale-105">
                        <ScrollReveal direction="right">
                           <div className="justify-items-center p-2 text-center md:p-3 lg:p-4">
                              <Cpu size={80} className="mx-auto rounded-full bg-sky-200 p-4" />
                              <p className="text-md mt-2 lg:text-lg">Mendorong inovasi teknologi di bidang teknik lingkungan</p>
                           </div>
                        </ScrollReveal>
                  </div>
                  <div className="duration-300 ease-in hover:scale-105">
                        <ScrollReveal direction="right">
                           <div className="justify-items-center p-2 text-center md:p-3 lg:p-4">
                              <Handshake size={80} className="mx-auto rounded-full bg-sky-200 p-4" />
                              <p className="text-md mt-2 lg:text-lg">Menjaga kepercayaan dan kepuasan klien dalam setiap pekerjaan</p>
                           </div>
                        </ScrollReveal>
                  </div>
                  <div className="duration-300 ease-in hover:scale-105">
                        <ScrollReveal direction="left">
                           <div className="justify-items-center p-2 text-center md:p-3 lg:p-4">
                              <BicepsFlexed size={80} className="mx-auto rounded-full bg-sky-200 p-4" />
                              <p className="text-md mt-2 lg:text-lg">Bekerja keras, efektif, dan menghasilkan hasil terbaik</p>
                           </div>
                        </ScrollReveal>
                  </div>
                  <div className="duration-300 ease-in hover:scale-105">
                        <ScrollReveal direction="left">
                           <div className="justify-items-center p-2 text-center md:p-3 lg:p-4">
                              <Leaf size={80} className="mx-auto rounded-full bg-sky-200 p-4" />
                              <p className="text-md mt-2 lg:text-lg">Mengutamakan solusi teknis yang ramah lingkungan dan berkelanjutan</p>
                           </div>
                        </ScrollReveal>
                  </div>
               </div>

               <div className="my-10 grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div className="duration-300 ease-in hover:scale-105">
                        <div className="p-2 text-center md:p-3 lg:p-4">
                           <h2 className="mb-2 text-4xl font-bold lg:text-5xl">
                              <AnimatedNumber duration={2} value={typeof yearsExperience === 'number' ? yearsExperience : 0} />
                           </h2>
                           <p className="text-md lg:text-lg">Years Experience</p>
                        </div>
                  </div>
                  <div className="duration-300 ease-in hover:scale-105">
                        <div className="p-2 text-center md:p-3 lg:p-4">
                           <h2 className="mb-2 text-4xl font-bold lg:text-5xl">
                              <AnimatedNumber duration={2} value={typeof totalProject === 'number' ? totalProject : 0} />+
                           </h2>
                           <p className="text-md lg:text-lg">Total Project</p>
                        </div>
                  </div>
                  <div className="duration-300 ease-in hover:scale-105">
                        <div className="p-2 text-center md:p-3 lg:p-4">
                           <h2 className="mb-2 text-4xl font-bold lg:text-5xl">
                              <AnimatedNumber duration={2} value={typeof totalPartner === 'number' ? totalPartner : 0} />+
                           </h2>
                           <p className="text-md lg:text-lg">Number of Clients</p>
                        </div>
                  </div>
                  <div className="duration-300 ease-in hover:scale-105">
                        <div className="p-2 text-center md:p-3 lg:p-4">
                           <h2 className="mb-2 text-4xl font-bold lg:text-5xl">
                              <AnimatedNumber duration={2} value={typeof totalTeam === 'number' ? totalTeam : 0} />
                           </h2>
                           <p className="text-md lg:text-lg">Professional Team</p>
                        </div>
                  </div>
               </div>
            </ScrollReveal>
      </section>
   );
};

export default AboutVision;
