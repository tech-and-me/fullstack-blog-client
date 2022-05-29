const dateFormatter = (dt) => {
  // let newDt;
  // if (!dt || dt === null) newDt = Date.now();

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dt).toLocaleDateString("en-US", options);
};

export default dateFormatter;
