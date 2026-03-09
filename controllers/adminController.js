
import Donor  from '../models/Donor.js';


export const verifyDonor = async (req, res) => {
  try {
    const { donorId } = req.params;

    const donor = await Donor.findByPk(donorId);

    if (!donor) {
      return res.status(404).json({ message: "Donor not found." });
    }

    donor.verificationStatus = 'Active'; 
    await donor.save();

    res.status(200).json({ 
      message: `Donor ${donor.fullName} has been successfully verified and is now Active.`,
      donor 
    });

  } catch (error) {
    console.error("Error in verifyDonor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};