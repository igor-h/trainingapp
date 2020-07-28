
const jwt = require('jsonwebtoken');
const config = require('./config');
const SEED = config.jwtSecret


// ==========================================
//  verify token
// ==========================================
exports.verifyToken = function(req, res, next) {

    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.user = decoded.user;

        next();

    });

}


// ==========================================
//  Verificar ADMIN
// ==========================================
exports.verificaADMIN_ROLE = function(req, res, next) {

    var user = req.user;

    if (user.roles === 'ADMIN_ROLE') {
        next();
        return;
    } else {

        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto - No es administrador',
            errors: { message: 'No es administrador, no puede hacer eso' }
        });

    }

}


// ==========================================
//  Verificar ADMIN o Mismo Usuario / para modificar propiedades usuario
// ==========================================
// exports.verificaADMIN_o_MismoUsuario = function(req, res, next) {


//     var usuario = req.usuario;
//     var id = req.params.id;

//     if (usuario.role === 'ADMIN_ROLE' || usuario._id === id) {
//         next();
//         return;
//     } else {

//         return res.status(401).json({
//             ok: false,
//             mensaje: 'Token incorrecto - No es administrador ni es el mismo usuario',
//             errors: { message: 'No es administrador, no puede hacer eso' }
//         });

//     }


// }