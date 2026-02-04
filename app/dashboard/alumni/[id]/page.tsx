'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Alumni } from '@/components/features/dashboard/AlumniCard';
import { ArrowLeft, Mail, Linkedin, MapPin, Briefcase, GraduationCap, Calendar, Award } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@/lib/supabase/types';

export default function AlumniDetailPage() {
  const params = useParams();
  const router = useRouter();
  const alumniId = params.id as string;

  const [alumni, setAlumni] = useState<Alumni | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlumni() {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email, angkatan, photo, job_title, company, location, linkedin, instagram')
        .eq('id', alumniId)
        .single();

      if (error) {
        console.error('Error fetching alumni:', error);
        setAlumni(null);
        setLoading(false);
        return;
      }

      const profile = data as Profile | null;
      if (!profile) {
        setAlumni(null);
        setLoading(false);
        return;
      }

      setAlumni({
        id: profile.id,
        name: profile.name || '',
        email: profile.email || '',
        batch: profile.angkatan ? `RK Angkatan ${profile.angkatan}` : '',
        field: profile.job_title || '',
        location: profile.location || '',
        avatar: profile.photo || undefined,
        currentRole: profile.job_title || undefined,
        company: profile.company || undefined,
        linkedin: profile.linkedin || undefined,
      });
      setLoading(false);
    }

    fetchAlumni();
  }, [alumniId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-iark-red border-t-transparent"></div>
      </div>
    );
  }

  if (!alumni) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Alumni not found</h2>
          <p className="text-gray-600 mb-4">The alumni profile you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push('/dashboard/alumni')}
            className="text-iark-red hover:underline font-semibold"
          >
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-iark-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-iark-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-10 h-10 bg-iark-yellow rounded-full opacity-20 animate-pulse-slow pointer-events-none" />
      <div className="absolute top-2/3 left-20 w-8 h-8 bg-iark-red rounded-full opacity-20 animate-drift pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto p-6 lg:p-8">
        {/* Back Button */}
        <motion.button
          onClick={() => router.push('/dashboard/alumni')}
          className="flex items-center gap-2 text-gray-600 hover:text-iark-red mb-6 font-semibold transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowLeft size={20} />
          Back to Directory
        </motion.button>

        {/* Header Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-iark-red/20">
              {alumni.avatar ? (
                <Image src={alumni.avatar} alt={alumni.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-iark-red flex items-center justify-center text-white font-bold text-4xl">
                  {alumni.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{alumni.name}</h1>
              <p className="text-xl text-iark-red font-semibold mb-4">
                {alumni.currentRole} @ {alumni.company}
              </p>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} />
                  <span>Angkatan {alumni.batch}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} />
                  <span>{alumni.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase size={18} />
                  <span>{alumni.field}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href={`mailto:${alumni.email}`}
                  className="flex items-center gap-2 px-4 py-2 bg-iark-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={18} />
                  Email
                </motion.a>
                {alumni.linkedin && (
                  <motion.a
                    href={alumni.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin size={18} />
                    LinkedIn
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed">{alumni.bio}</p>
        </motion.div>

        {/* Skills Section */}
        {alumni.skills && alumni.skills.length > 0 && (
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award size={24} className="text-iark-red" />
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap gap-3">
              {alumni.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-iark-red/10 text-iark-red rounded-full font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Experience Section */}
          {alumni.experience && alumni.experience.length > 0 && (
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase size={24} className="text-iark-red" />
                Experience
              </h2>
              <div className="space-y-4">
                {alumni.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-iark-red pl-4">
                    <h3 className="font-bold text-gray-900">{exp.title}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.period}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Education Section */}
          {alumni.education && alumni.education.length > 0 && (
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <GraduationCap size={24} className="text-iark-red" />
                Education
              </h2>
              <div className="space-y-4">
                {alumni.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-iark-blue pl-4">
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* IARK Programs Section */}
        {alumni.programs && alumni.programs.length > 0 && (
          <motion.div
            className="bg-gradient-to-br from-iark-red/5 to-iark-blue/5 rounded-2xl shadow-lg p-8 mt-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">IARK Involvement</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {alumni.programs.map((program, index) => (
                <div
                  key={index}
                  className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200 flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-iark-red rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium">{program}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
