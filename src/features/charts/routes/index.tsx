import { Routes, Route } from 'react-router-dom';
import { LineChart } from './LineChart';
import { LinesChart } from './LinesChart';
import { RadarChart } from './RadarChart';

export const ChartRoutes = () => {
    return (
        <Routes>
            <Route path="linechart" element={<LineChart />} />
            <Route path="lineschart" element={<LinesChart />} />
            <Route path="radarchart" element={<RadarChart />} />
        </Routes>
    );
}