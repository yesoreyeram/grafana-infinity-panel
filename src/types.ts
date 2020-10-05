export enum PanelType {
  VegaLite = 'vega-lite',
}
export const PanelTypes = [{ label: 'Vega Lite', value: PanelType.VegaLite }];
export enum VegaTheme {
  Dark = 'dark',
  Excel = 'excel',
  FiveThirtyEight = 'fivethirtyeight',
  GGPlot2 = 'ggplot2',
  GoogleCharts = 'googlecharts',
  LATimes = 'latimes',
  Quartz = 'quartz',
  UrbanInstitute = 'urbaninstitute',
  Vox = 'vox',
}
export const VegaThemes = [
  { label: 'Dark', value: VegaTheme.Dark },
  { label: 'Excel', value: VegaTheme.Excel },
  { label: 'FiveThirtyEight', value: VegaTheme.FiveThirtyEight },
  { label: 'GGPlot2', value: VegaTheme.GGPlot2 },
  { label: 'GoogleCharts', value: VegaTheme.GoogleCharts },
  { label: 'LATimes', value: VegaTheme.LATimes },
  { label: 'Quartz', value: VegaTheme.Quartz },
  { label: 'UrbanInstitute', value: VegaTheme.UrbanInstitute },
  { label: 'Vox', value: VegaTheme.Vox },
];
export interface VegaLiteSettings {
  spec: any;
  theme: VegaTheme;
}
export interface PanelOptions {
  type: PanelType;
  settings: {
    vega_lite: VegaLiteSettings;
  };
}
