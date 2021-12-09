const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const covinceConfig = require('covince/tailwind.config')

module.exports = {
  ...covinceConfig,
  purge: {
    content: [
      './src/**/*.jsx',
      './src/**/*.mdx',
      './node_modules/covince/src/**/*.jsx'
    ]
  },
  theme: {
    ...covinceConfig.theme,
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
      // heading: ['Open Sans', 'sans-serif'],
      heading: ['BrandonText', 'Open Sans', 'sans-serif'],
      display: ['BrandonText', 'Open Sans', 'sans-serif']
    },
    extend: {
      ...covinceConfig.theme.extend,
      colors: {
        gray: colors.warmGray,
        primary: '#b6000b',
        heading: colors.trueGray[700],
        subheading: colors.trueGray[600],
        dark: {
          // primary: '#fcb0bb',
          primary: colors.gray[100],
          heading: colors.trueGray[200],
          subheading: colors.trueGray[300]
        },
        qub: {
          red: '#d6000d',
          'red-dark': '#96000d'
        }
      },
      fontSize: {
        xl: '1.375rem'
      },
      spacing: {
        ...covinceConfig.theme.extend.spacing,
        header: `calc(${defaultTheme.spacing[16]} + ${defaultTheme.spacing[2]})`,
        'header-md': `calc(${defaultTheme.spacing[20]} + ${defaultTheme.spacing[14]})`,
        'header-overlap': '4.5rem' // 3 * 1.5rem (6)
      }
    }
  },
  variants: {
    extend: {
      ringWidth: ['focus-visible']
    }
  },
  plugins: [
    ...covinceConfig.plugins
  ]
}
