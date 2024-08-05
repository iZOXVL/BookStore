"use client";

import { Icon } from "@/components/ui/icon";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { Spacer } from "@nextui-org/react";
import { icons } from "lucide-react";
interface sponsorsProps {
  img: string;
}

const sponsors: sponsorsProps[] = [
  {
    img: "/editorials/planeta.png",
  },
  {
    img: "/editorials/penguin.png",
  },
  {
    img: "/editorials/salama.png",
  },
  {
    img: "/editorials/utopia.png",
  },
  {
    img: "/editorials/penguin.png",
  },
  {
    img: "/editorials/planeta.png",
  },
  {
    img: "/editorials/penguin.png",
  },
  {
    img: "/editorials/salama.png",
  },
  {
    img: "/editorials/utopia.png",
  },
  {
    img: "/editorials/penguin.png",
  },
];

export const SponsorsSection = () => {
  return (
    <section id="books" className="max-w-[82%] mx-auto">

      <div className="mx-auto">
        <Marquee
          className="gap-[3rem]"
          fade
          innerClassName="gap-[3rem]"
          pauseOnHover
        >
          {sponsors.map(({ img }) => (
            <div
              key={img}
              className="flex items-center text-xl md:text-2xl font-medium"
            >
             <img src={img} alt="sponsor" className="h-8 w-32" />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
