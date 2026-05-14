import Admin from "./models/admin.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const resetPassword = async () => {
  try {
    const phoneNumber = "9999999999";
    const newPassword = process.env.SEED_PASSWORD;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [updated] = await Admin.update(
      { password: hashedPassword },
      { where: { phoneNumber: phoneNumber } },
    );

    if (updated) {
      console.log(
        `✅ Password reset successfully to ${newPassword} for ${phoneNumber}`,
      );
    } else {
      console.log(`❌ Admin with phone number ${phoneNumber} not found.`);
    }
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

resetPassword();
