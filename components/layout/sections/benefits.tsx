import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "BookOpen",
    title: "Expande tu conocimiento",
    description:
      "Leer regularmente aumenta tu conocimiento sobre una variedad de temas, lo que puede ser útil en tu vida personal y profesional.",
  },
  {
    icon: "Brain",
    title: "Mejora tu capacidad cognitiva",
    description:
      "La lectura estimula tu cerebro y mejora tu memoria, concentración y habilidades de pensamiento crítico.",
  },
  {
    icon: "Heart",
    title: "Reduce el estrés",
    description:
      "Leer es una excelente forma de relajarse y escapar del estrés diario, proporcionando una sensación de calma y bienestar.",
  },
  {
    icon: "Users",
    title: "Fomenta la empatía",
    description:
      "Leer historias y experiencias de otras personas te ayuda a comprender y sentir empatía por sus emociones y perspectivas.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-24">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Beneficios</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Los beneficios de leer
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            La lectura ofrece una amplia gama de beneficios que pueden mejorar tu vida de muchas maneras. Desde la expansión del conocimiento hasta la mejora de la salud mental, descubre por qué leer es una de las mejores actividades que puedes incorporar a tu rutina diaria.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
