const db = require('../../database/models');

const controller = {
    // Listado de usuarios
    list: (req, res) => {
        db.User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'email']
        })
            .then(users => {
                const usersWithDetail = users.map(user => {
                    return {
                        id: user.id,
                        name: `${user.first_name} ${user.last_name}`,
                        email: user.email,
                        detail: `/api/users/${user.id}`
                    }
                });

                return res.json({
                    count: users.length,
                    users: usersWithDetail
                });
            })
            .catch(err => res.status(500).json({ error: err.toString() }));
    },

    // Detalle de un usuario
    detail: (req, res) => {
        db.User.findByPk(req.params.id, {
            attributes: { exclude: ['password', 'role_id'] }, // Excluir data sensible
        })
            .then(user => {
                if (user) {
                    // Agregar URL de la imagen. Asumiendo que las imágenes se sirven estáticamente desde /img/users/
                    // Nota: user.image solo tiene el nombre del archivo.
                    const userDetail = {
                        ...user.dataValues,
                        imageUrl: `/img/users/${user.image}`
                    };
                    return res.json(userDetail);
                } else {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
            })
            .catch(err => res.status(500).json({ error: err.toString() }));
    }
};

module.exports = controller;
