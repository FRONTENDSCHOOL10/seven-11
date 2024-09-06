import router from '@/router';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <div className="App relative h-[693px] w-[320px] mx-auto border overflow-auto border-gray-300 no-scrollbar">
        <RouterProvider router={router} />
      </div>
    </HelmetProvider>
  );
}

export default App;
