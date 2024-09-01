import router from '@/router';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </HelmetProvider>
  );
}

export default App;
