import * as Model from './model'

//logic used to calculate carbon footprint reverse engineered from climateneutralnow.org which is supported by the UN
class FootprintFormula {
    constructor(uiState) {
        this.uiState = uiState
    }

    //the logic used for calculating the transportation part of the carbon footprint calculator
    transport() {
        let unitFactor = 0

        if(this.uiState[Model.FIELD_IDS.dist_units] === 'km') {
            unitFactor = 1

        } else if(this.uiState[Model.FIELD_IDS.dist_units] == 'mile') {
            unitFactor = 1.60934
        }

        let carTypeFactor = 0

        if(this.uiState[Model.FIELD_IDS.car_type] == 'none') {
            carTypeFactor = 0

        } else if(this.uiState[Model.FIELD_IDS.car_type] == 'avg_diesel') {
            carTypeFactor = 0.12

        } else if(this.uiState[Model.FIELD_IDS.car_type] == 'avg_gas') {
            carTypeFactor = 0.2

        } else if(this.uiState[Model.FIELD_IDS.car_type] == 'hybrid') {
            carTypeFactor = 0.1

        } else if(this.uiState[Model.FIELD_IDS.car_type] == 'large_diesel') {
            carTypeFactor = 0.14

        } else if(this.uiState[Model.FIELD_IDS.car_type] == 'large_gas') {
            carTypeFactor = 0.27

        } else if(this.uiState[Model.FIELD_IDS.car_type] == 'medium_gas') {
            carTypeFactor = 0.22

        } else if(this.uiState[Model.FIELD_IDS.car_type] == 'small_diesel') {
            carTypeFactor = 0.12

        } else if(this.uiState[Model.FIELD_IDS.car_type] == 'small_gas') {
            carTypeFactor = 0.17
        }

        let carResult = 52 * carTypeFactor * this.uiState[Model.FIELD_IDS.car_dist] / 1000

        let publicResult = 52 / 1000 * (
            this.uiState[Model.FIELD_IDS.motorcycle_dist] * 0.12240989
            + this.uiState[Model.FIELD_IDS.intercity_rail_dist] * 0.08947728
            + this.uiState[Model.FIELD_IDS.bus_dist] * 0.03603946
            + this.uiState[Model.FIELD_IDS.commuter_rail_dist] * 0.10811838
            + this.uiState[Model.FIELD_IDS.tram_dist] * 0.08264221
        )

        return this.uiState[Model.FIELD_IDS.num_years] * unitFactor * (carResult + publicResult)
    }

    //the logic used for calculating the waste part of the carbon footprint calculator
    waste() {
        let wasteFactor = 0

        if(this.uiState[Model.FIELD_IDS.recycling_amount] == 'everything') {
            wasteFactor = 0.30882246328271

        } else if(this.uiState[Model.FIELD_IDS.recycling_amount] == 'much') {
            wasteFactor = 0.416125183575856

        } else if(this.uiState[Model.FIELD_IDS.recycling_amount] == 'nothing') {
            wasteFactor = 0.523427903869001
        }

        return this.uiState[Model.FIELD_IDS.num_years] * this.uiState[Model.FIELD_IDS.num_people] * wasteFactor
    }

    //the logic used for calculating the energy part of the carbon footprint calculator
    energy() {
        let electricityVal = 0

        if(this.uiState[Model.FIELD_IDS.know_electricty_use] == 'yes') {
            electricityVal = this.uiState[Model.FIELD_IDS.num_years] * this.uiState[Model.FIELD_IDS.electricity_use] * 0.547096737 / 1000

        } else if(this.uiState[Model.FIELD_IDS.know_electricty_use] == 'no') {
            electricityVal = this.uiState[Model.FIELD_IDS.num_years] * this.uiState[Model.FIELD_IDS.num_people] * 4400.642 * 0.547096737 / 1000
        }

        let areaUnitsFactor = 0

        if(this.uiState[Model.FIELD_IDS.area_units] == 'm2') {
            areaUnitsFactor = 1

        } else if(this.uiState[Model.FIELD_IDS.area_units] == 'ft2') {
            areaUnitsFactor = 0.092903
        }

        let fuelTypeFactor = 0

        if(this.uiState[Model.FIELD_IDS.main_fuel] == 'electric') {
            fuelTypeFactor = 0

        } else if(this.uiState[Model.FIELD_IDS.main_fuel] == 'none') {
            fuelTypeFactor = 0

        } else if(this.uiState[Model.FIELD_IDS.main_fuel] == 'charcoal') {
            fuelTypeFactor = 56000

        } else if(this.uiState[Model.FIELD_IDS.main_fuel] == 'coal') {
            fuelTypeFactor = 98300

        } else if(this.uiState[Model.FIELD_IDS.main_fuel] == 'heating_oil') {
            fuelTypeFactor = 74100

        } else if(this.uiState[Model.FIELD_IDS.main_fuel] == 'unknown') {
            fuelTypeFactor = 98300

        } else if(this.uiState[Model.FIELD_IDS.main_fuel] == 'natural_gas') {
            fuelTypeFactor = 56100

        } else if(this.uiState[Model.FIELD_IDS.main_fuel] == 'peat') {
            fuelTypeFactor = 106000

        } else if(this.uiState[Model.FIELD_IDS.main_fuel] == 'vegetable_oil') {
            fuelTypeFactor = 39800

        } else if(this.uiState[Model.FIELD_IDS.main_fuel] == 'wood') {
            fuelTypeFactor = 56000

        }

        let fuelVal = 117849.803305017 * this.uiState[Model.FIELD_IDS.house_floor_area] * areaUnitsFactor * this.uiState[Model.FIELD_IDS.num_years] * fuelTypeFactor * 0.0000000000036

        return electricityVal + fuelVal
    }

    //the logic used for calculating the lifestyle part of the carbon footprint calculator
    lifestyle() {
        let dietFactor = 0

        if(this.uiState[Model.FIELD_IDS.diet] == 'meat') {
            dietFactor = 3.3

        } else if(this.uiState[Model.FIELD_IDS.diet] == 'vegan') {
            dietFactor = 1.5

        } else if(this.uiState[Model.FIELD_IDS.diet] == 'vegetarian') {
            dietFactor = 1.7
        }

        return (
            this.uiState[Model.FIELD_IDS.num_people] * this.uiState[Model.FIELD_IDS.num_years] * dietFactor
            * (this.uiState[Model.FIELD_IDS.shop_local_produce] == 'yes' ? 89 / 100 : 1)
            * (this.uiState[Model.FIELD_IDS.shop_organic_food] == 'yes' ? 65 / 100 : 1)
        )
    }

    //sum of all four parts of the carbon footprint calculation
    total() {
        return this.transport() + this.waste() + this.energy() + this.lifestyle()
    }
}

export default FootprintFormula
