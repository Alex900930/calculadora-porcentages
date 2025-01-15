import React from 'react'

export default function Dica() {
  return (
    <div className="col-span-2 sm:col-span-1 max-w-sm bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">💡 Dica para Economizar</h2>
      <p className="text-gray-700 leading-relaxed">
        Quer pagar menos? Comece pagando a primeira parcela junto com a última! 
        Ao fazer isso, você recebe um desconto de <span className="font-bold text-green-600">até 70%</span> na última parcela. 
      </p>
      
      {/* Ejemplo práctico */}
      <p className="mt-4 text-gray-700 leading-relaxed">
        <span className="font-semibold">Exemplo prático:</span><br />
        Se a moto custa <span className="font-bold text-gray-800">R$ 10.000</span> (e com os juros se torna R$ 17.000) e o valor das parcelas é de <span className="font-bold text-gray-800">R$ 1.700</span>, veja como a antecipação de duas parcelas pode ajudar:
      </p>
      
      <div className="mt-4 text-gray-700 leading-relaxed">
        <strong>Sem desconto:</strong><br />
        1.700 × 2 = <span className="font-bold text-gray-800">R$ 3.400</span>
      </div>
      
      <div className="mt-4 text-gray-700 leading-relaxed">
        <strong>Com desconto:</strong><br />
        1.700 + (1.700 × 0.3) = <span className="font-bold text-gray-800">R$ 2.210</span>
      </div>

      <div className="mt-4 text-gray-700 leading-relaxed">
        <strong>Ahorro:</strong><br />
        R$ 3.400 - R$ 2.210 = <span className="font-bold text-green-600">R$ 1.190</span> (economia em dinheiro) e <span className="font-bold text-green-600">1 mês</span> (economia de tempo).
      </div>

      <p className="mt-4 text-gray-600 italic">
        Aproveite essa oportunidade para economizar enquanto quita suas parcelas!
      </p>
    </div>
  )
}
