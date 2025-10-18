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
      className="w-full bg-[#f59e0b]/10 py-0 px-0 mt-20 text-center border-t border-[#f59e0b]/20"
    >
      <p className="text-white text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
        <strong className="text-[#f59e0b]">Aviso Importante: </strong>  
        Este teste segue padrões reconhecidos internacionalmente para triagem de sintomas relacionados ao TDAH (ASRS v1.1), 
        mas <strong>não substitui uma avaliação clínica</strong>.  
        O resultado tem caráter informativo e não configura diagnóstico médico ou psicológico.  
        Em caso de dúvidas, procure um profissional de saúde especializado.
      </p>
    </motion.section>
  );
}
