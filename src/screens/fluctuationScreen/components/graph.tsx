import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip, } from 'chart.js';
import { useEffect, useState } from 'react';
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

const labels = ['90 days', '60 days', '30 days', '7 days', '1 day', 'Last hour', 'now'];

const datasets = {
    label: 'Dataset 1',
    data: [1, 2, 3],
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    yAxisID: 'y',
};

interface GraphProps {
    data: number[];
    labels?: string[];
}

export const Graph = (props: GraphProps) => {
    const [data, setData] = useState<DatasetsProp>(datasets);

    useEffect(() => {
        setData(() => ({ ...data, data: props.data }));
    }, [props.data]);

    return <div>
        <Line data={{ labels: props.labels, datasets: [data] }} options={options}/>
    </div>;
};
