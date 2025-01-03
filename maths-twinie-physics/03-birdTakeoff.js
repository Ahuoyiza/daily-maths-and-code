class BirdPhysics {
    constructor() {
        // Bird physical prop
        this.mass = 0.03; // kg
        this.wingSpan = 0.15; // m
        this.wingArea = 0.015; // m²
        
        // Aerodynamic coefficients
        this.liftCoefficient = 1.5;
        this.dragCoefficient = 0.1;
        
        // Env constants
        this.airDensity = 1.225; // kg/m³
        this.gravity = 9.81; // m/s²
    }

    calcDynamicPressure(velocity) {
        return 0.5 * this.airDensity * Math.pow(velocity, 2);
    }

    calcLift(velocity) {
        const dynamicPressure = this.calcDynamicPressure(velocity);
        return this.liftCoefficient * dynamicPressure * this.wingArea;
    }

    calcDrag(velocity) {
        const dynamicPressure = this.calcDynamicPressure(velocity);
        return this.dragCoefficient * dynamicPressure * this.wingArea;
    }

    calcTorque(velocity, takeoffAngleDegrees) {
        const lift = this.calcLift(velocity);
        const momentArm = this.wingSpan / 4;
        const takeoffAngleRadians = takeoffAngleDegrees * (Math.PI / 180);
        
        // Calc vertical component of lift
        const verticalLift = lift * Math.sin(takeoffAngleRadians);
        
        // Calc torque
        const torque = lift * momentArm;
        
        // Calc if lift is sufficient for takeoff
        const weight = this.mass * this.gravity;
        const canTakeoff = verticalLift > weight;

        return {
            torque,
            lift,
            verticalLift,
            weight,
            canTakeoff
        };
    }

    simulateTakeoff(velocity, takeoffAngleDegrees, timeSeconds = 1, steps = 100) {
        const trajectory = [];
        const dt = timeSeconds / steps;
        let currentHeight = 0;
        let currentTime = 0;
        
        const { verticalLift } = this.calcTorque(velocity, takeoffAngleDegrees);
        const verticalAcceleration = (verticalLift - this.mass * this.gravity) / this.mass;
        const takeoffAngleRadians = takeoffAngleDegrees * (Math.PI / 180);
        const initialVerticalVelocity = velocity * Math.sin(takeoffAngleRadians);

        for (let i = 0; i <= steps; i++) {
            currentHeight = initialVerticalVelocity * currentTime + 
                          0.5 * verticalAcceleration * Math.pow(currentTime, 2);
            
            trajectory.push({
                time: currentTime,
                height: currentHeight
            });
            
            currentTime += dt;
        }

        return trajectory;
    }
}

// for example, if nothing spoil
const bird = new BirdPhysics();
const velocity = 5; // m/s
const takeoffAngle = 15; // degrees

const results = bird.calcTorque(velocity, takeoffAngle);
console.log('Flight Analysis Results:');
console.log(`Required Torque: ${results.torque.toFixed(4)} N⋅m`);
console.log(`Total Lift: ${results.lift.toFixed(4)} N`);
console.log(`Vertical Lift: ${results.verticalLift.toFixed(4)} N`);
console.log(`Bird Weight: ${results.weight.toFixed(4)} N`);
console.log(`Can takeoff: ${results.canTakeoff ? 'Yes' : 'No'}`);

// lets try and simulate takeoff o
const trajectory = bird.simulateTakeoff(velocity, takeoffAngle);
console.log('\nTrajectory Sample (first 3 points):');
trajectory.slice(0, 3).forEach(point => {
    console.log(`Time: ${point.time.toFixed(2)}s, Height: ${point.height.toFixed(4)}m`);
});