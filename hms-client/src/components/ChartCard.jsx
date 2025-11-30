import React from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', patients: 100 },
  { month: 'Feb', patients: 140 },
  { month: 'Mar', patients: 180 },
  { month: 'Apr', patients: 220 }
]

export default function ChartCard({title}){
  return (
    <div className='card'>
      <div className='mb-4 font-semibold'>{title}</div>
      <div style={{width:'100%', height:250}}>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={data}>
            <XAxis dataKey='month' />
            <YAxis />
            <Line type='monotone' dataKey='patients' stroke='#0ea5e9' strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
