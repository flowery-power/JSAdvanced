function solve() {
  class Circle {
    constructor(r) {
      this.getR = () => {
        return r;
      };
      this.setR = (value) => {
        r = value;
      };

      this.getDiameter = () => {
        return r * 2;
      };
      this.setDiameter = (value) => {
        this.setR(value / 2);
      };
    }
    get area() {
      return this.getR() ** 2 * Math.PI;
    }
  }
  const myCircle = new Circle(3);
  console.log(myCircle.getR());
  console.log(myCircle.getDiameter());
}
solve();
