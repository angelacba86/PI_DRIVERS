const { Router } = require("express");
const driversRoutes= require('./driversRoutes');
const teamRoutes= require('./teamRoutes');

const router = Router();

router.use('/driver', driversRoutes);
router.use('/team',teamRoutes);

module.exports = router;
