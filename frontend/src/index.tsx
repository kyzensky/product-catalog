import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import { validateEnv } from './config';

// Проверяем переменные окружения перед запуском
try {
  validateEnv();
} catch (error) {
  const container = document.getElementById('root');
  if (container) {
    container.innerHTML = `
      <div style="padding: 20px; font-family: monospace; white-space: pre-wrap; color: red; background: #fff; min-height: 100vh;">
        ${error instanceof Error ? error.message : String(error)}
      </div>
    `;
  }
  throw error; // Останавливаем выполнение
}

const AppWithCallbackAfterRender: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<AppWithCallbackAfterRender />);
}

