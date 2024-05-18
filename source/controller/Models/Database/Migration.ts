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

    // Admin role
    const adminRole = await Role.findOneBy({ name: "admin" }) || new Role

    // Set name
    adminRole.name = "admin"

    // Save admin role
    await adminRole.save()

    // Admin user
    const adminUser = await User.findOneBy({ role: { id: adminRole.id } }) || new User

    // Set username
    adminUser.username = "admin"

    // Set password
    await adminUser.setPassword("admin123")

    // Set role
    adminUser.role = adminRole

    // Save admin user
    await adminUser.save()
}