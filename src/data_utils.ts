import { DataFrame, PanelData } from '@grafana/data';

export const formatData = (data: PanelData) => {
  let out: any[] = [];
  if (data.series) {
    data.series.forEach((series: DataFrame, index: number) => {
      for (let i = 0; i < series.length; i++) {
        let o: any = {};
        o.seriesName = series.name || series.refId || `Series ${index + 1}`;
        for (let j = 0; j < series.fields.length; j++) {
          let field = series.fields[j];
          let value = field.values.toArray()[i];
          value = field.type === 'time' ? new Date(value) : value;
          o[field.name] = value;
        }
        out.push(o);
      }
    });
  } else {
    console.error('Unknown Data format');
  }
  return out;
};
