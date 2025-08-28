
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
      setRun(true);
    }
  }, []);

  const steps: Step[] = [
    {
      target: 'body',
      content: '¡Te damos la bienvenida a ArecoReporta! Te guiaremos rápidamente por las funciones principales.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '#tour-step-filters',
      content: 'Usa estos filtros para encontrar rápidamente incidencias en el mapa por categoría, estado o zona.',
      placement: 'bottom',
    },
    {
      target: '#tour-step-create-report',
      content: 'Desde aquí puedes crear una nueva incidencia para reportar un problema que veas en la comunidad.',
      placement: 'right',
    },
    {
      target: '#tour-step-my-reports',
      content: 'En "Mis Reportes" podrás ver el historial y el estado de todas las incidencias que has creado.',
      placement: 'right',
    },
    {
        target: '#tour-step-rural-roads',
        content: 'Consulta el estado de los caminos rurales en tiempo real para planificar tus viajes de forma segura.',
        placement: 'right',
    },
    {
      target: '#tour-step-legend',
      content: 'Aquí tienes la leyenda del mapa y la opción de reiniciar este tour cuando quieras. ¡Ya estás listo para empezar!',
      placement: 'top-end',
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

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      run={run}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
      styles={{
        options: {
          arrowColor: theme === 'dark' ? '#0f172a' : '#fff',
          backgroundColor: theme === 'dark' ? '#0f172a' : '#fff',
          primaryColor: '#2563eb',
          textColor: theme === 'dark' ? '#f8fafc' : '#0f172a',
          zIndex: 1000,
        },
        buttonClose: {
            display: 'none',
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

