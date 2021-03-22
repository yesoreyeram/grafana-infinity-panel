import { SelectableValue } from '@grafana/data';

export enum PanelType {
  Vega = 'vega',
  VegaLite = 'vega-lite',
  Elite = 'vega-elite',
}
export const PanelTypes = [
  // { label: 'Vega', value: PanelType.Vega },
  { label: 'Vega Lite', value: PanelType.VegaLite },
  { label: 'Vega Elite', value: PanelType.Elite },
];
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
export type MarkType =
  | 'area'
  | 'bar'
  | 'circle'
  | 'line'
  | 'point'
  | 'rect'
  | 'rule'
  | 'square'
  | 'text'
  | 'tick'
  | 'geoshape';

export const MarkTypes: Array<SelectableValue<MarkType>> = [
  { label: 'Area', value: 'area' },
  { label: 'Bar', value: 'bar' },
  { label: 'Circle', value: 'circle' },
  { label: 'Line', value: 'line' },
  { label: 'Point', value: 'point' },
  { label: 'Rect', value: 'rect' },
  { label: 'Rule', value: 'rule' },
  { label: 'Square', value: 'square' },
  { label: 'Text', value: 'text' },
  { label: 'Tick', value: 'tick' },
  { label: 'Geo Shape', value: 'geoshape' },
];

export type EncodingType = 'quantitative' | 'temporal' | 'ordinal' | 'nominal';
export const EncodingTypes: Array<SelectableValue<EncodingType>> = [
  { label: 'Quantitative', value: 'quantitative' },
  { label: 'Temporal', value: 'temporal' },
  { label: 'Ordinal', value: 'ordinal' },
  { label: 'Nominal', value: 'nominal' },
];

interface Mark {
  type: MarkType;
}
type EncodingTimeUnit =
  | 'year'
  | 'quarter'
  | 'month'
  | 'date'
  | 'week'
  | 'day'
  | 'dayofyear'
  | 'hours'
  | 'minutes'
  | 'seconds'
  | 'milliseconds';

type EncodingItem = {
  field: string;
  type: EncodingType;
  timeUnit?: EncodingTimeUnit;
  aggregate?: string;
};
export interface VegaLayer {
  mark: Mark;
  encoding?: Record<string, EncodingItem>;
}
export interface VegaSettings {
  spec: any;
  theme: VegaTheme;
  layer: VegaLayer[];
}
export interface PanelOptions {
  type: PanelType;
  settings: {
    vega: VegaSettings;
  };
}
