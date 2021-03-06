const Car = require('../models/Car');
const { carViewModel } = require('./util');

// const fs = require('fs/promises');

// const filePath = './services/data.json';

// async function read() {
//     try {
//         const file = await fs.readFile(filePath);
//         return JSON.parse(file);
//     } catch (err) {
//         console.error('Database read error');
//         process.exit(1);
//     }
// }

// async function write(data) {
//     try {
//         await fs.writeFile(filePath, JSON.stringify(data, null, 2));
//     } catch (err) {
//         console.error('Database write error');
//         console.log(err);
//         process.exit(1);
//     }
// }

async function getAll(query) {
    const options = {
        idsDeleted: false,
    };

    if (query.search) {
        options.name = new RegExp(query.search, 'i');
    }
    if (query.from) {
        options.price = {
            $gte: Number(query.from),
        };
    }
    if (query.to) {
        if (!options.price) {
            options.price = {};
        }
        options.price.$lte = Number(query.to);
    }

    const cars = await Car.find(options); //.lean()
    return cars.map(carViewModel);

    // const data = await read();
    // let cars = Object.entries(data).map(([id, v]) =>
    //     Object.assign({}, { id }, v)
    // );
    // if (query.search) {
    //     cars = cars.filter((c) =>
    //         c.name
    //             .toLocaleLowerCase()
    //             .includes(query.search.toLocaleLowerCase())
    //     );
    // }
    // if (query.from) {
    //     cars = cars.filter((c) => c.price >= Number(query.from));
    // }
    // if (query.to) {
    //     cars = cars.filter((c) => c.price <= Number(query.to));
    // }
    // return cars;
}

async function getById(id) {
    const car = await Car.findById(id)
        .where({ idsDeleted: false })
        .populate('accessories');
    if (car) {
        return carViewModel(car);
    } else {
        return undefined;
    }
    // const data = await read();
    // const car = data[id];
    // if (car) {
    //     return Object.assign({}, { id }, car);
    // } else {
    //     return undefined;
    // }
}

async function createCar(car) {
    const result = new Car(car);
    await result.save();

    // const cars = await read();
    // let id;
    // do {
    //     id = nextId();
    // } while (cars.hasOwnProperty(id));
    // cars[id] = car;
    // await write(cars);
}

async function editById(id, car, ownerId) {
    // await Car.findByIdAndUpdate(id, car);  -- not good for validation

    const existing = await Car.findById(id).where({ idsDeleted: false });

    if (existing.owner != ownerId) {
        return false;
    }

    existing.name = car.name;
    existing.description = car.description;
    existing.imageUrl = car.imageUrl || undefined;
    existing.price = car.price;
    existing.accessories = car.accessories;

    await existing.save();

    return true;

    // const data = await read();
    // if (data.hasOwnProperty(id)) {
    //     data[id] = car;
    //     await write(data);
    // } else {
    //     throw new Error('No such car');
    // }
}

async function attachAccessory(carId, accessoryId, ownerId) {
    const existing = await Car.findById(carId);

    if (existing.owner != ownerId) {
        return false;
    }

    existing.accessories.push(accessoryId);
    await existing.save();
}

async function deleteById(id, ownerId) {
    // await Car.findByIdAndDelete(id);
    const existing = await Car.findById(id).where({ idsDeleted: false });

    if (existing.owner != ownerId) {
        return false;
    }

    await Car.findByIdAndUpdate(id, { idsDeleted: true });

    return true;
    // const data = await read();
    // if (data.hasOwnProperty(id)) {
    //     delete data[id];
    //     await write(data);
    // } else {
    //     throw new Error('No such car');
    // }
}

// function nextId() {
//     return 'xxxxxxxx-xxxx'.replace(/x/g, () =>
//         ((Math.random() * 16) | 0).toString(16)
//     );
// }

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCar,
        editById,
        deleteById,
        attachAccessory,
    };
    next();
};
