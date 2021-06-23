import * as express from "express";

const router = express.Router();

router.use((request, response, next) => {
    if(request.isAuthenticated())
        return next();
    return response.status(403).send("Not authorized");
})

router.get('/authrequired', (req, res) => {
    res.send('you hit the authentication endpoint\n')
});

export = router;