import React from "react";
import { MdOutlineEuro } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdBorderColor } from "react-icons/md";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const state = {
    series: [
      {
        name: "Pedidos",
        data: [450, 400, 300, 500, 200, 100, 666, 800, 100, 150, 600, 700],
      },
      {
        name: "Ganancias",
        data: [200, 300, 400, 500, 600, 700, 400, 300, 500, 200, 100, 666],
      },
      {
        name: "Vendedores",
        data: [100, 200, 300, 400, 500, 600, 300, 400, 500, 600, 700, 400],
      },
    ],
    options: {
      colors: ["#68b2e4", "#f33232e2", "#a1dfa5"],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#d0d2d6",
      },
      stroke: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: ["#181ee8", "#f57c00", "#0288d1"],
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ],
      },
      legend: {
        position: "top",
      },
      responsive: [
        {
          breakpoint: 565,
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: 550,
            },
          },
        },
      ],
    },
  };
  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-[#dfa1a1] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#343333]">
            <h2 className="text-3xl font-bold">2340 €</h2>
            <span className="text-md font-medium">Total Ventas</span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full  bg-[#f33232e2] flex justify-center items-center text-xl">
            <MdOutlineEuro className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#cea1df] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#343333]">
            <h2 className="text-3xl font-bold">20</h2>
            <span className="text-md font-medium">Productos</span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#d53492e2] flex justify-center items-center text-xl">
            <MdOutlineProductionQuantityLimits className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#a1dfa5] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#343333]">
            <h2 className="text-3xl font-bold">50</h2>
            <span className="text-md font-medium">Vendedores</span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#6bbc71] flex justify-center items-center text-xl">
            <FaRegUser className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#7bc3f6] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#343333]">
            <h2 className="text-3xl font-bold">3000</h2>
            <span className="text-md font-medium">Pedidos </span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full  bg-[#68b2e4] flex justify-center items-center text-xl">
            <MdBorderColor className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#6a5fdf] p-4 rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-[#6a5fdf] p-4 rounded-md text-[#d0d2d6]">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#d0d2d6] pb-3">
                Mensajes Recientes
              </h2>
              <Link className="font-semibold text-sm text-[#d0d2d6]">
                Mostrar todos
              </Link>
            </div>
            <div className="flex flex-col gap-2 pt-6 text-[#d0d2d6]">
              <ol className="relative  ml-4">
                <li className="mb-3 ml-6">
                  <div className="absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#6a5fdf] rounded-full z-10">
                    <img
                      className="w-full rounded-full h-full shadow-lg"
                      src="http://localhost:5173/images/admin.jpg"
                      alt=""
                    />
                  </div>
                  <div className="p-3 bg-slate-800 border rounded-lg border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link>Admin</Link>
                      <time> 2 day ago</time>
                    </div>
                    <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                      How are you?
                    </div>
                  </div>
                </li>
                <li className="mb-3 ml-6">
                  <div className="absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#6a5fdf] rounded-full z-10">
                    <img
                      className="w-full rounded-full h-full shadow-lg"
                      src="http://localhost:5173/images/admin.jpg"
                      alt=""
                    />
                  </div>
                  <div className="p-3 bg-slate-800 border rounded-lg border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link>Admin</Link>
                      <time> 2 day ago</time>
                    </div>
                    <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                      How are you?
                    </div>
                  </div>
                </li>
                <li className="mb-3 ml-6">
                  <div className="absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#6a5fdf] rounded-full z-10">
                    <img
                      className="w-full rounded-full h-full shadow-lg"
                      src="http://localhost:5173/images/admin.jpg"
                      alt=""
                    />
                  </div>
                  <div className="p-3 bg-slate-800 border rounded-lg border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link>Admin</Link>
                      <time> 2 day ago</time>
                    </div>
                    <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                      How are you?
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md mt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-[#d0d2d6] pb-3">
            Productos Recientes
          </h2>
          <Link to='orders' className="font-semibold text-sm text-[#d0d2d6]">Mostrar todos</Link>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-md text-[#d0d2d6] text-left">
            <thead className="text-sm text-[#d0d2d6] border-slate-600 uppercase border-b">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">Pedido Id</th>
              <th scope="col" className="px-6 py-3 text-left">Precio</th>
              <th scope="col" className="px-6 py-3 text-left">Estado del Pago</th>
              <th scope="col" className="px-6 py-3 text-left">Estado del Pedido</th>
              <th scope="col" className="px-6 py-3 text-left">Activo</th>
            </tr>
            </thead>
            <tbody>
              {
                [1, 2, 3, 4, 5].map((d, i) => <tr key={i}>
                <td scope="row" className="py-3 px-6 font-medium whitespace-nowrap">#234235</td>
                <td scope="row" className="py-3 px-6 font-medium whitespace-nowrap">1000€</td>
                <td scope="row" className="py-3 px-6 font-medium whitespace-nowrap">Pendiente</td>
                <td scope="row" className="py-3 px-6 font-medium whitespace-nowrap">Pendiente</td>
                <td scope="row" className="py-3 px-6 font-medium whitespace-nowrap">
                  <Link>Vista</Link></td>
              </tr>)
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
