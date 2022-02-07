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
    <p>This visualisation displays observed counts of lineages of SARS-CoV-2 in Northern Ireland from
samples sequenced by Queen's University Belfast and the Belfast Health and Social Care Trust as
part of the <a href="https://www.cogconsortium.uk/">COVID-19 Genomics UK Consortium</a>. The visualisation shows the number of observed
genomes per sampling week as well as the proportion of genomes belonging to each specific lineage
ending on the date selected. Dates reflect the date on which the sample was collected.</p>
<p>You can select which <a href="https://www.pango.network/">Pango</a> lineages to display with the Lineages button. Each sequence is counted
in the most fine-grained selected lineage to which it belongs (e.g. if B.1.617.2 and AY.4 are selected,
an AY.4.1 sequence will be counted as AY.4). Note that most sequences ultimately descend from “B”,
and if you de-select it, any sequences not belonging to a more fine-grained selected lineage will be
removed from the numerator and denominator of the proportions.</p>
<p>We believe that the information presented on this website will be of interest for both general public
and experts. At the same time, the data is complex and can be misinterpreted easily. Below we
provide some additional information which describes the way the data for this dashboard is
collected, processed and presented in more detail.</p>
<h3>Key terms</h3>
<li><strong>Genomes per Week</strong> - the average number of genomes that belong to a particular lineage
per week over the two-week period ending on the specified date.
</li>
<li><strong>Proportion</strong> - the percentage of genomes sequenced in the selected two-week period that
belong to a particular lineage.</li>

<h3>It is not a comprehensive record of SARS-CoV-2 incidence</h3>

<li> Our aim is to show an approximately random selection of samples positive for SARS-CoV-2 in
the community for genomic surveillance. Although it is not possible to fully achieve this, the
data can be used to paint a reliable picture of the geographical and temporal distribution of
variants in circulation in Northern Ireland, while minimising the sequencing costs and
allowing for rapid data analysis and timely reporting.
</li>
<li> Most samples come from Pillar 2 testing (swab testing for the wider Northern Ireland
population). Also included are sequences from Pillar 1 healthcare-related samples. The
weekly geographic coverage is not uniform, as can be seen from blank spots in the
"Proportion" map view. Checking the &quot;fade areas by uncertainty&quot; box on Proportion maps
sets the opacity of a region&#39;s colour according to the confidence interval of the value being
plotted (e.g. a region with a confidence interval of width 50% will be 50% transparent).
</li>
<li> While the total number of cases varies with time, the number of samples sequenced per
week remains relatively constant, therefore the percentage of positive cases sampled is
smaller when the number of cases is high.
</li>
<li>The data displayed on this website are provisional, not a comprehensive record of SARS-
CoV-2 incidence and released for research and public interest purposes only. Caution should
be exercised when reviewing the data as it is easy to misinterpret. Queen's University Belfast
and the Public Health Agency assume no responsibility arising out of or in connection with
the data or its use. Authoritative, validated SARS-CoV-2 genome data is made available by
the UK Health Security Agency.</li>

<h3>Proportions of a particular variant are easy to misinterpret</h3>

<li> A high proportion of variant cases could seem alarming if just the percentage is reported in
areas with only a few sequences. We therefore also report the number of genomes per
week to give a more accurate picture.</li>
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
