// home/page.tsx

import HeaderHome from './HeaderHome';
import FirstViewHome from './FirstViewHome';
import SecondViewHome from './SecondViewHome/SecondViewHome';
import FooterHome from './FooterHome';

export default function HomePage() {
    return (
        <div className="relative"> 
            
            <HeaderHome /> 
            
            <main> 
                {/* SOLUCIÓN CLAVE: Insertar FirstViewHome directamente. 
                    El padding debe ir en FirstViewHome o ajustarse a la altura del header fijo. 
                */}
                <FirstViewHome /> 

                <SecondViewHome />
            </main>
            
            <FooterHome />
        </div>
    );
}