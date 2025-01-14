import React from 'react'

export default function Dica() {
  return (
    <div className="col-span-2 sm:col-span-1 max-w-sm bg-white shadow-lg rounded-lg overflow-hidden p-6">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">💡 Dica para Economizar</h2>
    <p className="text-gray-700 leading-relaxed">
      Quer pagar menos? Comece pagando a primeira parcela junto com a última! 
      Ao fazer isso, você recebe um desconto de <span className="font-bold text-green-600">até 70%</span> na última parcela. 
    </p>
    <p className="mt-4 text-gray-700 leading-relaxed">
      <span className="font-semibold">Exemplo:</span> Se cada parcela custa 
      <span className="font-bold text-gray-800"> R$ 100</span>, ao selecionar a última, 
      você terá um desconto de <span className="font-bold text-green-600">R$ 70</span>. 
      Assim, o valor total das duas parcelas seria <span className="font-bold text-gray-800">R$ 130</span> em vez de R$ 200.
    </p>
    <p className="mt-4 text-gray-600 italic">
      Aproveite essa oportunidade para economizar enquanto quita suas parcelas!
    </p>
  </div>
  )
}
