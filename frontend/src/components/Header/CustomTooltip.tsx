interface Props{
    time: string,
    made: number,
    target: number,
    product: string,
}

const CustomTooltip = ({ time, made, target, product }:Props) => {
  if (time && made && target && product) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${time}`}</p>
        <p className="intro">{`${made} pcs/min`}</p>
        <p className="desc titles">{`TARGET: ${target} pcs/min`}</p>
        <p className="desc titles">{`PRODUCT: ${product}`}</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;