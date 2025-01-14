'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { MultiValue } from 'react-select';

export default function CalculadoraPorcentajes() {
  const [montoTotal, setMontoTotal] = useState('')
  const [numeroCuotas, setNumeroCuotas] = useState<number>(0)
  const [montoPorCuota, setMontoPorCuota] = useState<number>(0)
  const [cuotasSeleccionadas, setCuotasSeleccionadas] = useState<string[]>([])
  const [resultado, setResultado] = useState<string | null>(null)

  const animatedComponents = makeAnimated();

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

  const valoresSeleccionados = cuotasSeleccionadas.map((cuota) => ({
    value: cuota,
    label: `Parcela ${cuota}`,
  }));

  const manejarSeleccion = (seleccionados: MultiValue<{ label: string; value: string }>) => {
    setCuotasSeleccionadas(seleccionados ? seleccionados.map((op) => op.value) : []);
  };
  
      
  // Generar dinámicamente las opciones del select
  const opcionesCuotas = Array.from({ length: numeroCuotas }, (_, index) => index + 1)

 /*  const calcularMontoRestante = () => {
    const total = parseFloat(montoTotal)

    if (isNaN(total) || numeroCuotas <= 0 || cuotasSeleccionadas.length === 0) {
      setResultado('Por favor, insira valores válidos.')
      return
    }

    // Cálculo del monto pagado
    const calcularMontoPagado = () => {
     
      if (cuotasSeleccionadas.includes(String(numeroCuotas))) {
        console.log("Estos son los valores que recibio",
           "Cuotas selecionadas: ",cuotasSeleccionadas,
            "montoPorCuota: ", montoPorCuota,
             "numeroCuotas :", numeroCuotas);
        return cuotasSeleccionadas.length * (montoPorCuota - 70 / 100); // Aplica descuento
      }
      return cuotasSeleccionadas.length * montoPorCuota; // Sin descuento
    };

    const montoPagado = calcularMontoPagado();
    const montoRestante = (total + 70*100) - montoPagado

    setResultado(`Você pagou $${montoPagado.toFixed(2)}. Valor restante a pagar: $${montoRestante.toFixed(2)}`)
  } */

    const calcularMontoRestante = () => {
      const total = parseFloat(montoTotal);
    
      if (isNaN(total) || numeroCuotas <= 0 || cuotasSeleccionadas.length === 0) {
        setResultado('Por favor, insira valores válidos.');
        return;
      }
    
      // Verificar si la última cuota está seleccionada
      const ultimaCuota = String(numeroCuotas);
          
      // Calcular el monto pagado
      const calcularMontoPagado = () => {
        return cuotasSeleccionadas.reduce((acumulado, cuota) => {
          if (cuota === ultimaCuota) {
            // Aplica descuento del 70% en la última cuota
            return acumulado + montoPorCuota * 0.3; // 30% del monto (descuento aplicado)
          }
          // Cuotas normales sin descuento
          return acumulado + montoPorCuota;
        }, 0);
      };
    
      const montoPagado = calcularMontoPagado();
      const montoRestante = (total + 70*100) - montoPagado
    
      // Mostrar resultado
      setResultado(
        `Você pagou R$${montoPagado.toFixed(2)}. Valor restante a pagar: R$${montoRestante.toFixed(2)}`
      );
    };
    

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

           {/* Entrada del monto a pagar */}
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

          {/* Select para seleccionar las cuotas */}
          {numeroCuotas > 0 && (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cuotasSeleccionadas">Seleccione as parcelas que deseja pagar</Label>
              
              <Select
                id="cuotasSeleccionadas"
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={valoresSeleccionados}
                isMulti
                options={opcionesCuotas.map((cuota) => ({
                  value: cuota.toString(),
                  label: `Parcela ${cuota}`,
                }))}
                onChange={manejarSeleccion}
                className="border border-gray-300 p-2 rounded w-full"
              />
                             
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
