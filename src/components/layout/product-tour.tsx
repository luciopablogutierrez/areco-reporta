
'use client';

import React, { useState, useEffect } from 'react';
import Joyride, { type Step, type CallBackProps } from 'react-joyride';
import { useTheme } from 'next-themes';

const TOUR_STORAGE_KEY = 'areco_reporta_tour_completed';

export function ProductTour() {
  const [run, setRun] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const tourCompleted = localStorage.getItem(TOUR_STORAGE_KEY);
    if (tourCompleted !== 'true') {
      setTimeout(() => {
        setRun(true);
      }, 500);
    }
  }, []);

  const totalSteps = 9;
  const steps: Step[] = [
    {
      target: 'body',
      content: '¡Bienvenido a ArecoReporta! Este es el corazón de la aplicación. Aquí verás todas las incidencias y el estado de los caminos.',
      placement: 'center',
      disableBeacon: true,
      title: `Paso 1 de ${totalSteps}`,
    },
    {
      target: '#tour-step-map',
      content: 'Este es el mapa interactivo. Aquí podrás visualizar todas las incidencias reportadas y la condición de los caminos rurales.',
      title: `Paso 2 de ${totalSteps}`,
    },
    {
      target: '#tour-step-filters',
      content: 'Usa estos filtros para encontrar rápidamente incidencias por categoría, estado o zona.',
      placement: 'bottom',
      title: `Paso 3 de ${totalSteps}`,
    },
    {
      target: '#tour-step-create-report',
      content: 'Desde aquí puedes crear una nueva incidencia para reportar un problema que veas en la comunidad.',
      placement: 'right',
      title: `Paso 4 de ${totalSteps}`,
    },
    {
      target: '#tour-step-my-reports',
      content: 'En "Mis Reportes" podrás ver el historial y el estado de todas las incidencias que has creado.',
      placement: 'right',
      title: `Paso 5 de ${totalSteps}`,
    },
    {
      target: '#tour-step-pets',
      content: 'Gestiona tus mascotas, repórtalas como perdidas y ayuda a otros a encontrar las suyas en este portal comunitario.',
      placement: 'right',
      title: `Paso 6 de ${totalSteps}`,
    },
    {
        target: '#tour-step-rural-roads',
        content: 'Consulta el estado de los caminos rurales en tiempo real para planificar tus viajes de forma segura.',
        placement: 'right',
        title: `Paso 7 de ${totalSteps}`,
    },
     {
      target: '#tour-step-notifications',
      content: 'Revisa aquí las últimas notificaciones sobre tus reportes y mascotas.',
      placement: 'right',
      title: `Paso 8 de ${totalSteps}`,
    },
     {
      target: '#tour-step-admin',
      content: 'Si tienes permisos, desde aquí podrás acceder al panel de administración para gestionar la plataforma.',
      placement: 'right',
      title: `Paso 9 de ${totalSteps}`,
    },
    {
      target: '#tour-step-legend',
      content: 'Aquí tienes la leyenda del mapa y la opción de reiniciar este tour cuando quieras. ¡Ya estás listo para empezar!',
      placement: 'top-end',
      title: '¡Felicitaciones!',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = ['finished', 'skipped'];

    if (finishedStatuses.includes(status)) {
      setRun(false);
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    }
  };

  if (typeof window === 'undefined') {
    return null;
  }
  
  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      run={run}
      scrollToFirstStep
      showProgress={false}
      showSkipButton
      steps={steps}
      styles={{
        options: {
          arrowColor: theme === 'dark' ? 'hsl(var(--card))' : 'hsl(var(--card))',
          backgroundColor: theme === 'dark' ? 'hsl(var(--card))' : 'hsl(var(--card))',
          primaryColor: 'hsl(var(--primary))',
          textColor: theme === 'dark' ? 'hsl(var(--foreground))' : 'hsl(var(--foreground))',
          zIndex: 1000,
        },
        buttonClose: {
            display: 'none',
        },
        spotlight: {
          borderRadius: 'var(--radius)',
        },
        tooltip: {
            padding: 20
        },
        tooltipTitle: {
            textAlign: 'center',
            fontWeight: 600,
        }
      }}
      locale={{
        back: 'Anterior',
        close: 'Cerrar',
        last: 'Finalizar',
        next: 'Siguiente',
        skip: 'Omitir',
      }}
    />
  );
}
