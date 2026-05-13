import Admin from './models/admin.js';
import bcrypt from 'bcryptjs';
import sequelize from './config/database.js';

const resetPassword = async () => {
  try {
    const phoneNumber = '9999999999';
    const newPassword = 'Admin@123';
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const [updated] = await Admin.update(
      { password: hashedPassword },
      { where: { phoneNumber: phoneNumber } }
    );
    
    if (updated) {
      console.log(`✅ Password reset successfully to Admin@123 for ${phoneNumber}`);
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
