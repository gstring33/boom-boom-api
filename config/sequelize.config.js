module.exports = {
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    models: {
        user: {
            attributes: [
                'firstname',
                'lastname',
                'email',
                'roles',
                'isActive',
                'isChoiceAllowed',
                'lastConnectionAt',
                'createdAt',
                'updatedAt'
            ]
        },
        event: {
            attributes: [
                "location",
                "name",
                "createdAt"
            ]
        }
    }
}