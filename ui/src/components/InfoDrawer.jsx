import React, { useEffect, useState } from 'react'
import { Popover } from '@headlessui/react'
import { BsX } from 'react-icons/bs'
import { CSSTransition } from 'react-transition-group'

import FadeTransition from 'covince/src/components/FadeTransition'

export const Info = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.classList[isOpen ? 'add' : 'remove']('sliding-drawer-open')
  }, [isOpen])

  return (
    <Popover>
      {({ open }) => {
        setIsOpen(open)
        return (
          <>
            <Popover.Button
              className={`
                px-3 h-10 text-xs font-bold uppercase text-white
                border-2 border-solid border-transparent transition-colors 
                hover:underline focus:outline-none focus-visible:border-white
              `}
              title='About this visualisation'
            >
              About
            </Popover.Button>
            <FadeTransition in={open}>
              <Popover.Overlay className='fixed inset-0 bg-gray-900 dark:bg-gray-100 bg-opacity-25 dark:bg-opacity-25 z-50' />
            </FadeTransition>
            <CSSTransition
              in={open}
              timeout={300}
              mountOnEnter
              unmountOnExit
              classNames={{
                appear: 'transform translate-x-full',
                appearActive: 'transition-transform duration-300 transform-none',
                appearDone: '',
                enter: 'transform translate-x-full',
                enterActive: 'transition-transform duration-300 transform-none',
                enterDone: '',
                exitActive: 'transition-transform duration-300 transform translate-x-full',
                exitDone: 'transform translate-x-full'
              }}
            >
              <div className='fixed right-0 top-0 bottom-0 z-50'>
                <Popover.Panel static className='h-full bg-white dark:bg-gray-700 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none relative overflow-y-auto'>
                  <Popover.Button className='absolute top-3 right-2 p-1 text-primary focus:outline-none focus:ring-primary dark:ring-dark-primary focus:ring-2 rounded-full' title='Close'>
                    <BsX className='h-6 w-6' />
                  </Popover.Button>
                  { React.cloneElement(children, { className: 'max-w-measure-1.5 box-content pl-9 pr-6 py-9' }) }
                </Popover.Panel>
              </div>
            </CSSTransition>
          </>
        )
      }}
    </Popover>
  )
}

export default Info
