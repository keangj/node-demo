let db = [{db: 'db'}]
class UsersCtl {
  getUsers (ctx) {
    ctx.body = db;
  }
  createUser (ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      },
      age: {
        type: 'number',
        required: false
      }
    })
    const data = ctx.request.body
    db.push(data)
    ctx.body = data
  }
  deleteUser (ctx) {
    const { id } = ctx.params
    db = db.filter((item, index) => {
      console.log(index, id);
      return index + 1 !== parseInt(id)
    })
    ctx.status = 204;
    ctx.body = db
  }
  updateUser (ctx) {
    const { id } = ctx.params
    console.log(id);
    db[id-1] = ctx.request.body
    ctx.body = ctx.request.body
  }
}

module.exports = new UsersCtl()