import { set } from 'lodash';
import React from 'react';
import { PanelOptionsEditorItem } from '@grafana/data';
import { Select, Input, Button } from '@grafana/ui';
import { VegaLite } from 'react-vega';
import { Handler } from 'vega-tooltip';
import {
  PanelOptions,
  PanelType,
  VegaSettings,
  VegaTheme,
  VegaThemes,
  VegaLayer,
  MarkType,
  MarkTypes,
  EncodingTypes,
} from '../types';

interface EditorProps {
  value: VegaSettings;
  onChange: (value: VegaSettings) => void;
}

export const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const onFieldChange = (v: string, field: string) => {
    switch (field) {
      case 'theme':
        value.theme = v as VegaTheme;
        break;
      default:
        break;
    }
    onChange(value);
  };
  const onAddLayer = () => {
    let layer: VegaLayer[] = value.layer && value.layer.length > 0 ? [...value.layer] : [];
    layer.push({
      mark: { type: 'point' },
      encoding: {
        y: {
          field: '',
          type: 'quantitative',
          aggregate: 'count',
        },
      },
    });
    onChange({ ...value, layer });
  };
  const onDeleteLayer = (index: number) => {
    value.layer.splice(index, 1);
    onChange(value);
  };
  return (
    <>
      {(value.layer || []).map((layer, index) => {
        return (
          <>
            <LayerEditor value={value} onChange={onChange} layer={layer} index={index} />
            <div className="gf-form-inline">
              <button className="btn-danger" onClick={e => onDeleteLayer(index)}>
                Delete Layer
              </button>
            </div>
          </>
        );
      })}
      <br />
      <Button onClick={onAddLayer}>Add Layer</Button>
      <br />
      <Select
        defaultValue={VegaTheme.Dark}
        value={value.theme}
        options={VegaThemes}
        onChange={e => onFieldChange(e.value || VegaTheme.Dark, 'theme')}
      ></Select>
    </>
  );
};

interface LayerEditorProps {
  value: VegaSettings;
  onChange: (value: VegaSettings) => void;
  layer: VegaLayer;
  index: number;
}

