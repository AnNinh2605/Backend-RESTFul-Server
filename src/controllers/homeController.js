const homeController = (req, res) => {
    res.send('Hello Wordsdd!')
}

const abc = (req, res) => {
    res.send('ABC')
}
const staticfile =(req, res) => {
    res.render('view1.ejs')
}

module.exports = {
    homeController,
    abc,
    staticfile
}