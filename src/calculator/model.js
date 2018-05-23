const TIMESTAMP_KEY = 'timestamp'

//the model for the carbon footprint calculator defining all the fields to be used
//for easier implementation and to make each page of the calculator less messy

export const CAR_TYPES = [
    {id: 'none', text: 'None'},
    {id: 'avg_diesel', text: 'Average diesel car'},
    {id: 'avg_gas', text: 'Average petrol car'},
    {id: 'hybrid', text: 'Electric hybrid'},
    {id: 'large_diesel', text: 'Large diesel car over 2.0 litre'},
    {id: 'large_gas', text: 'Large petrol car above 2.1 litres'},
    {id: 'medium_gas', text: 'Medium petrol car from 1.4-2.1 litres'},
    {id: 'small_diesel', text: 'Small diesel car 2.0 litre or under'},
    {id: 'small_gas', text: 'Small petrol car max 1.4 litre engine'}
]

export const FUEL_TYPES = [
    {id: 'electric', text: 'Electricity'},
    {id: 'none', text: 'No heating'},
    {id: 'charcoal', text: 'Charcoal'},
    {id: 'coal', text: 'Coal'},
    {id: 'heating_oil', text: 'Heating Oil'},
    {id: 'unknown', text: 'I don\'t know'},
    {id: 'natural_gas', text: 'Natural Gas'},
    {id: 'peat', text: 'Peat'},
    {id: 'vegetable_oil', text: 'Vegetable Oil'},
    {id: 'wood', text: 'Wood'}
]

export const DISTANCE_UNITS = [
    {id: 'km', text: 'Km'},
    {id: 'mile', text: 'Mile'}
]

export const AREA_UNITS = [
    {id: 'm2', text: 'm²'},
    {id: 'ft2', text: 'ft²'}
]

export const RECYCLING_LEVELS = [
    {id: 'everything', text: 'Almost everything'},
    {id: 'much', text: 'Much'},
    {id: 'nothing', text: 'Almost nothing'}
]

export const DIET_TYPES = [
    {id: 'meat', text: 'Meat lover'},
    {id: 'vegan', text: 'Vegan'},
    {id: 'vegetarian', text: 'Vegetarian'}
]

export const FIELD_TYPES = {
    number: 'number',
    bool: 'bool',
    select: 'select'
}

export const FIELD_IDS = {
    num_people: 'num_people',
    num_years: 'num_years',
    dist_units: 'dist_units',
    car_type: 'car_type',
    car_dist: 'car_dist',
    motorcycle_dist: 'motorcycle_dist',
    intercity_rail_dist: 'intercity_rail_dist',
    bus_dist: 'bus_dist',
    commuter_rail_dist: 'commuter_rail_dist',
    tram_dist: 'tram_dist',
    recycling_amount: 'recycling_amount',
    know_electricty_use: 'know_electricty_use',
    electricity_use: 'electricity_use',
    main_fuel: 'main_fuel',
    area_units: 'area_units',
    house_floor_area: 'house_floor_area',
    diet: 'diet',
    shop_local_produce: 'shop_local_produce',
    shop_organic_food: 'shop_organic_food'
}

export const FIELDS = [
    {id: FIELD_IDS.num_people, type: FIELD_TYPES.number, text: 'Number of people', options: null},
    {id: FIELD_IDS.num_years, type: FIELD_TYPES.number, text: 'Number of years', options: null},
    {id: FIELD_IDS.dist_units, type: FIELD_TYPES.select, text: 'Distance units', options: DISTANCE_UNITS},
    {id: FIELD_IDS.car_type, type: FIELD_TYPES.select, text: 'Car type', options: CAR_TYPES},
    {id: FIELD_IDS.car_dist, type: FIELD_TYPES.number, text: 'Car distance', options: null},
    {id: FIELD_IDS.motorcycle_dist, type: FIELD_TYPES.number, text: 'Motor bike distance', options: null},
    {id: FIELD_IDS.intercity_rail_dist, type: FIELD_TYPES.number, text: 'Intercity rail distance', options: null},
    {id: FIELD_IDS.bus_dist, type: FIELD_TYPES.number, text: 'Bus distance', options: null},
    {id: FIELD_IDS.commuter_rail_dist, type: FIELD_TYPES.number, text: 'Commuter rail distance', options: null},
    {id: FIELD_IDS.tram_dist, type: FIELD_TYPES.number, text: 'Tram distance', options: null},
    {id: FIELD_IDS.recycling_amount, type: FIELD_TYPES.select, text: 'How much do you recycle?', options: RECYCLING_LEVELS},
    {id: FIELD_IDS.know_electricty_use, type: FIELD_TYPES.bool, text: 'Do you know what your yearly electricty consumption is?', options: null},
    {id: FIELD_IDS.electricity_use, type: FIELD_TYPES.number, text: 'Yearly household electricity consumption in Kwh', options: null},
    {id: FIELD_IDS.main_fuel, type: FIELD_TYPES.select, text: 'Main fuel used for heating', options: FUEL_TYPES},
    {id: FIELD_IDS.area_units, type: FIELD_TYPES.select, text: 'Area units', options: AREA_UNITS},
    {id: FIELD_IDS.house_floor_area, type: FIELD_TYPES.number, text: 'Household floor area', options: null},
    {id: FIELD_IDS.diet, type: FIELD_TYPES.select, text: 'Diet', options: DIET_TYPES},
    {id: FIELD_IDS.shop_local_produce, type: FIELD_TYPES.bool, text: 'Do you shop mostly for local produce?', options: null},
    {id: FIELD_IDS.shop_organic_food, type: FIELD_TYPES.bool, text: 'Do you shop mostly for organic food?', options: null}
]

export function store(data) {
    console.log(data)
    FIELDS.forEach(field => {
        localStorage.setItem(field.id, data[field.id].toString())
    })

    let nowMilis = new Date().valueOf()
    localStorage.setItem(TIMESTAMP_KEY, nowMilis.toString())
}

export function load() {
    let data = {}

    FIELDS.forEach(field => {
        let val = localStorage.getItem(field.id)

        if (val == null) {
            if (field.type === FIELD_TYPES.number) {
                data[field.id] = 0

            } else if (field.type === FIELD_TYPES.bool) {
                data[field.id] = 'no'

            } else if (field.type === FIELD_TYPES.select) {
                data[field.id] = field.options[0].id
            }

        } else {
            if (field.type === FIELD_TYPES.number) {
                let parsed = Number.parseInt(val, 10)
                data[field.id] = Number.isNaN(parsed) ? 0 : parsed

            } else {
                data[field.id] = val
            }
        }
    })

    let nowMilis = localStorage.getItem(TIMESTAMP_KEY)
    let timestampDate = new Date()

    if (nowMilis != null) {
        let milisNum = Number.parseInt(nowMilis)
        if (!Number.isNaN(milisNum)) {
            timestampDate = new Date(milisNum)
        }
    }

    data.timestamp = timestampDate


    return data

}
