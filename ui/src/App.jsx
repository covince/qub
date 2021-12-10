import React, { Suspense, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NavLink } from 'react-router-dom'

import Spinner from 'covince/src/components/Spinner'
import AppContainer from 'covince/src/components/AppContainer'
import CovInce from 'covince/src/DynamicCovInce'

import QUBLogo from './components/QUBLogo'
import ErrorHandler from './components/ErrorHandler'
import ThemeSwitcher from './components/ThemeSwitcher'
import Footer from './components/Footer'

import useDarkMode from 'covince/src/hooks/useDarkMode'

const twentyFourHoursInMs = 1000 * 60 * 60 * 24
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      staleTime: twentyFourHoursInMs * 100
    }
  }
})

const NavBar = ({ darkMode }) => (
  <header className="h-header md:h-header-md bg-qub-red dark:bg-red-900">
    <div className="pt-2 pb-1 md:h-20 flex items-center md:items-start justify-between container px-4">
      <span className='self-center flex items-center space-x-4 mt-0.5 text-white'>
        <NavLink className="font-bold text-xl" to="/">
          <QUBLogo className='w-36 h-14' />
        </NavLink>
        <h1 className='font-display font-bold text-lg md:text-xl mb-1.5 leading-tight'>
          COVID–19 <span className='hidden md:inline'>Genomic&nbsp;Surveillance</span>
        </h1>
      </span>
      <ThemeSwitcher {...darkMode} />
    </div>
  </header>
)

const Loading = () => (
  <div className='fixed inset-0 z-50 grid place-content-center bg-qub-red dark:bg-red-900 text-white'>
    <div className='flex flex-col space-y-10 items-center mb-6'>
      <Spinner className='w-6 h-6' />
      <QUBLogo className='w-48 h-16' />
    </div>
  </div>
)

function App () {
  const darkMode = useDarkMode()
  const height = useMemo(() => window.innerHeight, [])
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className='flex flex-col flex-grow' style={{ minHeight: height }}>
          <NavBar darkMode={darkMode} />
          <ErrorHandler>
            <Suspense fallback={<Loading />}>
              <AppContainer className='flex-grow'>
                <CovInce
                  tiles_url="/map-ni.json"
                  config_url="/config.json"
                  lineColor="gray"
                  darkMode={darkMode.isDark}
                  // avg={avgFunction}
                />
              </AppContainer>
            </Suspense>
          </ErrorHandler>
        </div>
        <Footer />
      </QueryClientProvider>
    </>
  )
}

export default App
