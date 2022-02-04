import React, { useCallback } from 'react'
import classNames from 'classnames'
import { BsInfo } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'

import AppContainer from 'covince/src/components/AppContainer'
import InfoDrawer from './InfoDrawer'
import ThemeSwitcher from './ThemeSwitcher'
import QUBLogo from './QUBLogo'

import useQueryAsState from 'covince/src/hooks/useQueryAsState'
import { useMobile } from 'covince/src/hooks/useMediaQuery'

const NavBar = ({ children }) => (
  <header className="h-header md:h-header-md bg-qub-red dark:bg-red-900">
    <div className="pt-2 pb-1 md:h-20 flex items-center md:items-start justify-between container px-4 relative">
      <span className='self-center flex items-center space-x-4 mt-0.5 text-white'>
        <NavLink className="font-bold text-xl" to="/">
          <QUBLogo className='w-36 h-14' />
        </NavLink>
        <h1 className='font-display font-bold text-lg md:text-xl mb-1.5 leading-tight'>
          COVID–19 <span className='hidden md:inline'>Genomic&nbsp;Surveillance</span>
        </h1>
      </span>
      {children}
    </div>
  </header>
)

const MobileInfoButton = ({ onClick, isActive }) => (
  <button
    className={`
    text-white rounded-full border-2 border-white border-opacity-60 no-webkit-tap
      hover:border-opacity-100 focus:border-opacity-100 focus:outline-none
      ${isActive ? 'bg-qub-red-dark dark:bg-qub-red' : ''}
    `}
    onClick={onClick}
  >
    <BsInfo className='h-8 w-8' />
  </button>
)

const PageWithInfo = ({ InfoContent, darkMode, children }) => {
  const isMobile = useMobile()
  const [{ about }, updateQuery] = useQueryAsState()
  const toggle = useCallback(() => updateQuery({ about: about === '1' ? undefined : '1' }))
  const showAbout = React.useMemo(() => isMobile && about === '1')
  return (
    <>
      <NavBar>
        { isMobile
          ? <MobileInfoButton onClick={toggle} isActive={showAbout} />
          : <div className='flex items-center absolute top-0 right-0 bg-qub-red-dark dark:bg-qub-red bg-opacity-70 dark:bg-opacity-70 divide-x divide-qub-red-dark '>
            <ThemeSwitcher {...darkMode} className='text-white ring-white mx-1.5' />
            <InfoDrawer>
              <InfoContent header={<h2 className='font-display text-lg'>About this page</h2>} />
            </InfoDrawer>
          </div> }
      </NavBar>
      { showAbout &&
        <AppContainer className='flex-grow bg-white dark:bg-gray-700'>
          <InfoContent
            className='px-4 py-5 mx-auto'
            header={
              <header className='flex items-center justify-between'>
                <h2 className='font-display text-lg'>About this page</h2>
                <ThemeSwitcher {...darkMode} className='ring-gray-700 dark:ring-gray-100 text-gray-700 dark:text-gray-100 ' />
              </header>
            }
          />
        </AppContainer> }
      <AppContainer className={classNames('flex-grow', { hidden: showAbout })}>
        {children}
      </AppContainer>
    </>
  )
}

export default PageWithInfo
