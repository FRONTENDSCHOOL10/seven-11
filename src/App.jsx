import router from '@/router';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <div className="w-[320px] h-[693px] mx-auto border  border-gray-300">
          <RouterProvider router={router} />
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;
