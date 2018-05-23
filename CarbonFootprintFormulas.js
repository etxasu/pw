
// Transportation
function calculateTransportation(numOfYears, distanceTravelledForCar, distanceTravelledForPublic) {

    // this is for km/mile, will be used after getting both car and public transport results
    var distanceUnitValue = 0;
    if (km) { distanceUnitValue = 1; }
    else if (miles) { distanceUnitValue = 1.60934; }

    var carEmissionsFactor = 0;
    // each type of car has a different "emissions factor" which will be used in the formula

    // if (Average diesel car) carEmissionsFactor = 0.12;
    // else if (Average petrol car) carEmissionsFactor = 0.2;
    // else if (Electric hybrid) carEmissionsFactor = 0.1;
    // else if (Large diesel car over 2.0 litre) carEmissionsFactor = 0.14;
    // else if (Large petrol car over 2.1 litre) carEmissionsFactor = 0.27;
    // else if (Medium petrol car from 1.4 to 2.1 litres) carEmissionsFactor = 0.22;
    // else if (Small diesel car 2.0 litre or under) carEmissionsFactor = 0.12;
    // else if (small petrol car max 1.4 litre engine) carEmissionsFactor = 0.17;

    // distanceTravelledForCar is the value given by user in the textbox
    var carResult = 52 * carEmissionsFactor * distanceTravelledForCar / 1000;

    // now we have car result, time for the public transportation:
    
    // we add to this total each time we get a result for a specific public transportation
    var totalPublicTransportationResult = 0;
    var publicEmissionsFactor = 0;
    // again, each mode of public transportation has a different emissions factor
    // 1. Motor bike, publicEmissionsFactor = 0.12240989
    // 2. Intercity rail, publicEmissionsFactor = 0.08947728
    // 3. Bus, publicEmissionsFactor = 0.03603946
    // 4. Commuter rail, publicEmissionsFactor = 0.10811838
    // 5. Tram (subway), publicEmissionsFactor = 0.08264221


    // will probably need a loop to go through all the different modes of public transportation
    // for each of the modes of public transport: 
    var tempResult = 52 * publicEmissionsFactor * distanceTravelledForPublic / 1000;
    // *NOTE: distanceTravelledForPublic will be unique for each mode of transportation according to user input

    // keep adding to the totalPublicTransportationResult
    totalPublicTransportationResult += tempResult;


    // ok now we got both the results for car and public transportation.

    // produce final result using this formula:
    var finalTransportResult = numOfYears * distanceUnitValue * (carResult + totalPublicTransportationResult);
    finalTransportResult = parseFloat(Math.round(finalTransportResult * 100) / 100);

    return finalTransportResult;

}

// Waste
function calculateWaste(numOfYears, numOfPeople){

    // this is much simpler now because it's only for the united states

    var wasteDataFactor = 0.30882246328271; // PLACEHOLDER

    // if(AlmostAllOfIt) {wasteDataFactor = 0.30882246328271}
    // else if (MuchOfIt) {wasteDataFactor = 0.416125183575856}
    // else if (HardlyAtAll) {wasteDataFactor = 0.523427903869001}

    var finalWasteResult = numOfYears * numOfPeople * wasteDataFactor
    finalWasteResult = parseFloat(Math.round(finalWasteResult * 100) / 100);
    return finalWasteResult;
}



// Energy
function calculateEnergy(electricityConsumption, floorArea, numOfPeople, numOfYears){
    
    // Electricity first
    // if the user does NOT know their yearly electricity consumption:
    var electricityResult = numOfYears * numOfPeople * 4400.642 * 0.547096737 / 1000;

    // now if they do know their yearly consumption
    electricityResult = numOfYears * electricityConsumption *  0.547096737 / 1000


    // Other fuels
    // floor area will be used here
    // if m^2 is chosen leave it be, if ft^2 is chosen, MULTIPLY floorArea by 0.092903

    var fuelEmissionsFactor = 56000; //PLACEHOLDER
    // similar to the transportation calculation, fuelEmissionsFactor will change depending on type of fuel chosen

    // 1. charcoal, fuelEmissionsFactor = 56000
    // 2. coal, fuelEmissionsFactor = 98300
    // 3. heating oil, fuelEmissionsFactor = 74100
    // 4. don't know, fuelEmissionsFactor = 98300
    // 5. natural gas, fuelEmissionsFactor = 56100
    // 6. peat, fuelEmissionsFactor = 106000
    // 7. vegetable oil, fuelEmissionsFactor = 39800
    // 8. wood, fuelEmissionsFactor = 56000

    var fuelResult = 117849.803305017 * floorArea * numOfYears * fuelEmissionsFactor * 0.0000000000036; // yes, those are 11 zeros :C

    var totalEnergyResult = electricityResult + fuelResult;
    totalEnergyResult = parseFloat(Math.round(totalEnergyResult * 100) / 100);
    return totalEnergyResult;
}



// LifeStyle

function calculateLifeStyle(numOfPeople, numOfYears){

    var dietFactor = 0;
    // dietFactor changes depending on which choice has been made
    // 1. meat lover, dietFactor = 3.3
    // 2. vegan, dietFactor = 1.5
    // 3. vegetarian, dietFactor = 1.7

    var lifeStyleResult = numOfPeople * numOfYears * dietFactor * 0.545008183306056

    // if "Do you shop mostly for local produce?" is answered yes, do this
    if (localProduceChecked) {lifeStyleResult = lifeStyleResult * 89 / 100}

    //if "Do you shop mostly for organic food?" is answered yes, do this also
    if (mostlyOrganicChecked) {lifeStyleResult = lifeStyleResult * 65 / 100 }

    lifeStyleResult = parseFloat(Math.round(lifeStyleResult * 100) / 100); 
    return lifeStyleResult;
    
}