const LayerEditor: React.FC<LayerEditorProps> = ({ value, onChange, layer, index, ...rest }) => {
  const onMarkChange = (e: MarkType, index: number) => {
    value.layer[index].mark.type = e;
    onChange(value);
  };
  const onEncodingTypeChange = (e: string, encoding: string, property: string, index: number) => {
    set(value, `layer[${index}].encoding[${encoding}][${property}]`, e);
    onChange(value);
  };
  return (
    <>
      <div className="gf-form-inline">
        <label className="gf-form-label width-8">Mark Type</label>
        <Select
          className="width-8"
          value={layer.mark.type}
          options={MarkTypes}
          onChange={e => onMarkChange(e.value as MarkType, index)}
        ></Select>
        <br />
      </div>
      <div className="gf-form-inline">
        <label className="gf-form-label width-8">X.Type</label>
        <Select
          className="width-8"
          value={layer.encoding?.x?.type}
          options={EncodingTypes}
          onChange={e => onEncodingTypeChange(e.value + '', 'x', 'type', index)}
        ></Select>
      </div>
      <div className="gf-form-inline">
        <label className="gf-form-label width-8">X.Field</label>
        <Input
          css={{}}
          className="width-8"
          value={layer.encoding?.x?.field}
          onChange={e => onEncodingTypeChange(e.currentTarget.value, 'x', 'field', index)}
        ></Input>
      </div>
      <div className="gf-form-inline">
        <label className="gf-form-label width-8">X.Time Unit</label>
        <Input
          css={{}}
          className="width-8"
          value={layer.encoding?.x?.timeUnit}
          onChange={e => onEncodingTypeChange(e.currentTarget.value, 'x', 'timeUnit', index)}
        ></Input>
      </div>
      <div className="gf-form-inline">
        <label className="gf-form-label width-8">X.Aggregate</label>
        <Input
          css={{}}
          className="width-8"
          value={layer.encoding?.x?.aggregate}
          onChange={e => onEncodingTypeChange(e.currentTarget.value, 'x', 'aggregate', index)}
        ></Input>
      </div>
      <div className="gf-form-inline">
        <label className="gf-form-label width-8">Y.Type</label>
        <Select
          className="width-8"
          value={layer.encoding?.y?.type}
          options={EncodingTypes}
          onChange={e => onEncodingTypeChange(e.value + '', 'y', 'type', index)}
        ></Select>
      </div>
      <div className="gf-form-inline">
        <label className="gf-form-label width-8">Y.Field</label>
        <Input
          css={{}}
          className="width-8"
          value={layer.encoding?.y?.field}
          onChange={e => onEncodingTypeChange(e.currentTarget.value, 'y', 'field', index)}
        ></Input>
      </div>
      <div className="gf-form-inline">
        <label className="gf-form-label width-8">Y.Aggregate</label>
        <Input
          css={{}}
          className="width-8"
          value={layer.encoding?.y?.aggregate}
          onChange={e => onEncodingTypeChange(e.currentTarget.value, 'y', 'aggregate', index)}
        ></Input>
      </div>
      <div className="gf-form-inline">
        <label className="gf-form-label width-8">Y.Time Unit</label>
        <Input
          css={{}}
          className="width-8"
          value={layer.encoding?.y?.timeUnit}
          onChange={e => onEncodingTypeChange(e.currentTarget.value, 'y', 'timeUnit', index)}
        ></Input>
      </div>
      <div className="gf-form-inline">
        <label className="gf-form-label width-8">Color.Type</label>
        <Select
          className="width-8"
          value={layer.encoding?.color?.type}
          options={EncodingTypes}
          onChange={e => onEncodingTypeChange(e.value + '', 'color', 'type', index)}
        ></Select>
      </div>
      <div className="gf-form-inline">
        <label className="gf-form-label width-8">Color.Field</label>
        <Input
          css={{}}
          className="width-8"
          value={layer.encoding?.color?.field}
          onChange={e => onEncodingTypeChange(e.currentTarget.value, 'color', 'field', index)}
        ></Input>
      </div>
      <div className="gf-form-inline">
        <label className="gf-form-label width-8">Size.Type</label>
        <Select
          className="width-8"
          value={layer.encoding?.size?.type}
          options={EncodingTypes}
          onChange={e => onEncodingTypeChange(e.value + '', 'size', 'type', index)}
        ></Select>
      </div>
      <div className="gf-form-inline">
        <label className="gf-form-label width-8">Size.Field</label>
        <Input
          css={{}}
          className="width-8"
          value={layer.encoding?.size?.field}
          onChange={e => onEncodingTypeChange(e.currentTarget.value, 'size', 'field', index)}
        ></Input>
      </div>
      <div className="gf-form-inline">
        <label className="gf-form-label width-8">Size.Aggregate</label>
        <Input
          css={{}}
          className="width-8"
          value={layer.encoding?.size?.aggregate}
          onChange={e => onEncodingTypeChange(e.currentTarget.value, 'size', 'aggregate', index)}
        ></Input>
      </div>
    </>
  );
};

export const Options: PanelOptionsEditorItem = {
  id: 'settings.vega.layer',
  path: 'settings.vega',
  name: 'Vega Panel Options',
  editor: Editor,
  defaultValue: [],
  showIf: (config: PanelOptions) => config.type === PanelType.Elite,
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
  let spec: any = {
    data: { name: 'table' },
    layer: options.settings.vega.layer || [],
  };
  let theme = options.settings.vega.theme;
  let expected_height = height - 50;
  let expected_width =
    width -
    (spec.layer[0] &&
    spec.layer[0].encoding &&
    spec.layer[0].encoding.color &&
    (spec.layer[0].encoding.color.field || spec.layer[0].encoding.color.type === 'quantitative')
      ? 140
      : 40) -
    (spec.layer[0] && spec.layer[0].encoding && spec.layer[0].encoding.y && spec.layer[0].encoding.y.type === 'nominal'
      ? 0
      : 0);
  return (
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
  );
};
