import FirstContainer from "./FirstContainer";
import SecondContainer from "./SecondContainer";

export default function SecondViewHome() {
  return (
    // Quitamos la clase "h-screen" para que el contenedor crezca con su contenido
    // y aplicamos una estructura de flujo normal.
    <div className="flex flex-col py-10">
      
      {/* El FirstContainer ahora tiene su propio fondo (gray-100) y padding. */}
      <div>
        <FirstContainer />
      </div>
      
      {/* El SecondContainer tiene las características que ahora contrastarán con el fondo del FirstContainer. */}
      <div>
        <SecondContainer />
      </div>
    </div>
  );
}