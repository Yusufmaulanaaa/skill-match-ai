import { Response } from 'express';
import { z } from 'zod';
import prisma from '../services/prisma.service';
import { AuthRequest } from '../types';

const validEducation = ['High School', 'Diploma', 'Bachelor', 'Master'];

const validInterests = [
  'Frontend Development', 'Backend Development', 'Fullstack Development',
  'Mobile Development', 'Artificial Intelligence', 'Data Science',
  'Cyber Security', 'Cloud Computing', 'UI UX Design',
];

const validSkills = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js',
  'Node.js', 'Express', 'PHP', 'Laravel', 'Python', 'SQL',
  'MongoDB', 'PostgreSQL', 'Docker', 'Git', 'Linux',
];

export const profileSchema = z.object({
  fullName: z.string().min(1, 'Nama lengkap wajib diisi').max(100).optional(),
  education: z
    .string()
    .refine((val) => validEducation.includes(val), {
      message: 'Pendidikan harus dipilih dari pilihan yang tersedia',
    }),
  interest: z
    .string()
    .refine((val) => validInterests.includes(val), {
      message: 'Minat harus dipilih dari pilihan yang tersedia',
    }),
  skills: z
    .array(z.string())
    .min(1, 'Pilih minimal 1 skill')
    .refine(
      (skills) => skills.every((s) => validSkills.includes(s)),
      'Skill tidak valid. Pilih dari daftar skill yang tersedia.'
    ),
});

export async function createProfile(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { education, interest, skills, fullName } = req.body;

    // Update user education, interest, and optionally fullName
    const updateData: any = { education, interest };
    if (fullName) {
      updateData.fullName = fullName;
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    // Delete old skills and create new ones
    await prisma.userSkill.deleteMany({ where: { userId } });

    const skillRecords = await Promise.all(
      skills.map((skill: string) =>
        prisma.userSkill.create({
          data: { userId, skill },
        })
      )
    );

    res.json({
      success: true,
      message: 'Profil berhasil disimpan',
      data: {
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          education: user.education,
          interest: user.interest,
          skills: skillRecords.map((s) => s.skill),
        },
      },
    });
  } catch (error) {
    console.error('Create profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
    });
  }
}
