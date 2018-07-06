const apiEndpoint = 'http://localhost:3001';

export const getEmployees = () =>
    fetch(`${apiEndpoint}/employees`, { method: 'GET' })
    .then(response => response.json());

export const getEmployee = (id) =>
    fetch(`${apiEndpoint}/employees/${id}`, { method: 'GET' })
        .then(response => response.json());

export const getToDos = (id) =>
    fetch(`${apiEndpoint}/todo?employee=${id}&_sort=completed`, { method: 'GET' })
        .then(response => response.json());

export const updateTodo = (todo) =>
    fetch(`${apiEndpoint}/todo/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    }).then(response => response.json());

export const getReviews = (employeeId) =>
    fetch(`${apiEndpoint}/reviews/${employeeId}`, { method: 'GET' })
        .then(response => response.json());

export const addReview = (review) =>
    fetch(`${apiEndpoint}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    }).then(response => response.json());

export const updateReview = (review) =>
    fetch(`${apiEndpoint}/reviews/${review.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    }).then(response => response.json());