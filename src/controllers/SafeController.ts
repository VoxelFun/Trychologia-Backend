import * as express from "express";
import StaffMemberService from "../services/StaffMemberService";
import VisitsHolderService from "../services/VisitsHolderService";
import Logger from "../utils/Logger";

const router = express.Router();

router.get("/staff-members/get", async (request, response) => {
    const staffMembers = (await StaffMemberService.getSaveStaffMembers());
    response.json(staffMembers);
});

router.post("/customer/visit/book", async (request, response) => {
    try {
        await VisitsHolderService.bookVisit(request.body);
        response.status(200).send();
    } catch(e) {
        Logger.devLog(e);
        response.status(500).send();
    }
});

export = router;