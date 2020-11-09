import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class GWPgraph extends PureComponent {
    render() {
        const raw_data = this.props.raw_data;
        var data = [];
        for (var date in raw_data){
            var dict = {};
            dict['date'] = date;
            dict['gwp'] = raw_data[date];
            data.push(dict);
        }
        return (
            <LineChart
                width={1000}
                height={500}
                data={data}
                margin={{
                    top: 20, right: 60, left: 40, bottom: 20,
                }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="gwp" stroke="#8884d8" />
        </LineChart>
        );
    }
}

