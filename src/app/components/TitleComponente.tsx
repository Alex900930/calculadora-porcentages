"use client"
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

export default function TitleComponente() {
  return (
    <TypeAnimation
      sequence={[
        'Simule suas parcelas facilmente!',
        5000,
        'Descubra quanto você pode economizar.',
        5000,
        'Economize até 70% na última parcela!',
        5000,
      ]}
      speed={50}
      className="text-lg font-bold mb-8 text-white shadow-lg"
      repeat={Infinity}
    />
  );
}
