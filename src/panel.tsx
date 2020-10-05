import React from 'react';
import { PanelData, PanelProps } from '@grafana/data';
import { formatData } from './data_utils';
import { PanelOptions, PanelType } from './types';
import { Panel as VegaPanel } from './panels/vega';

interface Props extends PanelProps<PanelOptions> {
  options: PanelOptions;
  data: PanelData;
  width: number;
  height: number;
  onOptionsChange: (options: PanelOptions) => void;
}

export const InfinityPanel: React.FC<Props> = ({ options, data, width, height, onOptionsChange }) => {
  let formattedData: any[] = formatData(data);
  return (
    <>
      {options.type === PanelType.Vega && (
        <VegaPanel
          vegaMode="vega"
          options={options}
          width={width}
          height={height}
          data={formattedData}
          onOptionsChange={onOptionsChange}
        />
      )}
      {options.type === PanelType.VegaLite && (
        <VegaPanel
          vegaMode="vega-lite"
          options={options}
          width={width}
          height={height}
          data={formattedData}
          onOptionsChange={onOptionsChange}
        />
      )}
    </>
  );
};
