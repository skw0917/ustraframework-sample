import { configProperties, env } from '@ustra/core'
import NuxtConfigLoader from '@ustra/nuxt/src/config/nuxt-config-loader'
import NuxtAppProperties from '@ustra/nuxt/src/config/nuxt-app-properties'
import { NuxtModuleType } from '@ustra/nuxt/src/config/modules/nuxt-modules'

export default async () => {
  const config: NuxtAppProperties = {
    app: {
      processPath: __dirname,
      profile: process.env.CONFIG_ENV,
      configDir: 'config',
      deviceType: configProperties.DeviceType.MOBILE,
      title: 'U.STRA Node Framework Sample - BO',
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
        useUstraDx: {},
        useUstraMngBo: {
          uiConfig: {
            appTitle: 'U.STRA Node Framework Sample - BO',
            useMaskingForList: true,
          },
          useInitialDataCache: true,
        },
        useUstraDxMngBo: {
          importSystemPage: true,
        },
        extends: [
          {
            type: NuxtModuleType.BUILD_MODULE,
            moduleName: 'nuxt-fontagon',
            enabled: true,
            option: {
              iconFont: {
                fontName: 'fontagon-icons',
                style: 'sass',
                classOptions: {
                  baseClass: 'nf-icons',
                  classPrefix: 'nft',
                },
              },
            },
          },
        ],
      },
      head: {
        titleTemplate: 'U.STRA Node Framework Sample - BO',
        title: '',
      },
      generation: {
        generateDirPath: '../../../back/root/bo/src/main/resources/static',
        generateProfiles: [env.Profile.DEV, env.Profile.STAGING, env.Profile.PRODUCTION],
      },
    },
  }

  return await NuxtConfigLoader.nuxtConfig(config, (_prop, _config) => {
    _config.env.SERVER_PROP_ENC_KEY = 'Z3NjLWNyeXB0by1rZXkxMQ=='

    _config.build.transpile.push('@ustra-sample/cmm')
  })
}
