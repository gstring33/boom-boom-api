module.exports = {
    attributes : {
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