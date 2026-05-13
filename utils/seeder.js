// import bcrypt from "bcryptjs";
// import Admin from "../models/admin.js";
// import Member from "../models/member.js";
// import { connectDB } from "../config/database.js";
// import sequelize from "../config/database.js";

// const seedDatabase = async () => {
//   try {
//     await connectDB();
//     await sequelize.sync({ alter: true });

//     const admins = [
//       {
//         email: "admin@example.com",
//         phoneNumber: "9999999999",
//         password: "admin123",
//       },
//       {
//         email: "test@example.com",
//         phoneNumber: "8888888888",
//         password: "test123",
//       },
//     ];

//     for (const adminData of admins) {
//       const existingAdmin = await Admin.findOne({
//         where: { phoneNumber: adminData.phoneNumber },
//       });

//       if (!existingAdmin) {
//         const hashedPassword = await bcrypt.hash(adminData.password, 10);
//         await Admin.create({
//           email: adminData.email,
//           phoneNumber: adminData.phoneNumber,
//           password: hashedPassword,
//         });
//         console.log(`✅ Admin created: ${adminData.phoneNumber}`);
//       }
//     }

//     const initialMembers = [
//       {
//         name: "Rahul Sharma",
//         email: "rahul@example.com",
//         dateOfBirth: "1995-05-12",
//         mobileNumber: "9876543210",
//         bloodGroup: "A+",
//         permanentAddress: "Bhopal, Madhya Pradesh",
//         currentAddress: "Indore, Madhya Pradesh",
//         role: "MEMBER",
//         isActive: true,
//       },
//       {
//         name: "Anita Verma",
//         email: "anita@example.com",
//         dateOfBirth: "1992-10-08",
//         mobileNumber: "9876543211",
//         bloodGroup: "O+",
//         permanentAddress: "Delhi",
//         currentAddress: "Pune",
//         role: "PRESIDENT",
//         isActive: true,
//       },
//     ];

//     for (const memberData of initialMembers) {
//       const existingMember = await Member.findOne({
//         where: { email: memberData.email },
//       });

//       if (!existingMember) {
//         await Member.create(memberData);
//         console.log(`✅ Member created: ${memberData.name}`);
//       }
//     }

//     console.log("🌱 Seeding complete!");
//     process.exit(0);
//   } catch (error) {
//     console.error("❌ Seeding failed:", error);
//     process.exit(1);
//   }
// };

// seedDatabase();
