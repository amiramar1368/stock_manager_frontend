import CanvasJSReact from "@canvasjs/react-charts";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import useAxios from "../../customHook/useAxios";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function BarChart() {
  const httpServise = useAxios();
  const [dataPoints, setDataPoints] = useState([]);

  async function get10MinStocks() {
      const response = await httpServise.get("/remain-stock");
      if (response.success) {
        const filteredRecords = response.body;
        const data = [];
        for (let i = 0; i < filteredRecords.length; i++) {
          if (filteredRecords[i].number > 0) {
            data.push({
              x: filteredRecords[i].good.name,
              y: filteredRecords[i].number,
              indexLabel: filteredRecords[i].good.name,
            });
          }
        }
        setDataPoints(data);
      } else {
        toast.error(response.message);
      }
  }
  useEffect(() => {
    get10MinStocks();
  }, []);
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1", //"light1", "dark1", "dark2"
    width: 900,  
    height: 500, 
    backgroundColor: "#F6F9FF",
    title: {
      text: "Remain In Stockes",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "pie", //change type to bar, line, area, pie, etc
        // indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default BarChart;
