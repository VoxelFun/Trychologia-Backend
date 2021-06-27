import * as express from "express";
import { UpdateWeekScheduleRequest } from "../library/api/UpdateWeekSchedule";
import { StaffMember } from "../library/model/StaffMember";
import StaffMemberService from "../services/StaffMemberService";
import WeekScheduleService from "../services/WeekScheduleService";

const router = express.Router();

router.use((request, response, next) => {
    if(request.isAuthenticated())
        return next();
    return response.status(403).send("Not authorized");
});

router.get("/staff-member/get", async (request, response) => {
    const staffMember = (await StaffMemberService.getStaffMember(request.user?.id!));
    response.json(staffMember);
});

router.post("/staff-member/set", async (request, response) => {
    const staffMember = request.body as StaffMember;
    await StaffMemberService.setStaffMember(staffMember);
    response.send();
});

router.post("/week-schedule/update", async (request, response) => {
    const body = request.body as UpdateWeekScheduleRequest;
    const staffMemberId = (await StaffMemberService.getStaffMemberId(request.user?.id!));
    await WeekScheduleService.saveWeekSchedule(staffMemberId, body.weekSchedule);
    response.send();
});

router.get('/authrequired', (req, res) => {
    res.send('you hit the authentication endpoint\n')
});

export = router;