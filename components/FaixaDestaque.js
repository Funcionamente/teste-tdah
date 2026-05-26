"use client";
import React from "react";
import { motion } from "framer-motion";

export default function FaixaDestaque() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full bg-[#f59e0b]/10 py-0 px-0 mt-60 text-center border-t border-[#f59e0b]/100"
    >
      <p className="text-white text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
        <strong className="text-[#f59e0b]">Aviso Importante: </strong>  
        Este questionário foi desenvolvido com base em referências amplamente utilizadas em estudos sobre atenção e comportamento, 
        incluindo instrumentos de autoavaliação como o ASRS v1.1.  
        Os resultados possuem caráter exclusivamente informativo e educacional, <strong>não constituindo diagnóstico médico, psicológico ou neuropsicológico</strong>.
        Para uma avaliação adequada, recomenda-se consultar um profissional de saúde habilitado.
      </p>
    </motion.section>
  );
}
