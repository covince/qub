import './Footer.css'

import React from 'react'
import { BsEnvelope } from 'react-icons/bs'

import Button from 'covince/src/components/Button'

import COGUKLogo from './COGUKLogo'
import PHALogo from '../assets/PHAlogo.png'

const Footer = () => (
  <footer className='qub-footer bg-white dark:bg-gray-700 mt-2 md:mt-0 border-t border-gray-100 dark:border-gray-500 shadow text-heading dark:!text-dark-heading space-y-6 py-6 md:py-9'>
    <div className='container px-4 md:px-12 grid grid-cols-1 gap-9 lg:grid-cols-3 lg:gap-6 xl:gap-0'>
      <div className='space-y-3 md:max-w-lg'>
        <form>
          <Button
            as='a'
            href='mailto:genomicsurveillance@qub.ac.uk'
            className='inline-flex items-center h-9 !text-primary dark:!text-dark-primary font-bold !no-underline'
          >
            Send feedback
            <BsEnvelope className='h-5 w-5 ml-2' />
          </Button>
        </form>
        <p className='text-sm'>
          This page uses the <a href="https://github.com/covince/covince">CovInce</a> visualisation framework, developed as part of the <a href='https://www.sanger.ac.uk/science/covid-19-science/'>Wellcome Sanger Institute <span className='whitespace-nowrap'>COVID–19</span>&nbsp;Genomics Initiative</a>.
        </p>
      </div>
      <div className='grid gap-12 my-3 sm:my-0 pl-4 sm:pl-0 sm:justify-evenly sm:flex sm:items-center md:col-span-2'>
        <img src={PHALogo} className='w-64' />
        <a href='https://www.cogconsortium.uk'>
          <COGUKLogo className='w-64' />
        </a>
      </div>
      <div className='md:col-span-2 w-content md:mt-3 xl:mt-6'>
        <h3 className='font-bold leading-5 mb-1'>Attributions</h3>
        <ul className='list-none text-xs tracking-wide'>
          <li>Contains Ordnance Survey data © Crown copyright and database right 2019</li>
          {/* <li>Contains UK Health Security Agency data © Crown copyright and database right 2020</li> */}
          <li>Office for National Statistics licensed under the Open Government Licence v.3.0</li>
        </ul>
        <p className='text-xs tracking-wide mt-3 md:max-w-lg'>
          Site maintained and hosted by <strong><a href="https://www.qub.ac.uk/research-centres/GIS/">Centre for Geographical Information Science and Geomatics, Geography, School Natural and Built Environment, QUB</a></strong>
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
