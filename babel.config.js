module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@config': './src/config',
        '@models': './src/models',
        '@controllers': './src/controllers',
        '@views': './src/views'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}

// NODE_ENV=development
// DATABASE=mongodb://127.0.0.1:27017/kero
// LOCATION=http://127.0.0.1
// FILES=http://127.0.0.1:5000/files
// PORT=5000
// JWT_SECRET=this-is-my-kero-app-which-is-an-eccomere-aplication-that-i-will-use-for-my-finale-project
// JWT_EXPIRES_IN=90d
// JWT_COOKIE_EXPIRES_IN=90

// EMAIL_USERNAME=ed3bd8c06e4869
// EMAIL_PASSWORD=9cb090acb5ffca
// EMAIL_HOST=smtp.mailtrap.io
// EMAIL_PORT=25

// EMAIL_FROM=domingosjeseias@outlook.com

// SENDGRID_USERNAME=apikey
// SENDGRID_PASSWORD=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

// STRIPE_SECRET_KEY=stripe_api_key