'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FaCalculator, FaRedoAlt, FaMoneyBillWave, FaListAlt } from 'react-icons/fa';
import { Bounce, ToastContainer, toast } from 'react-toastify';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { MultiValue } from 'react-select';

// Definir una interfaz para el resultado del cálculo
interface ResultadoCalculo {
  ahorroDinero: number;
  ahorroTiempo: number;
  montoRealPago: number;
}

export default function CalculadoraPorcentajes() {
  const [montoTotal, setMontoTotal] = useState('')
  const [numeroCuotas, setNumeroCuotas] = useState<number>(0)
  const [montoPorCuota, setMontoPorCuota] = useState<number>(0)
  const [cuotasSeleccionadas, setCuotasSeleccionadas] = useState<string[]>([])
  const [resultado, setResultado] = useState<string | null>(null)

  const animatedComponents = makeAnimated();

  const manejarCambioTotalCuotas = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseInt(event.target.value, 10)
    setNumeroCuotas(isNaN(valor) ? 0 : valor)
    setCuotasSeleccionadas([])
  }

  const manejarMontoPorCuota = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseInt(event.target.value, 10)
    setMontoPorCuota(isNaN(valor) ? 0 : valor)
  }

  const manejarSeleccion = (seleccionados: MultiValue<{ label: string; value: string }>) => {
    if (!seleccionados || seleccionados.length === 0) {
      toast.info('⚠️ Por favor, seleccione al menos una parcela antes de continuar!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
      return;
    }
    
    // Si hay seleccionados, actualizamos el estado
    setCuotasSeleccionadas(seleccionados.map((op) => op.value));
  };
  
// Función con tipos definidos
const calcularAhorro = (
  montoPorCuota: number,
): ResultadoCalculo => {
  // Calcular monto original total (sin descuento) para las dos cuotas
  const montoOriginalTotal = montoPorCuota * 2;
  // Calcular monto real que paga ahora (con descuento en la última cuota)
  const montoRealPago = montoPorCuota + (montoPorCuota * 0.3);
  // Ahorro en dinero
  const ahorroDinero = montoOriginalTotal - montoRealPago;
  // Ahorro en tiempo (número de meses adelantados)
  const ahorroTiempo = 1; // Solo se adelanta una cuota
  return { ahorroDinero, ahorroTiempo, montoRealPago };
};

// Función principal con tipos definidos
const calcularMontoRestante = (): void => {
  const total = parseFloat(montoTotal);
 
  if (isNaN(total) || total <= 0) {
    /* setResultado('Por favor, insira um valor total válido.'); */
    toast.info('Por favor, insira um valor total válido!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
    return;
  }
  
  if (numeroCuotas <= 0) {
    /* setResultado('Por favor, insira um número válido de parcelas.'); */
    toast.info('Por favor, insira um número válido de parcelas!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
    return;
  }
  
  if (montoPorCuota <= 0) {
    /* setResultado('Por favor, insira um valor válido para a parcela mensal.'); */
    toast.info('Por favor, insira um valor válido para a parcela mensal!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
    return;
  }

  if (cuotasSeleccionadas.length <= 0) {
    /* setResultado('Por favor, insira um valor válido para a parcela mensal.'); */
    toast.info('⚠️ Por favor, seleccione al menos una parcela antes de continuar!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
    return;
  }

  if (cuotasSeleccionadas.length == 1) {
  
    toast.success('Você está em dia!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
    return;
  }
  
     // Convertir las cuotas seleccionadas a números para manipulación
  const cuotasNumeros = cuotasSeleccionadas.map((cuota) => parseInt(cuota, 10));
  cuotasNumeros.sort((a, b) => a - b); // Ordenar cuotas seleccionadas

  // Comprobar si seleccionaron la primera y última cuota
  if (
    cuotasNumeros[0] === 1 &&
    cuotasNumeros[cuotasNumeros.length - 1] === numeroCuotas
  ) {
    const { ahorroDinero, ahorroTiempo, montoRealPago } = calcularAhorro(montoPorCuota);
    const totalFinal = (total * 1.7) - montoRealPago;

    toast.success(`Você pagou antecipadamente e economizou R$${ahorroDinero.toFixed(2)} e ${ahorroTiempo} mês. 
      Valor restante a pagar: R$${totalFinal.toFixed(2)}.`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });

  } else {
    // Si no seleccionaron la primera y última cuota
   
    toast.success(`Não há descontos disponíveis para as parcelas selecionadas. Pague normalmente.`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
    });

  }

};

    
  const LimparButton = () => {
    setMontoTotal('');
    setNumeroCuotas(0);
    setCuotasSeleccionadas([]);
    setResultado(null);
    setMontoPorCuota(0);
  }

  return (
   
    <>
    
     <Card className="w-full max-w-md col-span-2 sm:col-span-1 z-10 shadow-lg rounded-lg border border-gray-200">
      <CardHeader className=" rounded-t-lg p-4">
        <CardTitle className="flex items-center gap-2">
          <FaCalculator />
          Cálculo de Parcelas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          {/* Entrada del valor total */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="montoTotal" className="flex items-center gap-2">
              <FaMoneyBillWave />
              Valor Total
            </Label>
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
            <Label htmlFor="montoPorCuota" className="flex items-center gap-2">
              <FaMoneyBillWave />
              Monto a pagar Mensual
            </Label>
            <Input
              id="montoPorCuota"
              type="number"
              placeholder="Insira o monto a pagar mensal"
              value={montoPorCuota || ''}
              onChange={manejarMontoPorCuota}
            />
          </div>

          {/* Entrada del número de cuotas */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="numeroCuotas" className="flex items-center gap-2">
              <FaListAlt />
              Número total de parcelas
            </Label>
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
              <Label htmlFor="cuotasSeleccionadas" className="flex items-center gap-2">
                <FaListAlt />
                Seleccione as parcelas que deseja pagar
              </Label>

              <Select
                id="cuotasSeleccionadas"
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={Array.from({ length: numeroCuotas }, (_, i) => ({
                value: (i + 1).toString(),
                label: `Parcela ${i + 1}`,
                }))}
                onChange={(seleccionados) => manejarSeleccion(seleccionados as MultiValue<{ label: string; value: string }>)}
                className="border border-gray-300 p-2 rounded w-full"
              />

            </div>
          )}

          {/* Botón para calcular */}
          <Button onClick={calcularMontoRestante} className="bg-green-600 hover:bg-green-700">
            <FaCalculator className="mr-2" />
            Calcular
          </Button>

          {/* Botón para limpiar */}
          <Button onClick={LimparButton} className="bg-red-600 hover:bg-red-700">
            <FaRedoAlt className="mr-2" />
            Limpar
          </Button>

          {/* Resultado */}
          {resultado && (
            <div className="mt-4 p-4 bg-gray-900 rounded-md">
              <p className="text-sm font-medium text-white">{resultado}</p>
            </div>
          )}
        </div>
      </CardContent>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </Card>
    
    </>
  )
}
