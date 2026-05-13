import Member from "../models/member.js";
import { Op } from "sequelize";

export const searchDonors = async (req, res) => {
  try {
    const { bloodGroup, city, minAge, maxAge } = req.query;

    const minAgeNum = Number(minAge);
    const maxAgeNum = Number(maxAge);

    if (
      (minAge && minAgeNum < 18) ||
      (maxAge && maxAgeNum > 60)
    ) {
      return res.status(400).json({
        message: "Donor age must be between 18 and 60",
      });
    }

    const whereCondition = {
      isActive: true,
    };

    if (bloodGroup) {
      whereCondition.bloodGroup = bloodGroup;
    }

    if (city) {
      whereCondition.currentAddress = {
        [Op.like]: `%${city}%`,
      };
    }

    if (minAge || maxAge) {
      const today = new Date();

      const dobCondition = {};

      if (maxAge) {
        const minDOB = new Date();

        minDOB.setFullYear(
          today.getFullYear() - maxAgeNum
        );

        dobCondition[Op.gte] = minDOB;
      }

      if (minAge) {
        const maxDOB = new Date();

        maxDOB.setFullYear(
          today.getFullYear() - minAgeNum
        );

        dobCondition[Op.lte] = maxDOB;
      }

      whereCondition.dateOfBirth = dobCondition;
    }

    const donors = await Member.findAll({
      where: whereCondition,

      attributes: [
        "id",
        "name",
        "bloodGroup",
        "mobileNumber",
        "dateOfBirth",
        "currentAddress",
        "permanentAddress",
      ],
    });

    res.status(200).json({
      message: `Found ${donors.length} donor(s)`,
      donors,
    });
  } catch (error) {
    console.error("Error searching donors:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};