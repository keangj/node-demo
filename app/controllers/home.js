class HomeCtl {
  home (ctx) {
    ctx.body = 'home';
  }

  upload (ctx) {
    const file = ctx.request.files.file
    ctx.body = { path: file.path }
  }
}

module.exports = new HomeCtl()
