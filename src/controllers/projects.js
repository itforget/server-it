class ProjectsController {
  static async ok(req, res) {
    res.status(200).json({ ok: true });
  }
}

module.exports = ProjectsController;
