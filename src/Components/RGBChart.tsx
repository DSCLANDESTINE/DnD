import { useState, useRef } from "react";
import {
  Dialog,
  IconButton,
  Popover,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { MoreVert, Close, Delete } from "@mui/icons-material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type ChartType = "column" | "bar" | "line" | "pie";
type DataPoint = { name: string; y: number; color: string };
interface ChartConfig {
  title: string;
  type: ChartType;
  data: DataPoint[];
}

export default function ChartDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [charts, setCharts] = useState<ChartConfig[]>([]);
  const [currentData, setCurrentData] = useState<ChartConfig>({
    title: "",
    type: "column",
    data: [],
  });
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [currentChartIndex, setCurrentChartIndex] = useState<number | null>(
    null
  );
  const colorPickerRef = useRef<HTMLInputElement>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentChartIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentChartIndex(null);
  };

  const handleSubmit = () => {
    if (currentData.title && currentData.data.length > 0) {
      setCharts([...charts, currentData]);
      setCurrentData({ title: "", type: "column", data: [] });
      setIsOpen(false);
    }
  };

  const addDataPoint = () => {
    setCurrentData((prev) => ({
      ...prev,
      data: [...prev.data, { name: "", y: 0, color: "#3b82f6" }],
    }));
  };

  const updateDataPoint = (
    index: number,
    field: keyof DataPoint,
    value: string | number
  ) => {
    const newData = currentData.data.map((point, i) =>
      i === index ? { ...point, [field]: value } : point
    );
    setCurrentData((prev) => ({ ...prev, data: newData }));
  };

  const changeChartType = (type: ChartType) => {
    if (currentChartIndex === null) return;

    const updatedCharts = charts.map((chart, i) =>
      i === currentChartIndex ? { ...chart, type } : chart
    );
    setCharts(updatedCharts);
    handleMenuClose();
  };

  const removeChart = (index: number) => {
    setCharts(charts.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6 hover:bg-blue-600"
      >
        Create New Chart
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {charts.map((chart, index) => (
          <div
            key={index}
            className="relative min-w-[400px] min-h-[400px] border rounded-lg p-4 shadow-sm"
          >
            <div className="flex gap-1">
              <IconButton
                aria-label="settings"
                onClick={(e) => handleMenuOpen(e, index)}
                size="small"
              >
                <MoreVert fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => removeChart(index)}
                size="small"
                color="error"
              >
                <Delete fontSize="small" />
              </IconButton>
            </div>

            <Popover
              open={Boolean(anchorEl) && currentChartIndex === index}
              anchorEl={anchorEl}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: "14px",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
                  minWidth: "100px",
                  padding: "0px",
                },
              }}
            >
              <div>
                {["column", "bar", "line", "pie"].map((type) => (
                  <MenuItem
                    key={type}
                    onClick={() => changeChartType(type as ChartType)}
                    className="pr-3 py-2"
                  >
                    <span className="capitalize py-2">{type}</span>
                  </MenuItem>
                ))}
              </div>
            </Popover>

            <h3 className="text-lg font-semibold mb-4">{chart.title}</h3>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: { type: chart.type, height: 400 },
                title: { text: "" },
                xAxis: { type: "category" },
                yAxis: { title: { text: "Values" } },
                series: [{ data: chart.data }],
                plotOptions: {
                  series: {
                    dataLabels: { enabled: true },
                  },
                },
                credits: { enabled: false },
              }}
            />
          </div>
        ))}
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "14px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
            minWidth: "100px",
            padding: "0px",
          },
        }}
      >
        <div className="p-8 rounded-2xl flex flex-col gap-y-4">
          <h3>
            Form Creation
          </h3>
          <FormControl fullWidth className="mb-4">
            <InputLabel>Chart Type</InputLabel>
            <Select
              value={currentData.type}
              label="Chart Type"
              onChange={(e) =>
                setCurrentData((prev) => ({
                  ...prev,
                  type: e.target.value as ChartType,
                }))
              }
            >
              <MenuItem value="column">Column</MenuItem>
              <MenuItem value="bar">Bar</MenuItem>
              <MenuItem value="line">Line</MenuItem>
              <MenuItem value="pie">Pie</MenuItem>
            </Select>
          </FormControl>

          <input
            type="text"
            placeholder="Chart Title"
            value={currentData.title}
            onChange={(e) =>
              setCurrentData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full p-2 border rounded mb-4"
          />

          <div className="space-y-4">
            {currentData.data.map((point, index) => (
              <div key={index} className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    placeholder="Data title"
                    value={point.name}
                    onChange={(e) =>
                      updateDataPoint(index, "name", e.target.value)
                    }
                    className="p-2 border rounded"
                  />
                </div>
                <input
                  type="number"
                  value={point.y || ""}
                  onChange={(e) =>
                    updateDataPoint(index, "y", Number(e.target.value))
                  }
                  className="p-2 border rounded w-20"
                />
                <div className="relative">
                  <div
                    className="w-8 h-8 rounded-full cursor-pointer border"
                    style={{ backgroundColor: point.color }}
                    onClick={() => colorPickerRef.current?.click()}
                  />
                  <input
                    type="color"
                    ref={colorPickerRef}
                    value={point.color}
                    onChange={(e) =>
                      updateDataPoint(index, "color", e.target.value)
                    }
                    className="absolute opacity-0 w-0 h-0"
                  />
                </div>
                {index > 0 && (
                  <IconButton
                    onClick={() => {
                      const newData = currentData.data.filter(
                        (_, i) => i !== index
                      );
                      setCurrentData((prev) => ({ ...prev, data: newData }));
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={addDataPoint}
              className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
            >
              Add Data Point
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!currentData.title || currentData.data.length === 0}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-600"
              >
                Create Chart
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
