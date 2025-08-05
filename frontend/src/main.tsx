import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router"
import { Provider } from 'react-redux'
import { store } from './store.ts'
import AppRoutes from './AppRoutes.tsx'
import './index.scss'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>,
)
