import CalculadoraPorcentajes from "@/app/components/CalculadoraPorcentajes"
import Cover from "@/components/Cover";
import Dica from "./components/Dica";
import TitleComponente from "./components/TitleComponente";
import Image from "next/image";

export default function Home() {
  return (
    <>
     <Cover />
     <main className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-24">
     <div className="z-20 sm:w-fit fixed top-0 left-0 w-10">
        <Image src="/ImagenCalculadora.png" priority alt="Imagen Calculadora" width="200" height="200" />
     </div>
        <h1 className="text-4xl font-bold mb-8">Calculadora de Porcentagens de Parcelas</h1>
        <TitleComponente />
        <div className="grid grid-cols-2 gap-8">
          
          <CalculadoraPorcentajes />
          <Dica />
        </div>
      <div className="z-20 sm:w-fit fixed bottom-0 right-0 w-10">
        <Image src="/ImagenFondo.png" priority alt="Imagen Calculadora" width="200" height="200" />
     </div>  
     </main>
     

    </>

  );
}
