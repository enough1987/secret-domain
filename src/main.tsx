import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router"
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'
import AppRoutes from './AppRoutes.tsx'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>,
)
