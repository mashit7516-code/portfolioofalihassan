"use client";
import React from "react";
import Image from "next/image";

export default function AnimatedOrbit3DFixed() {
  const logos = [
    "/html.svg",
    "/css.svg",
    "/js.svg",
    "/react.svg",
    "/next.svg",
    "/tailwind.svg",
    "/node.svg",
    "/mongo.svg",
    "/git.svg",
    "github.svg"
  ];
  const name =[
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "MongoDB",
    "Git",
    "GitHub"
  ]

  return (
    <div className="relative w-96 h-96 mx-auto perspective-1000">
      {/* Center Image (Fixed, larger) */}
      <div className=" relative w-fit top-[154px] left-[200px] transform -translate-z-2 -translate-x-1/2 -translate-y-1/2 z-20">
        <Image
          src="/me.png"
          alt="Me"
          width={200}
          height={200}
          className="rounded-full border-4 border-cyan-400 shadow-lg object-cover"
        />
      </div>

      {/* Orbiting Logos */}
      <div className="absolute top-30 inset-0">
        <div className="orbit-3d w-full h-full relative">
          {logos.map((logo, index) => {
            const angle = (360 / logos.length) * index;
            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(160px) rotateY(-${angle}deg)`,
                }}
              >
                <Image
                  src={logo}
                  alt="Logo"
                  width={50}
                  height={50}
                  className="rounded-full shadow-[#00ffff] border border-black p-0.5 shadow-md"
                />
                <span>{name[index]}</span>
               </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
