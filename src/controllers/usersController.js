const bcrypt = require('bcryptjs');
const db = require('../database/models');

const controller = {
    login: (req, res) => {
        res.render('users/login');
    },
    processLogin: (req, res) => {
        db.User.findOne({
            where: { email: req.body.email },
            include: ['role']
        })
            .then(userToLogin => {
                if (userToLogin) {
                    const isOkPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
                    if (isOkPassword) {
                        delete userToLogin.password; // Aunque sea instancia Sequelize, no queremos mandarla a session con pass
                        req.session.userLogged = userToLogin;

                        if (req.body.remember_user) {
                            res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 60 * 24 * 30 }); // 30 días
                        }

                        return res.redirect('/users/profile');
                    }
                }

                return res.render('users/login', {
                    errors: {
                        email: {
                            msg: 'Las credenciales son inválidas'
                        }
                    }
                });
            })
            .catch(err => res.send(err));
    },
    register: (req, res) => {
        res.render('users/register');
    },
    processRegister: (req, res) => {
        db.User.findOne({
            where: { email: req.body.email }
        })
            .then(userInDB => {
                if (userInDB) {
                    return res.render('users/register', {
                        errors: {
                            email: {
                                msg: 'Este email ya está registrado'
                            }
                        },
                        oldData: req.body
                    });
                }

                db.User.create({
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    role_id: 2, // Por defecto 'user'
                    image: req.file ? req.file.filename : 'default-user.jpg'
                })
                    .then(() => {
                        res.redirect('/users/login');
                    });
            })
            .catch(err => res.send(err));
    },
    profile: (req, res) => {
        res.render('users/profile', {
            user: req.session.userLogged
        });
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/');
    }
};

module.exports = controller;
