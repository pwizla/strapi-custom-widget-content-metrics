import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import { ChartBar } from '@strapi/icons'; // Ajout de cette importation manquante

export default {
  register(app) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`, // Correction ici - PluginIcon → PLUGIN_ID
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      Component: async () => {
        const { App } = await import('./pages/App');
        return App;
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });

    // Enregistrement du widget avec les corrections
    app.widgets.register({
      icon: ChartBar,
      title: {
        id: `${PLUGIN_ID}.widget.metrics.title`, // Correction ici - pluginId → PLUGIN_ID
        defaultMessage: 'Content Overview',
      },
      component: async () => {
        const component = await import('./components/MetricsWidget');
        return component.default;
      },
      id: 'content-metrics',
      pluginId: PLUGIN_ID, // Correction ici - pluginId → PLUGIN_ID
    });
  },

  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },

  bootstrap() {},
};