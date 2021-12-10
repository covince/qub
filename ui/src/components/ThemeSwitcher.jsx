import React from 'react'
import classNames from 'classnames'
import { BsDisplay, BsPhone, BsBrightnessHighFill, BsMoonFill, BsChevronDown } from 'react-icons/bs'
import { Menu, Transition } from '@headlessui/react'
import { useMobile } from 'covince/src/hooks/useMediaQuery'

const MenuItem = ({ isActive, onClick, children }) => (
  <Menu.Item>
    <button
      className={classNames(
        'px-4 py-2 whitespace-nowrap w-full flex items-center',
        'no-webkit-tap focus:outline-none active:bg-gray-100 dark:active:bg-gray-700',
        'md:hover:bg-gray-100 md:dark:hover:bg-gray-700',
        { 'font-bold': isActive }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  </Menu.Item>
)

const getIcon = mode => {
  if (mode === 'light') return BsBrightnessHighFill
  if (mode === 'dark') return BsMoonFill
}

const ThemeSwitcher = ({ mode, setMode }) => {
  const isMobile = useMobile()
  const SystemIcon = isMobile ? BsPhone : BsDisplay
  const StatusIcon = getIcon(mode) || SystemIcon
  return (
    <Menu as='div' className='relative z-20'>
      <Menu.Button
        className={`
          p-1 flex items-baseline space-x-1 text-white border border-transparent rounded-md
          focus:outline-none focus:border-current focus:ring ring-white ring-offset-0 ring-opacity-40
        `}
        title='Theme selector'
      >
        <BsChevronDown className='w-3 h-3' />
        <StatusIcon className={classNames('w-4 h-4', { 'p-px': mode === 'dark' })} />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items
          className={`
            w-28 absolute z-20 top-full right-0 mt-2 py-1.5 origin-top-right text-sm
            bg-white rounded-md shadow-xl ring-1 ring-black ring-opacity-5
            focus:outline-none dark:bg-gray-600 text-dark:text-white overflow-hidden
          `}
        >
          <MenuItem isActive={mode === 'light'} onClick={() => setMode('light')}>
            <BsBrightnessHighFill className='flex-shrink-0 fill-current opacity-70 w-4 h-4 mr-2' />
            Light
          </MenuItem>
          <MenuItem isActive={mode === 'dark'} onClick={() => setMode('dark')}>
            <BsMoonFill className='flex-shrink-0 fill-current opacity-70 p-px w-4 h-4 mr-2' />
            Dark
          </MenuItem>
          <MenuItem isActive={mode === 'system'} onClick={() => setMode('system')}>
            <SystemIcon className='flex-shrink-0 fill-current opacity-70 w-4 h-4 mr-2' />
            {isMobile ? 'Device' : 'System'}
          </MenuItem>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ThemeSwitcher
