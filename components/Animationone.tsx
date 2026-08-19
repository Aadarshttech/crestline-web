'use client';
import ScrollBaseAnimation from './ui/scroll-text-marque';
import React from 'react';

function Animationone() {
  return (
    <>
      <div className='h-[500px] grid place-content-center overflow-hidden bg-black text-white text-6xl md:text-8xl lg:text-9xl'>
        <ScrollBaseAnimation
          delay={500}
          baseVelocity={-3}
          clasname='font-bold tracking-[-0.07em] leading-[90%]'
        >
          Star the repo if you like it
        </ScrollBaseAnimation>
        <ScrollBaseAnimation
          delay={500}
          baseVelocity={3}
          clasname='font-bold tracking-[-0.07em] leading-[90%]'
        >
          Share it if you like it
        </ScrollBaseAnimation>
      </div>
    </>
  );
}

export default Animationone;
