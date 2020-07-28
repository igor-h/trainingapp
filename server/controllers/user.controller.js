const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
})


module.exports = {
  insert,
  getUsers,
  getUser
}

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false }); // abort after the last validation error
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

async function getUsers(req, res) {
  var desde = req.query.desde || 0;
  desde = Number(desde);

  User.find({})
      .skip(desde)
      .limit(5)
      //.populate('user', 'fullname email')
      .exec(
          (err, users) => {

              if (err) {
                  return res.status(500).json({
                      ok: false,
                      mensaje: 'Error cargando hospital',
                      errors: err
                  });
              }

              User.count({}, (err, totalCount) => {

                  res.status(200).json({
                      ok: true,
                      users: users,
                      total: totalCount
                  });
              })

          });
}

async function getUser(req, res) {
  var id = req.params.id;

  User.findById(id)
      //.populate('usuario', 'nombre img email')
      .exec((err, user) => {
          if (err) {
              return res.status(500).json({
                  ok: false,
                  mensaje: 'Error al buscar hospital',
                  errors: err
              });
          }

          if (!hospital) {
              return res.status(400).json({
                  ok: false,
                  mensaje: 'El hospital con el id ' + id + 'no existe',
                  errors: { message: 'No existe un hospital con ese ID' }
              });
          }
          res.status(200).json({
              ok: true,
              hospital: hospital
          });
      })
}

//info:https://github.com/gothinkster/node-express-realworld-example-app/blob/master/routes/api/articles.js#L15