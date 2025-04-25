import React, { forwardRef } from "react";
import { FixedSizeList as List } from "react-window";

function handleOnWheel({ deltaY }) {
  console.log(deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequest = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const Row = ({ index, style }) => {
    return(
    <div style={style} className="flex text-sm text-white font-medium">
      <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
      <div className="w-[25%] p-2 whitespace-nowrap">3.000€</div>
      <div className="w-[25%] p-2 whitespace-nowrap">
        <span className="py-[1px] px-[5px] bg-blue-300 text-blue-500 rounded-md text-sm">
          Pendiente
        </span>
      </div>
      <div className="w-[25%] p-2 whitespace-nowrap">25 Dec 2025</div>
      <div className="w-[25%] p-2 whitespace-nowrap">
        <button className="bg-green-600 shadow-lg hover:shadow-green-800/50 px-3 py-[2px cursor-pointer text-white rounded-sm text-sm]">
          Confirmar
        </button>
      </div>
    </div>
  )
};

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <h2 className="text-xl font-medium pb-5 text-[#d0d2d6]">
          Pedido de pagos
        </h2>
        <div className="w-full">
          <div className="w-full ">
            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#a7a3de] uppercase text-xs min-w-[340px] rounded-md font-bold">
                <div className="w-[25%] p-2">No</div>
                <div className="w-[25%] p-2">Cantidad</div>
                <div className="w-[25%] p-2">Estado</div>
                <div className="w-[25%] p-2">Fecha</div>
                <div className="w-[25%] p-2">Acción</div>
              </div>
              {
                <List
                  style={{ minWidth: "340px" }}
                  className="List"
                  height={350}
                  itemCount={100}
                  itemSize={35}
                  outerElementType={outerElementType}
                >
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentRequest;
