"use client"

import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface ChartData {
  name: string;
  value: number;
}

interface BarChartProps {
  data: ChartData[];
  color?: string;
  height?: number;
}

export function BarChart({ data, color = "hsl(var(--primary))", height = 350 }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: 'hsl(var(--border))' }}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: 'hsl(var(--border))' }}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))',
            borderRadius: 'var(--radius)',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
          }}
          itemStyle={{ color: 'hsl(var(--foreground))' }}
          formatter={(value) => [value.toLocaleString(), '値']}
        />
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

interface LineChartProps {
  data: ChartData[];
  color?: string;
  height?: number;
}

export function LineChart({ data, color = "hsl(var(--primary))", height = 350 }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: 'hsl(var(--border))' }}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: 'hsl(var(--border))' }}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))',
            borderRadius: 'var(--radius)',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
          }}
          itemStyle={{ color: 'hsl(var(--foreground))' }}
          formatter={(value) => [value.toLocaleString(), '値']}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          strokeWidth={2}
          dot={{ fill: color, strokeWidth: 2, r: 4 }}
          activeDot={{ fill: color, strokeWidth: 2, r: 6 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

interface PieChartProps {
  data: ChartData[];
  colors?: string[];
  height?: number;
}

export function PieChart({ data, colors = ["hsl(var(--primary))", "hsl(var(--muted))"], height = 350 }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))',
            borderRadius: 'var(--radius)',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
          }}
          itemStyle={{ color: 'hsl(var(--foreground))' }}
          formatter={(value) => [value.toLocaleString(), '値']}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          formatter={(value, entry, index) => (
            <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>
          )}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}