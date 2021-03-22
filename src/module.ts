import { PanelPlugin } from '@grafana/data';
import { PanelOptions, PanelType, PanelTypes } from './types';
import { Options as VegaPanelEditorOptions } from './panels/vega';
import { Options as VegaElitePanelEditorOptions } from './panels/vega-elite';
import { InfinityPanel } from './panel';

export const plugin = new PanelPlugin<PanelOptions>(InfinityPanel).setPanelOptions(builder => {
  builder.addSelect({
    path: 'type',
    name: 'Panel Type',
    defaultValue: PanelType.VegaLite,
    settings: {
      options: PanelTypes,
      allowCustomValue: false,
    },
  });
  builder.addCustomEditor(VegaPanelEditorOptions);
  builder.addCustomEditor(VegaElitePanelEditorOptions);
  return builder;
});
