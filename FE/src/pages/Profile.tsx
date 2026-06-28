import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navbar, Button, Chip, Input } from '@/components';
import { useToast } from '@/contexts/ToastContext';
import { saveProfile } from '@/api/profile';
import { useNavigate } from 'react-router-dom';
import {
  EDUCATION_OPTIONS,
  IT_INTEREST_OPTIONS,
  SKILL_OPTIONS,
  type EducationLevel,
  type ITInterest,
  type Skill,
} from '@/types';

const profileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  education: z.string().min(1, 'Please select your education level'),
  interest: z.string().min(1, 'Please select your IT interest'),
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function Profile() {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Load user from localStorage
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: user?.fullName || '',
      education: user?.education || undefined,
      interest: user?.interest || undefined,
      skills: [],
    },
  });

  const watchedInterest = watch('interest');
  const selectedEducation = watch('education');

  // Load saved skills from user
  useEffect(() => {
    if (user?.skills?.length > 0) {
      const savedSkills = user.skills.filter((s: string) => SKILL_OPTIONS.includes(s as Skill));
      setSelectedSkills(savedSkills);
      setValue('skills', savedSkills, { shouldValidate: true });
    }
  }, []);

  const toggleSkill = (skill: Skill) => {
    const updated = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(updated);
    setValue('skills', updated, { shouldValidate: true });
  };

  const onSubmit = async (data: ProfileFormData) => {
    const payload = {
      fullName: data.fullName,
      education: data.education,
      interest: data.interest,
      skills: selectedSkills,
    };

    console.log('[Profile] Payload sent to POST /api/profile:', payload);

    // Manual validation before sending
    if (!payload.fullName || !payload.education || !payload.interest || payload.skills.length === 0) {
      showToast('Please fill in all fields: Full Name, Education, IT Interest, and at least 1 Skill.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await saveProfile(payload);
      if (res.success) {
        if (res.data?.user) {
          localStorage.setItem('user', JSON.stringify(res.data.user));
        }
        showToast('Profile saved successfully!', 'success');
        navigate('/quiz', { replace: true });
      } else {
        showToast(res.message || 'Failed to save profile');
      }
    } catch (err: any) {
      const serverMsg = err?.response?.data?.message;
      const details = err?.response?.data?.details;
      const fallback = 'An error occurred. Please try again.';
      showToast(serverMsg || details || fallback);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50/30">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">

            {/* Left Side */}
            <div className="lg:col-span-5 flex flex-col">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 mb-6 w-fit">
                Career Profile
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
                Build Your Career Profile
              </h1>

              <p className="text-gray-500 leading-relaxed mb-8 max-w-md">
                Help us understand your interests and abilities so we can provide more accurate IT career recommendations.
              </p>

              {/* Illustration Area */}
              <div className="relative mb-10 rounded-2xl overflow-hidden bg-linear-to-br from-blue-50/50 via-purple-50 to-blue-50/30 border border-blue-100 p-6 md:p-8">
                <div className="absolute top-4 right-4 w-24 h-24 bg-blue-500/5 rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />

                <div className="relative space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Smart Career Matching</div>
                      <div className="text-xs text-gray-500">Advanced analysis of your profile</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">IT-Focused Assessment</div>
                      <div className="text-xs text-gray-500">Designed for tech careers</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 7.5c5.385 0 10.252.979 14.25 2.625V15" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Personalized Results</div>
                      <div className="text-xs text-gray-500">Tailored career plans</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Benefit Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">8+</div>
                  <div className="text-xs text-gray-500">Career Paths</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">15</div>
                  <div className="text-xs text-gray-500">Quiz Questions</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
                  <div className="text-xs text-gray-500">Free</div>
                </div>
              </div>
            </div>

            {/* Right Side - Form Card */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-xl shadow-blue-500/5 p-8">
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-blue-500/5 to-purple-500/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-linear-to-tr from-blue-500/5 to-transparent rounded-full pointer-events-none" />

                <div className="relative">
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 tracking-tight mb-1">
                      Your Information
                    </h2>
                    <p className="text-sm text-gray-500">
                      Fill in your details to get started
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Full Name */}
                    <Input
                      label="Full Name"
                      type="text"
                      placeholder="Enter your full name"
                      error={errors.fullName?.message}
                      {...register('fullName')}
                    />

                    {/* Education */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-3">
                        Education
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                        {EDUCATION_OPTIONS.map((option) => {
                          const isSelected = selectedEducation === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setValue('education', option as EducationLevel, { shouldValidate: true })}
                              className={`px-3 py-2.5 text-sm rounded-xl border transition-all duration-200 ${
                                isSelected
                                  ? 'border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                                  : 'border-gray-200 hover:border-gray-300 text-gray-900 bg-white hover:shadow-sm'
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                      {errors.education && (
                        <p className="text-xs text-red-600 mt-2">
                          {errors.education.message}
                        </p>
                      )}
                    </div>

                    {/* Primary IT Interest */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-3">
                        Primary IT Interest
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {IT_INTEREST_OPTIONS.map((option) => {
                          const isSelected = watchedInterest === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setValue('interest', option as ITInterest, { shouldValidate: true })}
                              className={`px-4 py-2.5 text-sm rounded-xl border transition-all duration-200 text-left ${
                                isSelected
                                  ? 'border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                                  : 'border-gray-200 hover:border-gray-300 text-gray-900 bg-white hover:shadow-sm'
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                      {errors.interest && (
                        <p className="text-xs text-red-600 mt-2">
                          {errors.interest.message}
                        </p>
                      )}
                    </div>

                    {/* Current Skills */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Current Skills
                      </label>
                      <p className="text-xs text-gray-500 mb-4">
                        Select all technologies you are familiar with.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {SKILL_OPTIONS.map((skill) => {
                          const isSelected = selectedSkills.includes(skill);
                          return (
                            <Chip
                              key={skill}
                              selected={isSelected}
                              onClick={() => toggleSkill(skill)}
                            >
                              {skill}
                            </Chip>
                          );
                        })}
                      </div>
                      {errors.skills && (
                        <p className="text-xs text-red-600 mt-3">
                          {errors.skills.message as string}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end pt-4 border-t border-gray-200">
                      <Button type="submit" size="lg" disabled={!isValid || isLoading}>
                        {isLoading ? 'Saving...' : 'Continue Assessment'}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
