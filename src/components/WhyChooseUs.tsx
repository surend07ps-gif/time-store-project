import { Shield, Award, Clock, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: Shield,
    title: "Authenticity",
    description: "Every piece certified",
  },
  {
    icon: Award,
    title: "Expert Curation",
    description: "Hand-selected collection",
  },
  {
    icon: Clock,
    title: "Heritage",
    description: "40 years of excellence",
  },
  {
    icon: Sparkles,
    title: "Pristine",
    description: "Immaculate condition",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-8 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-6 md:mb-10">
            <p className="text-[10px] md:text-xs tracking-[0.2em] text-primary uppercase mb-2">
              Our Promise
            </p>
            <h2 className="font-display text-xl md:text-4xl">Why Choose Us</h2>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} variant="fadeUp" delay={index * 0.1}>
              <div className="text-center p-4 md:p-6">
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-primary/10 mb-3 md:mb-4">
                  <feature.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="font-display text-sm md:text-lg mb-1 md:mb-2">{feature.title}</h3>
                <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
