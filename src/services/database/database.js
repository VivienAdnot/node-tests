const store = {
    users: [{
        id: 'U1',
        name: 'Vivien',
        job: 'Developer'
    }],

    companies: [{
        id: 'CO1',
        name: 'CO2',
        uniqueSubdomain: 'wwww'
    }],

    credentials: [{
        id: 'CR1',
        email: 'vivienadnot@amplement.com',
        password: 'test',
        _user: 'U1'
    }, {
        id: 'CR2',
        email: 'bruno@jetable.org',
        password: 'test',
        _company: 'CO1'
    }]
};

export default store;
