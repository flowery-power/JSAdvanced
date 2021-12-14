class Stringer {
  constructor(string, length) {
    this.innerString = string;
    this.innerLength = length;
  }
  increase(length) {
    this.innerLength += length;
  }

  decrease(length) {
    this.innerLength -= length;
    if (this.innerLength < 0) {
      this.innerLength = 0;
    }
  }

  toString() {
    let result = "";
    if (this.innerLength < this.innerString.length) {
      result = this.innerString.slice(0, this.innerLength) + "...";
    } else {
      result = this.innerString;
    }
    return result;
  }
}
