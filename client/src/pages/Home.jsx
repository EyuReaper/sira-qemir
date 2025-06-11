import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// Error Fallback Component
function ErrorFallback({ error }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-6 text-center shadow-lg rounded-lg bg-white dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-extrabold text-red-600 dark:text-red-400">የሆነ ስህተት ተከስቷል!</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg">{error.message}</p>
        <p className="mt-4 text-gray-500 dark:text-gray-400">እባክዎ ቆይተው እንደገና ይሞክሩ።</p>
      </div>
    </div>
  );
}

// Home Component
function Home() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    // Check if VANTA and CLOUDS effect are available before initializing
    if (!vantaEffect.current && window.VANTA && window.VANTA.CLOUDS) {
      try {
        vantaEffect.current = window.VANTA.CLOUDS({
          el: vantaRef.current,
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
    } else {
      // Log an error if VANTA.CLOUDS is not found, which might indicate a loading issue
      console.error('VANTA.CLOUDS is not available on window.VANTA:', window.VANTA);
    }

    // Cleanup Vanta.js effect on component unmount
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
        console.log('Vanta.js Clouds destroyed');
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div
        ref={vantaRef}
        className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden bg-gray-100 dark:bg-gray-900"
        style={{ zIndex: 1 }} // Ensure Vanta.js background is behind content
      >
        <div className="relative z-10 text-center p-6 max-w-2xl mx-auto bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-2xl backdrop-blur-sm">
          <h1 className="mb-6 text-4xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
            እንኳን ወደ{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
              ሥራቀምር
            </span>{' '}
            የተግባር መተግበሪያ በሰላም መጡ!
          </h1>
          <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
            ተግባራቶችዎን በቀላሉ ያደራጁ፣ ይቆጣጠሩ እና ይከታተሉ። 
          </p>
          <Link
            to="/login"
            className="inline-block px-10 py-4 text-white text-lg font-semibold transition-all duration-300 rounded-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 shadow-lg transform hover:scale-105"
          >
            ግባ
          </Link>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Home;