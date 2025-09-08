import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { EventContextProvider } from './contexts/EventContext.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<EventContextProvider>
			<App />
		</EventContextProvider>
	</StrictMode>
)
