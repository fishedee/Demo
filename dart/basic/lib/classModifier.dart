//abstract, 抽象类，没啥好说的
abstract class Vehicle {
  void moveForward(int meters);
}

//base, 只能继承，不能实现接口
base class Vehicle2 {
  void moveForward(int meters) {
  }
}

//interface，只能实现接口，不能继承
interface class Vehicle3 {
  void moveForward(int meters) {
    // ...
  }
}

//final，不能继承，也不能实现接口
final class Vehicle4 {
  void moveForward(int meters) {
    // ...
  }
}

//sealed类，和kotlin的一样
sealed class Vehicle5 {}

class Car extends Vehicle5 {}

class Truck implements Vehicle5 {}

class Bicycle extends Vehicle5 {}

testClassSealed(){
  // ERROR: Cannot be instantiated
  //Vehicle myVehicle = Vehicle5();

  // Subclasses can be instantiated
  Vehicle5 myCar = Car();

  //sealed类的好处是，switch的时候，可以进行exhaustively matched检查
  /*
  String getVehicleSound(Vehicle vehicle) {
    // ERROR: The switch is missing the Bicycle subtype or a default case.
    return switch (vehicle) {
      Car() => 'vroom',
      Truck() => 'VROOOOMM',
    };
  }
  */
}

testClassModifier(){
  testClassSealed();
}