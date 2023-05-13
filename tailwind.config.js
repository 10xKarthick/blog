module.exports = {
    content: ['.vitepress/**/*.{js,ts,vue}', '**/*.md'],
    options: {
      safelist: ['html', 'body'],
    },
    theme: {
      extend: {
        colors: {
          blue: {
            ninja: '#4979ff',
          },
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }