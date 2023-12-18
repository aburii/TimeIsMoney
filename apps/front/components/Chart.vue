<template>
  <div v-if="chartData">
    <div v-if="chartType === 'line'">
      <apexchart
        :key="series"
        :options="chartOptions"
        :series="chartSeries"
        class="bg-base-200"
      ></apexchart>
    </div>
    <div v-else-if="chartType === 'candle'">
      <apexchart
        :key="candlestickChartSeries"
        :options="candlestickChartOptions"
        :series="candlestickChartSeries"
        class="bg-base-200"
      ></apexchart>
    </div>
  </div>
  <div v-else>Loading ...</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  chartData: {
    type: Array,
    required: true,
  },
  openPrice: {
    type: Number,
    required: true,
  },
  chartType: {
    type: String,
    required: true,
  },
});

// Function to calculate the exact intersection points
function getIntersectionPoint(p1, p2, openPrice) {
  const [x1, y1] = p1;
  const [x2, y2] = p2;

  if (y1 === y2) {
    return null;
  }

  // Calculate intersection point using line equation
  const slope = (y2 - y1) / (x2 - x1);
  const intercept = y1 - slope * x1;
  const xCross = (openPrice - intercept) / slope;

  // Check if the intersection x is between the two x's
  if (xCross > Math.min(x1, x2) && xCross < Math.max(x1, x2)) {
    return [xCross, openPrice];
  }

  return null;
}

// Function to split the data into segments with intersection points
function splitDataWithIntersections(data, openPrice) {
  let segments = [];
  let currentSegment = { color: null, data: [] };

  for (let i = 0; i < data.length - 1; i++) {
    const point = data[i];
    const nextPoint = data[i + 1];
    const priceAboveOpen = point[1] >= openPrice;
    const color = priceAboveOpen ? "#00E396" : "#FF4560"; // green if above or equal to openPrice, red if below

    if (currentSegment.color !== color) {
      if (currentSegment.data.length) {
        segments.push(currentSegment);
      }
      currentSegment = { color: color, data: [point] };
    } else {
      currentSegment.data.push(point);
    }

    // Check for intersection point
    const intersectionPoint = getIntersectionPoint(point, nextPoint, openPrice);
    if (intersectionPoint) {
      currentSegment.data.push(intersectionPoint);
      segments.push(currentSegment);
      currentSegment = {
        color: color === "#00E396" ? "#FF4560" : "#00E396",
        data: [intersectionPoint],
      };
    }
  }

  currentSegment.data.push(data[data.length - 1]);
  segments.push(currentSegment);

  return segments;
}

const chartOptions = ref({
  chart: {
    type: "line",
    stacked: false,
    zoom: {
      enabled: true,
    },
    animations: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
    width: 2,
  },
  xaxis: {
    type: "datetime",
  },
  tooltip: {
    x: {
      format: "dd MMM yyyy",
    },
  },
  markers: {
    size: 0,
  },
  legend: {
    show: false,
  },
  annotations: {
    yaxis: [
      {
        y: props.openPrice,
        borderColor: "gray",
        borderWidth: 2,
        strokeDashArray: 5,
        label: {
          borderColor: "white",
          style: {
            color: "#fff",
            background: "gray",
          },
          text: "Open Price",
        },
      },
    ],
  },
});

// Create chart series from segments with intersection points
const chartSeries = ref(
  splitDataWithIntersections(props.chartData, props.openPrice).map(
    (segment) => ({
      name:
        segment.color === "#00E396" ? "Above Open Price" : "Below Open Price",
      data: segment.data,
      type: "line",
      color: segment.color,
    })
  )
);

const formattedCandlestickData = props.chartData.map((d) => {
  return {
    x: d[0],
    y: [d[1], d[2], d[3], d[4]],
  };
});

const candlestickChartOptions = ref({
  chart: {
    type: "candlestick",
    animations: {
      enabled: true,
    },
  },
  xaxis: {
    type: "datetime",
  },
});

const candlestickChartSeries = ref([
  {
    name: "Candlestick",
    data: formattedCandlestickData,
  },
]);

const updateChartData = () => {
  if (props.chartType === "line") {
    chartSeries.value = splitDataWithIntersections(
      props.chartData,
      props.openPrice
    ).map((segment) => ({
      name:
        segment.color === "#00E396" ? "Above Open Price" : "Below Open Price",
      data: segment.data,
      type: "line",
      color: segment.color,
    }));
  } else if (props.chartType === "candle") {
    candlestickChartSeries.value = [
      {
        name: "Candlestick",
        data: props.chartData.map((d) => ({
          x: d[0],
          y: [d[1], d[2], d[3], d[4]],
        })),
      },
    ];
  }
};

watch(
  () => props.chartData,
  () => {
    updateChartData();
  },
  { deep: true, immediate: true }
);
</script>
