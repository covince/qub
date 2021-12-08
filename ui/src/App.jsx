import React, { Suspense } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NavLink } from 'react-router-dom'

import Spinner from 'covince/src/components/Spinner'
import AppContainer from 'covince/src/components/AppContainer'
import CovInce from 'covince/src/DynamicCovInce'

import QUBLogo from './components/QUBLogo'
import ErrorHandler from './components/ErrorHandler'

// import useDarkMode from 'covince/src/hooks/useDarkMode'

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

const NavBar = ({ children }) => (
  <header className="h-header md:h-header-md bg-qub-red">
    <div className="pt-3 pb-1 md:h-20 flex items-center justify-between container text-white px-4">
      <span className='flex items-center space-x-4'>
        <NavLink className="font-bold text-xl" to="/">
          <QUBLogo className='w-36 h-14' />
        </NavLink>
        <h1 className='font-display font-bold text-lg md:text-xl mb-1.5 leading-tight'>COVID–19 Genomic&nbsp;Surveillance</h1>
      </span>
      {children}
    </div>
  </header>
)

const Loading = () => (
  <div className='fixed inset-0 grid place-content-center bg-qub-red text-white'>
    <div className='flex flex-col space-y-10 items-center mb-6'>
      <Spinner className='w-6 h-6' />
      <QUBLogo className='w-48 h-16' />
    </div>
  </div>
)

function App () {
  // const darkMode = useDarkMode()
  const darkMode = false
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavBar darkMode={darkMode} />
        <ErrorHandler>
          <Suspense fallback={<Loading />}>
            <AppContainer>
              <CovInce
                tiles_url="/map-ni.json"
                config_url="/config.json"
                lineColor="gray"
                // avg={avgFunction}
                // darkMode={darkMode.isDark}
              />
            </AppContainer>
          </Suspense>
        </ErrorHandler>
      </QueryClientProvider>
    </>
  )
}

export default App
