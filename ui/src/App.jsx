import React, { Suspense, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import classNames from 'classnames'

import Spinner from 'covince/src/components/Spinner'
import AppContainer from 'covince/src/components/AppContainer'
import CovInce from 'covince/src/DynamicCovInce'

import Page from './components/Page'
import QUBLogo from './components/QUBLogo'
import ErrorHandler from './components/ErrorHandler'
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

const Loading = () => (
  <div className='fixed inset-0 z-50 grid place-content-center bg-qub-red dark:bg-red-900 text-white'>
    <div className='flex flex-col space-y-10 items-center mb-6'>
      <Spinner className='w-6 h-6' />
      <QUBLogo className='w-48 h-16' />
    </div>
  </div>
)

const Info = ({ className, header }) => (
  <div className={classNames(className, 'space-y-3 text-sm')}>
    {header}
    <p>
    This visualisation displays observed counts of lineages of SARS-CoV-2 in Northern Ireland. Samples come from Lighthouse Labs covering most of the pillar 2 testing, and are sequenced by the Wellcome Sanger Institute's COVID-19 Genomics Initiative. These data are a subset of what is made available by the COVID-19 Genomics UK Consortium.
    </p>
  </div>
)

function App () {
  const darkMode = useDarkMode()
  const height = useMemo(() => window.innerHeight, [])
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className='flex flex-col flex-grow' style={{ minHeight: height }}>
          <Page darkMode={darkMode} InfoContent={Info}>
            <ErrorHandler>
              <Suspense fallback={<Loading />}>
                <CovInce
                  tiles_url="/map-ni.json"
                  config_url="/config.json"
                  lineColor="gray"
                  darkMode={darkMode.isDark}
                  // avg={avgFunction}
                />
              </Suspense>
            </ErrorHandler>
          </Page>
        </div>
        <Footer />
      </QueryClientProvider>
    </>
  )
}

export default App
