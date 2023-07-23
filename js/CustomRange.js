function RangeInput({
  rangeInputMin,
  rangeInputMax,
  numberInputMin,
  numberInputMax,
  onMinChange,
  onMaxChange,
  min,
  max,
}) {
  this.min = min;
  this.max = max;
  const setMins = (value) => {
    this.min = rangeInputMin.value = numberInputMin.value = value;
    onMinChange(value);
  };
  const setMax = (value) => {
    this.max = rangeInputMax.value = numberInputMax.value = value;
    onMaxChange(value);
  };
  const rangeMinChange = (event) => {
    let value = parseInt(event.target.value);
    console.log("rangeMinChange", value, this.min, this.max);
    if (value > this.max) {
      setMins(this.max);
      setMax(value);
    } else {
      setMins(value);
    }
  };
  const rangeMaxChange = (event) => {
    let value = parseInt(event.target.value);
    console.log("rangeMaxChange", value, this.min, this.max);

    if (value < this.min) {
      setMax(this.min);
      setMins(value);
    } else {
      setMax(value);
    }
  };
  const rangeMinInput = (event) => {
    let value = parseInt(event.target.value);

    if (value > this.max) {
      numberInputMin.value = this.max;
      numberInputMax.value = value;
    } else {
      numberInputMax.value = this.max;
      numberInputMin.value = value;
    }
  };
  const rangeMaxInput = (event) => {
    let value = parseInt(event.target.value);

    if (value < this.min) {
      numberInputMax.value = this.min;
      numberInputMin.value = value;
    } else {
      numberInputMin.value = this.min;
      numberInputMax.value = value;
    }
  };
  rangeInputMin.addEventListener("change", rangeMinChange);
  rangeInputMax.addEventListener("change", rangeMaxChange);
  rangeInputMin.addEventListener("input", rangeMinInput);
  rangeInputMax.addEventListener("input", rangeMaxInput);
  numberInputMin.addEventListener("blur", rangeMinChange);
  numberInputMax.addEventListener("blur", rangeMaxChange);
}
