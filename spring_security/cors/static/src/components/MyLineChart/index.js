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

export default class MyLineChart extends React.Component {
  render() {
    let {column,data,height,group,renderLabel,renderTooltip} = this.props;
    let list = [];
    for( var i in data ){
    	var single = data[i];
    	list.push({
    		...single,
    		_index:i,
    	});
    }
    height = height || 500;
    let axisX = column[0];
    let axisY = column[1];
    const scale = {
      [axisX.dataIndex]:{
        alias:axisX.title,
        min:axisX.min,
        max:axisX.max,
      },
      [axisY.dataIndex]:{
        alias:axisY.title,
        min:axisY.min,
        max:axisY.max,
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
      <Chart height={height} data={list} scale={scale} forceFit>
        <Legend />
        <Axis name={axisX.dataIndex} title={(axisX.title && axisX.title != "")?true:null}/>
        <Axis name={axisY.dataIndex} title={(axisY.title && axisY.title != "")?true:null}/>
        <Tooltip
          crosshairs={{
            type: "y"
          }}
        />
        <Geom
          type="line"
          position={axisX.dataIndex+"*"+axisY.dataIndex}
          size={2}
          color={group}
          tooltip={tooltip}
        />

        <Geom
          type="point"
          position={axisX.dataIndex+"*"+axisY.dataIndex}
          size={4}
          shape={"circle"}
          color={group}
          style={{
            stroke: "#fff",
            lineWidth: 1
          }}
        >
          {label}
        </Geom>
      </Chart>
    );
  }
}
