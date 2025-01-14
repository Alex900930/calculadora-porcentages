'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"


export default function CalculadoraPorcentajes() {
  const [montoTotal, setMontoTotal] = useState('')
  const [numeroCuotas, setNumeroCuotas] = useState<number>(0)
  const [montoPorCuota, setMontoPorCuota] = useState<number>(0)
  const [cuotasSeleccionadas, setCuotasSeleccionadas] = useState<string[]>([])
  const [resultado, setResultado] = useState<string | null>(null)

  // Manejar el cambio en el input para el total de cuotas
  const manejarCambioTotalCuotas = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseInt(event.target.value, 10)
    setNumeroCuotas(isNaN(valor) ? 0 : valor)
    setCuotasSeleccionadas([])
  }

  const manejarMontoPorCuota = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseInt(event.target.value, 10)
    setMontoPorCuota(isNaN(valor) ? 0 : valor)
  }


  const manejarSeleccion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const seleccionada = event.target.value; // Obtener el valor seleccionado
    setCuotasSeleccionadas((prevSeleccionadas) => {
      if (prevSeleccionadas.includes(seleccionada)) {
        // Si ya está seleccionada, eliminarla
        return prevSeleccionadas.filter((cuota) => cuota !== seleccionada);
      } else {
        // Si no está seleccionada, agregarla
        return [...prevSeleccionadas, seleccionada];
      }
    });
  };
  

  /* const manejarSeleccion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const seleccionadas = Array.from(event.target.selectedOptions, (option) => option.value);
  
    setCuotasSeleccionadas((prevSeleccionadas) => {
      // Crear un nuevo conjunto con las selecciones previas y actuales
      const nuevasSeleccionadas = [...prevSeleccionadas];
  
      seleccionadas.forEach((opcion) => {
        if (!nuevasSeleccionadas.includes(opcion)) {
          nuevasSeleccionadas.push(opcion); // Agregar si no está en el arreglo
        }
      });
  
      // Asegurar que solo se mantengan elementos seleccionados actualmente en el <select>
      return nuevasSeleccionadas.filter((opcion) =>
        seleccionadas.includes(opcion) || prevSeleccionadas.includes(opcion)
      );
    });
  }; */
  
  // Generar dinámicamente las opciones del select
  const opcionesCuotas = Array.from({ length: numeroCuotas }, (_, index) => index + 1)

  const calcularMontoRestante = () => {
    const total = parseFloat(montoTotal)

    if (isNaN(total) || numeroCuotas <= 0 || cuotasSeleccionadas.length === 0) {
      setResultado('Por favor, insira valores válidos.')
      return
    }

    // Cálculo del monto pagado
    const calcularMontoPagado = () => {
      if (cuotasSeleccionadas.includes("36")) {
        return cuotasSeleccionadas.length * (montoPorCuota - 70 / 100); // Aplica descuento
      }
      return cuotasSeleccionadas.length * montoPorCuota; // Sin descuento
    };

    const montoPagado = calcularMontoPagado();
    const montoRestante = (total + 70*100) - montoPagado

    setResultado(`Você pagou $${montoPagado.toFixed(2)}. Valor restante a pagar: $${montoRestante.toFixed(2)}`)
  }

  const LimparButton = () => {
    setMontoTotal('');
    setNumeroCuotas(0);
    setCuotasSeleccionadas([]);
    setResultado(null);
    setMontoPorCuota(0);
  }

  return (
    <Card className="w-full max-w-md col-span-2 sm:col-span-1">
      <CardHeader>
        <CardTitle>Cálculo de Parcelas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          {/* Entrada del valor total */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="montoTotal">Valor Total</Label>
            <Input
              id="montoTotal"
              type="number"
              placeholder="Insira o valor total"
              value={montoTotal}
              onChange={(e) => setMontoTotal(e.target.value)}
            />
          </div>

          {/* Entrada del número de cuotas */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="numeroCuotas">Número total de parcelas</Label>
            <Input
              id="numeroCuotas"
              type="number"
              placeholder="Insira o número total de parcelas"
              value={numeroCuotas || ''}
              onChange={manejarCambioTotalCuotas}
            />
          </div>

           {/* Entrada del número de cuotas */}
           <div className="flex flex-col space-y-1.5">
            <Label htmlFor="montoPorCuota">Monto a pagar Mensual</Label>
            <Input
              id="montoPorCuota"
              type="number"
              placeholder="Insira o monto a pagar mensual"
              value={montoPorCuota || ''}
              onChange={manejarMontoPorCuota}
            />
          </div>

          {/* Select para seleccionar las cuotas */}
          {numeroCuotas > 0 && (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cuotasSeleccionadas">Seleccione as parcelas que deseja pagar</Label>
              <select
                id="cuotasSeleccionadas"
                multiple
                value={cuotasSeleccionadas}
                onChange={manejarSeleccion}
                className="border border-gray-300 p-2 rounded w-full h-32"
              >
                {opcionesCuotas.map((cuota) => (
                  <option key={cuota} value={cuota.toString()}>
                    Parcela {cuota}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Mostrar cuotas seleccionadas */}
          {cuotasSeleccionadas.length > 0 && (
            <div className='bg-slate-500'>
              <h2 className="text-lg font-semibold mb-2">Cuotas seleccionadas:</h2>
              <ul className="list-disc ml-6">
                {cuotasSeleccionadas.map((cuota) => (
                  <li key={cuota}>Parcela {cuota}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Botón para calcular */}
          <Button onClick={calcularMontoRestante}>Calcular</Button>

          {/* Botón para limpiar */}
          <Button onClick={LimparButton}>Limpar</Button>


          {/* Resultado */}
          {resultado && (
            <div className="mt-4 p-4 bg-gray-900 rounded-md">
              <p className="text-sm font-medium text-white">{resultado}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
