import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip, } from 'chart.js';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface DatasetsProp {
    label: string,
    data: number[],
    borderColor: string,
    backgroundColor: string,
    yAxisID: string;
}

interface DataProps {
    label: string[];
    datasets: DatasetsProp[];
}

export const options = {
    responsive: true,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: 'Chart.js Line Chart - Multi Axis',
        },
    },
    scales: {
        y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
        },
        y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
                drawOnChartArea: false,
            },
        },
    },
};

const baseLabels = ['90 days', '60 days', '30 days', '7 days', '1 day', 'Last hour', 'now'];
const data = {
    datasets: [
        {
            label: 'Dataset 1',
            data: [34, 22, 15, 45, 33, 29, 45],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y',
        },
    ],
};

export const Graph = (props: any) => {
    const [labels, setLabels] = useState<string[]>(baseLabels);
    const [datasets, setDatasets] = useState<DatasetsProp[]>(data?.datasets);

    return <div>
        <Line data={{ datasets, labels }} options={options}/>
    </div>;
};
