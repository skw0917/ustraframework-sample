import { configProperties, env } from '@ustra/core'
import NuxtConfigLoader from '@ustra/nuxt/src/config/nuxt-config-loader'
import NuxtAppProperties from '@ustra/nuxt/src/config/nuxt-app-properties'

export default async () => {
  const config: NuxtAppProperties = {
    app: {
      processPath: __dirname,
      profile: process.env.CONFIG_ENV,
      configDir: 'config',
      deviceType: configProperties.DeviceType.MOBILE,
      title: 'U.STRA Node Framework Sample - FO',
      auth: {
        enabled: true,
        loginUrl: '/',
        jwt: {
          useCookie: false,
          accessTokenKey: 'acc-token',
          refreshTokenKey: 'ref-token',
        },
      },
    },
    logger: {
      level: configProperties.LogLevel.Debug,
      file: true,
      datePattern: 'YYYY-MM-DD-HH',
    },
    server: {
      type: configProperties.ServerType.NONE,
      middleware: {
        compress: true,
        bodyParser: true,
        multipart: { enabled: true, excludeUrlPatterns: ['/external-if/billkey-register-result*'] },
      },
    },
    nuxt: {
      module: {
        useCookie: true,
        useUstraBuefy: {
          css: true,
          materialDesignIcons: true,
        },
      },
      head: {
        titleTemplate: 'U.STRA Node Framework Sample - FO',
        title: '',
      },
      generation: {
        generateDirPath: '../../../back/root/fo/src/main/resources/static',
        generateProfiles: [env.Profile.DEV, env.Profile.STAGING, env.Profile.PRODUCTION],
      },
    },
  }

  return await NuxtConfigLoader.nuxtConfig(config, (_prop, _config) => {
    _config.env.SERVER_PROP_ENC_KEY = 'Z3NjLWNyeXB0by1rZXkxMQ=='

    _config.build.transpile.push('@ustra-sample/cmm')
  })
}
