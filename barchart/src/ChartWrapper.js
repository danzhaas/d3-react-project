import React, { useState, useRef, useEffect } from 'react';
import D3Chart from './D3Chart'

function ChartWrapper () {
    const chartArea = useRef(null)
    const [chart, setChart] = useState(null)

    useEffect(() => {
		if (!chart) {
			setChart(new D3Chart(chartArea.current))
		}
	}, [chart])

    return (
        <div className="chart-area" ref={chartArea}></div>
    )
}

export default ChartWrapper;
