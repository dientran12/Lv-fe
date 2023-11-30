import React from 'react';
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dữ liệu giả định
const data = [
    { date: '2023-01-01', sales: 200, customers: 150, revenue: 3000 },
    { date: '2023-01-02', sales: 300, customers: 200, revenue: 4500 },
    { date: '2023-01-03', sales: 150, customers: 120, revenue: 2250 },
    { date: '2023-01-04', sales: 280, customers: 180, revenue: 4200 },
    { date: '2023-01-05', sales: 250, customers: 160, revenue: 3750 },
    { date: '2023-01-06', sales: 320, customers: 220, revenue: 4800 },
    { date: '2023-01-07', sales: 340, customers: 240, revenue: 5100 },
    { date: '2023-01-08', sales: 280, customers: 200, revenue: 4200 },
    { date: '2023-01-09', sales: 300, customers: 210, revenue: 4500 },
];

function ChartComponent() {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="customers" stroke="#ff7300" />
            </ComposedChart>
        </ResponsiveContainer>
    );
}

export default ChartComponent;
