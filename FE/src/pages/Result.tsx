import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Button, Skeleton } from '@/components';
import { useToast } from '@/contexts/ToastContext';
import { getLatestRecommendation } from '@/api/recommendation';
import type { Recommendation } from '@/api/quiz';
import {
  TopMatches,
  CareerOverview,
  SalaryCard,
  RoadmapTimeline,
  ProjectRecommendations,
  GeminiAnalysis,
} from '@/components/result';

export default function Result() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [primaryRecommendation, setPrimaryRecommendation] = useState<Recommendation | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login', { replace: true });
          return;
        }

        const res = await getLatestRecommendation();
        if (res.success && res.data?.recommendation) {
          setPrimaryRecommendation(res.data.recommendation);
          setRecommendations(res.data.recommendations || [res.data.recommendation]);
        }
      } catch (err: any) {
        showToast(err?.response?.data?.message || 'Failed to load recommendation');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, showToast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-16 pb-24 max-w-6xl mx-auto px-6 py-12">
          <Skeleton className="h-6 w-48 mx-auto mb-4" />
          <Skeleton className="h-10 w-96 mx-auto mb-8" />
          <Skeleton className="h-64 rounded-2xl mb-6" />
          <Skeleton className="h-48 rounded-2xl" />
        </main>
      </div>
    );
  }

  if (!primaryRecommendation) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-16 pb-24 max-w-6xl mx-auto px-6-auto px-6 py-12 text-center">
          <p className="text-gray-500">No recommendation data available</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16 pb-24">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              Career Assessment Report
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
              Your Career Dashboard
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              Berdasarkan analisis AI terhadap jawaban Anda, berikut adalah rekomendasi karir terbaik.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Top Matches */}
            <div className="lg:col-span-1">
              <TopMatches recommendations={recommendations} />
            </div>

            {/* Right Content - Detail */}
            <div className="lg:col-span-3 space-y-6">
              <CareerOverview recommendation={primaryRecommendation} />
              <SalaryCard recommendation={primaryRecommendation} />
              <RoadmapTimeline recommendation={primaryRecommendation} />
              <ProjectRecommendations recommendation={primaryRecommendation} />
              <GeminiAnalysis recommendation={primaryRecommendation} />

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button onClick={() => navigate('/quiz')}>Retake Assessment</Button>
                <Button variant="secondary" onClick={() => navigate('/profile')}>Update Profile</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
