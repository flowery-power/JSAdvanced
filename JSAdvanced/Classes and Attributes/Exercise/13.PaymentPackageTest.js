const { expect, assert } = require("chai");
const PaymentPackage = require("./Project");

describe("PaymentPackage Test", () => {
  let instance = undefined;
  //beforeEach(() => {instance = new PaymentPackage('Name', 100)})
  it("constructor tests", () => {
    let instance = new PaymentPackage("Name", 100);
    assert.equal(instance._name, "Name");
    assert.equal(instance._value, 100);
    assert.equal(instance._VAT, 20);
    assert.equal(instance._active, true);
  });

  it("name tests", () => {
    instance = new PaymentPackage("Name", 100);
    assert.equal(instance.name, "Name");
    instance.name = "Pesho";
    assert.equal(instance.name, "Pesho");
    assert.throw(() => {instance.name = "";}, "Name must be a non-empty string");
    assert.throw(() => {instance.name = 2;}, "Name must be a non-empty string");
  });

  it("VAT tests", () => {
    instance = new PaymentPackage("Name", 100);
    assert.equal(instance.VAT, 20);
    instance.VAT = 40;
    assert.equal(instance.VAT, 40);
    assert.throw(() => {instance.VAT = -2;}, "VAT must be a non-negative number");
    assert.throw(() => {instance.VAT = "2";}, "VAT must be a non-negative number");
    assert.throw(() => {instance.VAT = "string";}, "VAT must be a non-negative number");
    assert.throw(() => {instance.VAT = undefined;}, "VAT must be a non-negative number");
  });

  it("value tests", () => {
    instance = new PaymentPackage("Name", 100);
    assert.equal(instance.value, 100);
    instance.value = 40;
    assert.equal(instance.value, 40);
    assert.throw(() => {instance.value = -2;}, "Value must be a non-negative number");
    assert.throw(() => {instance.value = "2";}, "Value must be a non-negative number");
    assert.doesNotThrow(() => {instance.value = 0})
  });

  it("active tests", () => {
    instance = new PaymentPackage("Name", 100);
    assert.equal(instance.active, true);
    assert.throw(() => {instance.active = 0;}, "Active status must be a boolean");
    assert.throw(() => {instance.active = "";}, "Active status must be a boolean");
  });

  it("toString tests", () => {
    
    function getString(name, value, VAT = 20, active = true) {
      return [
        `Package: ${name}` + (active === false ? " (inactive)" : ""),
        `- Value (excl. VAT): ${value}`,
        `- Value (VAT ${VAT}%): ${value * (1 + VAT / 100)}`,
      ].join("\n");
    }
    instance = new PaymentPackage("Name", 100);

    assert.equal(instance.toString(), getString('Name', 100))
    instance.active = false
    assert.equal(instance.toString(), getString('Name', 100, 20, false))
    instance.VAT = 200
    assert.equal(instance.toString(), getString('Name', 100, 200, false))
    instance.name = 'Peter'
    assert.equal(instance.toString(), getString('Peter', 100, 200, false))
    instance.value = 2
    assert.equal(instance.toString(), getString('Peter', 2, 200, false))
  });
});
