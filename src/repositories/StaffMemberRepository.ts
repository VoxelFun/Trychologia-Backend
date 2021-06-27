import { DbStaffMember } from "../library/model-db/DbStaffMember";
import queryMariaDb from "../utils/sql/MariaDbConnection";
import StaffMemberTable from "./tables/StaffMemberTable";
import { TableName } from "./tables/TableName";


const StaffMemberRepository = {

    async selectByUserId(userId: number) {
        return (await queryMariaDb(sqlBuilder => sqlBuilder
            .select(
                TableName.StaffMember,
                [
                    StaffMemberTable.id,
                    StaffMemberTable.name,
                    StaffMemberTable.description
                ]
            )
            .whereEqual(StaffMemberTable.user_id, userId)
        )).toObject<DbStaffMember>();
    },

    async update(staffMember: DbStaffMember) {
        (await queryMariaDb(sqlBuilder => sqlBuilder
            .updateMany(
                TableName.StaffMember,
                [StaffMemberTable.name, StaffMemberTable.description],
                [staffMember.name, staffMember.description]
            ).whereEqual(StaffMemberTable.id, staffMember.id)
        ));
    }

};

export default StaffMemberRepository;