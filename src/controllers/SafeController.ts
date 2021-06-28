import * as express from "express";
import StaffMemberService from "../services/StaffMemberService";

const router = express.Router();

router.get("/staff-members/get", async (request, response) => {
    const staffMembers = (await StaffMemberService.getSaveStaffMembers());
    response.json(staffMembers);
});

export = router;