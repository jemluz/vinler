module.exports = app => {
    const salvar = (req, res) => {
        res.send('user save')
    }

    return { salvar }
}