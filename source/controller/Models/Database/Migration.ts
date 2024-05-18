import Role from "./Entities/Role"
import User from "./Entities/User"

/*
|-----------------------------
|  Migration
|-----------------------------
|
|
*/
export default async function () {

    // Owner role
    const ownerRole = await Role.findOneBy({ name: "owner" }) || new Role

    // Set name
    ownerRole.name = "owner"

    // Save admin role
    await ownerRole.save()

    // Admin user
    const adminUser = await User.findOneBy({ role: { id: ownerRole.id } }) || new User

    // Set username
    adminUser.username = "admin"

    // Set password
    await adminUser.setPassword("admin123")

    // Set role
    adminUser.role = ownerRole

    // Save admin user
    await adminUser.save()

    // Judge role
    const judgeRole = await Role.findOneBy({ name: "judge" }) || new Role

    // Set name
    judgeRole.name = "judge"

    // Save judge role
    await judgeRole.save()
}