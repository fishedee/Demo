import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";

export default class MyPieChart extends React.Component {
  render() {
    let {column,data,height,group,renderLabel,renderTooltip,padding} = this.props;
    let axisX = column[0];
    let axisY = column[1];
    let list = [];
    var sum = 0.0;
    for( var i in data ){
      var single = data[i];
      sum += single[axisY.dataIndex];
    }
    for( var i in data ){
    	var single = data[i];
      var precent = single[axisY.dataIndex]/sum;
    	list.push({
    		...single,
        _precent:precent,
    		_index:i,
    	});
    }
    height = height || 500;
    const scale = {
      [axisX.dataIndex]:{
        alias:axisX.title
      }
    };
    let label = null;
    if( renderLabel ){
      label = <Label
        content={'_index'}
        formatter={(val) => {
          	return renderLabel(list[val]);
        }}
      />
    }
    let tooltip = undefined;
    if( renderTooltip ){
    	tooltip = ['_index', (val) => {
    		return renderTooltip(list[val]);
		}];
    }
    return (
    <Chart
      height={height}
      data={list}
      scale={scale}
      padding={padding}
      forceFit
    >
      <Coord type="theta" radius={0.75} />
      <Axis name={axisX.dataIndex} />
      <Legend position="right" offsetX={-100}/>
      <Tooltip showTitle={false}/>
      <Geom
        type="intervalStack"
        position={'_precent'}
        color={axisX.dataIndex}
        tooltip={tooltip}
      >
        {label}
      </Geom>
    </Chart>
    );
  }
}
