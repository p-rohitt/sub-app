import { productsModel } from "utils/productsModel";

function Table({ products, selectedPlan, selectedInterval }) {
  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly price</td>
          {productsModel.map((product) => (
            <td
              className={`tableDataFeature ${
                selectedPlan === product.id.monthly ||
                selectedPlan === product.id.yearly
                  ? "text-[#204d91]"
                  : "text-[gray]"
              }`}
              key={product.index}
            >
              ₹
              {selectedInterval == "Monthly"
                ? product.prices.monthly
                : product.prices.yearly}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Video quality</td>
          {productsModel.map((product) => (
            <td
              className={`tableDataFeature ${
                selectedPlan === product.id.monthly ||
                selectedPlan === product.id.yearly
                  ? "text-[#204d91]"
                  : "text-[gray]"
              }`}
              key={product.index}
            >
              {product.name}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>
          {productsModel.map((product) => (
            <td
              className={`tableDataFeature ${
                selectedPlan === product.id.monthly ||
                selectedPlan === product.id.yearly
                  ? "text-[#204d91]"
                  : "text-[gray]"
              }`}
              key={product.index}
            >
              {product.resolution}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Watch on</td>
          {productsModel.map((product) => (
            <td
              className={`tableDataFeature ${
                selectedPlan === product.id.monthly ||
                selectedPlan === product.id.yearly
                  ? "text-[#204d91]"
                  : "text-[gray]"
              } flex flex-col space-y-4 text-sm`}
              key={product.index}
            >
                  {product.devices.map((device) => {
                      return (<p key = {product.id.monthly}>{device}</p>)
                 })}
                
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
