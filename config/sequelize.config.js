module.exports = {
    attributes : {
        user: [
            'uuid',
            'firstname',
            'lastname',
            'email',
            'roles',
            'isActive',
            'isChoiceAllowed',
            'lastConnectionAt',
            'createdAt',
            'updatedAt'
        ],
        event: [
            "location",
            "name",
            "createdAt",
            "eventAt"
        ],
    }
}