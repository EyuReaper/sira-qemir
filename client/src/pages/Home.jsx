import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import VANTA from 'vanta';
import * as THREE from 'three';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-6 text-center">
        <h2 className="mb-4 text-xl font-bold text-red-600 dark:text-red-400">የሆነ ስህተት ተከስቷል</h2>
        <p className="text-gray-700 dark:text-gray-300">{error.message}</p>
      </div>
    </div>
  );
}

function Home() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current && VANTA.CLOUDS) {
      try {
        vantaEffect.current = VANTA.CLOUDS({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          skyColor: 0x68b8d7,
          cloudColor: 0xc0c0d0,
          cloudShadowColor: 0x3b5a77,
          sunColor: 0xffa500,
          sunGlareColor: 0xff4500,
          sunlightColor: 0xf4a261,
          speed: 0.7,
        });
        console.log('Vanta.js Clouds initialized');
      } catch (error) {
        console.error('Vanta.js initialization failed:', error);
      }
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
        console.log('Vanta.js Clouds destroyed');
      }
    };
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div
        ref={vantaRef}
        className="flex items-center justify-center min-h-screen overflow-hidden bg-gray-100 dark:bg-gray-900"
      >
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900 dark:text-gray-100">እንኳን ወደ <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500'>ሥራቀምር </span>የተግባር መተግበሪያ በሰላም መጡ!</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">ተግባራቶቾን በቀላሉ ያደራጁ፣ ይቆጣጠሩ እና ይከታተሉ።</p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 text-white transition rounded-md bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
          >
            ግባ
          </Link>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Home;