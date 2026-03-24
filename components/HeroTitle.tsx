'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

interface HeroTitleProps {
  line1: string;
  line2: string;
}

export default function HeroTitle({ line1, line2 }: HeroTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const split1 = SplitText.create(line1Ref.current!, { type: 'chars' });
      const split2 = SplitText.create(line2Ref.current!, { type: 'chars' });

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Line 1: chars fly in from below with 3D rotation
      tl.from(split1.chars, {
        y: 80,
        rotateX: -90,
        opacity: 0,
        stagger: 0.03,
        duration: 1,
      });

      // Line 2: chars arrive with slight delay, same effect + glow pulse
      tl.from(
        split2.chars,
        {
          y: 80,
          rotateX: -90,
          opacity: 0,
          stagger: 0.03,
          duration: 1,
        },
        '-=0.6'
      );

      // Glow pulse on the orange stroke line after it lands
      tl.fromTo(
        line2Ref.current,
        { filter: 'drop-shadow(0 0 0px #f97316)' },
        {
          filter: 'drop-shadow(0 0 20px #f97316)',
          duration: 0.6,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
        },
        '-=0.3'
      );
    },
    { scope: containerRef }
  );

  return (
    <h1
      ref={containerRef}
      className="font-display font-bold uppercase leading-[0.9] mb-8"
      style={{
        fontSize: 'clamp(36px, 8vw, 96px)',
        perspective: '800px',
      }}
    >
      <span
        ref={line1Ref}
        className="block text-white"
        style={{
          textShadow:
            '1px 1px 0 rgba(0,0,0,0.4), 2px 2px 0 rgba(0,0,0,0.3), 3px 3px 0 rgba(0,0,0,0.2), 4px 4px 8px rgba(0,0,0,0.3)',
        }}
      >
        {line1}
      </span>
      <span
        ref={line2Ref}
        className="block"
        style={{
          color: '#f97316',
          textShadow: '0 0 30px rgba(249,115,22,0.3)',
        }}
      >
        {line2}
      </span>
    </h1>
  );
}
