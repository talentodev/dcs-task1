class PostMetricsDto {
  #key;
  #value;
  constructor(key, value) {
    this.#key = key;
    this.#value = value;

    this.#validate();
    this.#convert();
  }

  getKey = () => this.#key;
  getValue = () => this.#value;

  #validate = () => {
    if (typeof this.#value === 'undefined') {
      throw "field 'value' is required";
    }
    if (!isFinite(this.#value) || typeof this.#value === 'object') {
      throw "field 'value' must be a number";
    }
  };

  #convert = () => {
    this.#value = Math.round(parseFloat(this.#value));
  };
}

module.exports = PostMetricsDto;
