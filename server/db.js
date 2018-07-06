var faker = require('faker'),
    _ = require('lodash');

function getRandomArrayElement(array, n) {
    let sortedArray = [...array].sort(() => { return 0.5 - Math.random() }), 
        newArray = [];

    _.times(n, (i) => {
        newArray.push(sortedArray[i]);
    });

    return newArray;
}

function generateEmployees() {
    return _.times(30, (i) => {
          return {
              id: i,
              firstName: faker.name.firstName(),
              lastName: faker.name.lastName(),
              prefix: faker.name.prefix(),
              title: faker.name.title(),
              avatar: faker.internet.avatar(),
              admin: faker.random.boolean()
          }
    });
}

function generateReviews(employees) {
    return _.times(30, (i) => {
        let employeeList = getRandomArrayElement(employees, 2);

        return {
            id: i,
            reviewer: employeeList[0].id,
            reviewee: employeeList[1].id,
            review: faker.lorem.paragraph(),
            connection: faker.lorem.sentence(),
            published: faker.random.boolean()
        }
    });
}

function generateToDoList(employees) {
    return _.times(30, (i) => {
        let employeeList = getRandomArrayElement(employees, 2);

        return {
            id: i,
            employee: employeeList[0].id,
            toReview: employeeList[1],
            completed: faker.random.boolean()
        }
    })
}

function generateDatabase() {
    let employees = generateEmployees();

    return {
        employees,
        reviews: generateReviews(employees),
        todo: generateToDoList(employees)
    };
}

module.exports = generateDatabase;
