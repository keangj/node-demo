let db = [{db: 'db'}]
class UsersCtl {
  getUsers (ctx) {
    ctx.body = db;
  }
  createUser (ctx) {
    console.log('ctx', ctx.request);
    const data = ctx.request.body
    console.log(data);
    db.push(data)
    ctx.body = data
  }
  deleteUser (ctx) {
    const { id } = ctx.params
    console.log(id)
    db = db.filter((item, index) => {
      console.log(index, id);
      return index + 1 !== parseInt(id)
    })
    console.log(db)
    ctx.status = 204;
    ctx.body = db
  }
  modifyUser (ctx) {
    const { id } = ctx.params
    db[id-1] = ctx.request.body
    ctx.body = ctx.request.body
  }
}

module.exports = new UsersCtl()