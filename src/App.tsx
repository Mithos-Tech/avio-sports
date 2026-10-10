import { useState, useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Legal from './pages/Legal';
import ErrorBoundary from './components/layout/ErrorBoundary';

/**
 * Resuelve la ruta canónica unificando tanto Hash Routing (#about, #services)
 * como Pathname Routing (/about, /nosotros, /services, /servicios, /legal, /).
 * Además, intercepta hashes residuales del autocompletado del navegador en sesiones frescas
 * para garantizar que la web arranque SIEMPRE en la Página Principal (Home).
 */
function resolveCurrentRoute(): string {
  if (typeof window === 'undefined') return '#home';

  const hash = window.location.hash || '';
  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';

  // Detección de arranque de sesión fresca:
  // Si el usuario abre el navegador o una nueva pestaña, y el autocompletado del navegador
  // inyectó un hash residual de pruebas pasadas (#about, #services, #catalog),
  // limpiamos la URL y forzamos el arranque en la Página Principal (#home).
  try {
    const isSessionActive = Boolean(sessionStorage.getItem('avio_active_session'));
    if (!isSessionActive) {
      sessionStorage.setItem('avio_active_session', 'true');
      if (hash && hash !== '#home' && !hash.startsWith('#legal')) {
        if (window.history.replaceState) {
          window.history.replaceState(null, '', window.location.pathname);
        }
        return '#home';
      }
    }
  } catch {
    // Modo incógnito estricto o cookies deshabilitadas
  }

  // 1. Si el usuario ingresó por una ruta directa de pathname
  if (pathname === '/about' || pathname === '/nosotros') return '#about';
  if (pathname === '/services' || pathname === '/servicios') return '#services';
  if (pathname.startsWith('/legal') || pathname === '/terminos' || pathname === '/privacidad') {
    if (pathname.includes('terms') || pathname === '/terminos') return '#legal/terms';
    if (pathname.includes('ai') || pathname.includes('ia')) return '#legal/ai';
    return '#legal/privacy';
  }

  // 2. Si hay hash en la URL y tiene valor real
  if (hash && hash !== '#' && hash !== '#/' && hash !== '#!') {
    return hash;
  }

  // 3. Predeterminado: siempre Página Principal
  return '#home';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    // Desactivar la restauración errática de scroll del navegador
    // para evitar que el navegador abra la página a media altura o en otra sección
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    return resolveCurrentRoute();
  });
  
  useEffect(() => {
    // Garantizar que en el arranque fresco la ventana empiece en el tope
    if (window.location.hash === '' || window.location.hash === '#home') {
      window.scrollTo(0, 0);
    }

    const handleRouteChange = () => {
      const resolved = resolveCurrentRoute();
      setCurrentPath(resolved);
      
      // Scroll to top instantáneo al cambiar a una página principal o secundaria
      const isPageBoundary = 
        resolved === '#home' || 
        resolved.startsWith('#about') || 
        resolved.startsWith('#services') || 
        resolved.startsWith('#legal');

      if (isPageBoundary) {
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        requestAnimationFrame(() => {
          document.documentElement.style.scrollBehavior = '';
        });
      }
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Lógica de renderizado de vistas
  const renderPage = () => {
    if (currentPath.startsWith('#about')) return <About />;
    if (currentPath.startsWith('#services')) return <Services />;
    if (currentPath.startsWith('#legal')) return <Legal initialHash={currentPath} />;
    return <Home />;
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {renderPage()}
      </div>
    </ErrorBoundary>
  );
}
