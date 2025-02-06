import { IdGenerator } from "./IdGenerator"
const ORGIDLENGTH = 12
const makeAdditionalIds = (orgId, role) => {
    return orgId.slice(0, ORGIDLENGTH / 2) + role + orgId.slice(ORGIDLENGTH / 2, ORGIDLENGTH)
}
export const organizationIdGenerator = () => {
    const orgId = IdGenerator(ORGIDLENGTH)
    return {
        orgId,
        orgIds: makeAdditionalIds(orgId, '0'),
        orgIdt: makeAdditionalIds(orgId, '1'),
    }
}