

const CustomTooltip = ({ active, payload, target, product }:any) => {
  if (active && payload && payload.length && target && product) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].payload.minute}`}</p>
        <p className="intro">{`${payload[0].value} pcs/min`}</p>
        <p className="desc titles">{`TARGET: ${target} pcs/min`}</p>
        <p className="desc titles">{`PRODUCT: ${product}`}</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;