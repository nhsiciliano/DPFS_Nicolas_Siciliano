const controller = {
    login: (req, res) => {
        res.render('users/login');
    },
    register: (req, res) => {
        res.render('users/register');
    },
    processRegister: (req, res) => {
        // Lógica de registro
        res.redirect('/');
    },
    processLogin: (req, res) => {
        // Lógica de login
        res.redirect('/');
    }
};

module.exports = controller;
