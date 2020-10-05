import React, { useState } from 'react';
import { PanelOptionsEditorItem } from '@grafana/data';
import { Select, CodeEditor } from '@grafana/ui';
import { VegaLite } from 'react-vega';
import { Handler } from 'vega-tooltip';
import { PanelOptions, PanelType, VegaLiteSettings, VegaTheme, VegaThemes } from './../types';

const DEFAULT_VEGA_SPEC = {
  layer: [
    {
      mark: {
        type: 'line',
      },
    },
  ],
  encoding: {
    x: {
      field: 'Time',
      type: 'temporal',
    },
    y: {
      field: 'Value',
      type: 'quantitative',
    },
    color: {
      field: 'seriesName',
      type: 'nominal',
    },
    tooltip: [
      {
        field: 'seriesName',
      },
      {
        field: 'Value',
      },
      {
        field: 'Time',
        timeUnit: 'hoursminutes',
        type: 'temporal',
      },
    ],
  },
  data: {
    name: 'table',
  },
};

interface EditorProps {
  value: VegaLiteSettings;
  onChange: (value: VegaLiteSettings) => void;
}

export const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  let initialSpec = value.spec || DEFAULT_VEGA_SPEC;
  let [text, setText] = useState(JSON.stringify(initialSpec, null, 4));
  const onFieldChange = (v: string, field: string) => {
    switch (field) {
      case 'spec':
        let newSpec = JSON.parse(v);
        setText(JSON.stringify(newSpec, null, 4));
        value.spec = newSpec;
        break;
      case 'theme':
        value.theme = v as VegaTheme;
        break;
      default:
        break;
    }
    onChange(value);
  };
  return (
    <>
      <CodeEditor
        width="100%"
        height={'200'}
        language="json"
        showLineNumbers={true}
        showMiniMap={false}
        value={text || ''}
        readOnly={false}
        onBlur={e => onFieldChange(e, 'spec')}
      />
      <br />
      <Select
        options={VegaThemes}
        defaultValue={VegaTheme.Dark}
        value={value.theme}
        onChange={e => onFieldChange(e.value || VegaTheme.Dark, 'theme')}
      />
    </>
  );
};

export const Options: PanelOptionsEditorItem = {
  id: 'settings.vega_lite',
  path: 'settings.vega_lite',
  name: 'Vega Panel Options',
  editor: Editor,
  defaultValue: {
    spec: null,
    theme: VegaTheme.Dark,
  },
  showIf: (config: PanelOptions) => config.type === PanelType.VegaLite,
};

interface PanelProps {
  options: PanelOptions;
  width: number;
  height: number;
  data: any[];
  onOptionsChange: (options: PanelOptions) => void;
}

export const Panel: React.FC<PanelProps> = props => {
  let options: PanelOptions = props.options;
  let { width, height, data } = props;
  let spec: any = options.settings.vega_lite.spec || DEFAULT_VEGA_SPEC;
  spec.data = spec.data || { name: 'table' };
  let theme = options.settings.vega_lite.theme;
  let expected_height = height - 50;
  let expected_width =
    width -
    (spec &&
    spec.encoding &&
    spec.encoding.color &&
    (spec.encoding.color.field || spec.encoding.color.type === 'quantitative')
      ? 140
      : 40) -
    (spec && spec.encoding && spec.encoding.y && spec.encoding.y.type === 'nominal' ? 0 : 0);
  return (
    <React.Fragment>
      <VegaLite
        width={spec.width || expected_width}
        height={spec.height || expected_height}
        padding={0}
        spec={spec}
        data={{ table: data }}
        tooltip={new Handler().call}
        actions={false}
        theme={theme as any}
      />
    </React.Fragment>
  );
};
