import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import reactLogo from "./assets/react.svg"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<div className='w-3/6 flex flex-col absolute top-2/4 -translate-y-2/4 -translate-x-2/4 left-2/4 shadow-2xl min-w-half min-h-half overflow-hidden max-h-96 bg-zinc-200 rounded-3xl'>
			<div className='p-2 flex flex-row justify-between shadow-1xl'>
				<div className='flex flex-row'>
					<div className='min-w-5 max-h-5 rounded-full bg-red-500 m-1'>&nbsp;</div>
					<div className='min-w-5 max-h-5 rounded-full bg-orange-500 m-1'>&nbsp;</div>
					<div className='min-w-5 max-h-5 rounded-full bg-green-500 m-1'>&nbsp;</div>
				</div>
				<span className='flex flex-row'>
					react terminal. simple.
					<img src={reactLogo} className='pl-2 max-h-6' />
				</span>
			</div>
			<div className='p-2 overflow-scroll'>
				<App />
			</div>
		</div>
		<div className='absolute bottom-0 left-2/4 flex flex-col text-zinc-300 font-semibold text-center -translate-x-2/4'>
			<p>Made using</p>
			<div className='flex flex-row'>
				<p>react. tailwind css. my own computer. spotify premium.</p>
			</div>
		</div>
	</React.StrictMode>,
)
