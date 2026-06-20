"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/shared/config/site";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative h-[600px] overflow-hidden md:h-[700px]">
      {heroSlides.map((item, index) => (
        <div
          key={item.id}
          aria-hidden={index !== current}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            index === current ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority={index === 0}
            loading={index === 0 ? undefined : "lazy"}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        </div>
      ))}

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div key={slide.id} className="max-w-2xl">
          <span className="mb-4 inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-accent">
            {slide.subtitle}
          </span>
          <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
            {slide.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-300 md:text-xl">
            {slide.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="accent" size="lg" asChild>
              <Link href={slide.cta.primary.href}>{slide.cta.primary.label}</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
              asChild
            >
              <Link href={slide.cta.secondary.href}>{slide.cta.secondary.label}</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={cn(
              "h-2 rounded-full transition-all",
              i === current ? "w-8 bg-accent" : "w-2 bg-white/40"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => setCurrent((prev) => (prev + 1) % heroSlides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </section>
  );
}
