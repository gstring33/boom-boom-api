module.exports = router => {
    router.get('/', async(req, res) => {
        return res.send('Boom boom kdo API')
    })
}