import router from '@/router';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
function App() {
  return (
    <HelmetProvider>
      <div className="App h-screen relative min-w-[320px] max-w-[430px] overflow-auto no-scrollbar mx-auto border border-gray-100">
        <RouterProvider router={router} />
      </div>
    </HelmetProvider>
  );
}

export default App;
