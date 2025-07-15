import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const errorMessage = searchParams.get('message') || 'Ocorreu um erro';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-surface-800 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Erro de Autenticação</h1>
        <p className="text-surface-700 dark:text-surface-300 mb-6">{errorMessage}</p>
        <Link to="/login" className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
          Voltar para Login
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;