'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  FileText,
  Users,
  Calendar,
  Clock,
  TrendingUp,
  Eye,
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalStories: number;
  pendingStories: number;
  totalUsers: number;
  totalEvents: number;
}

interface PendingStory {
  id: string;
  title: string;
  created_at: string;
  profiles: {
    full_name: string;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStories: 0,
    pendingStories: 0,
    totalUsers: 0,
    totalEvents: 0,
  });
  const [pendingStories, setPendingStories] = useState<PendingStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      const supabase = createClient();

      try {
        // Fetch stats in parallel
        const [storiesRes, pendingRes, usersRes, eventsRes] = await Promise.all([
          supabase.from('stories').select('id', { count: 'exact', head: true }),
          supabase
            .from('stories')
            .select('id', { count: 'exact', head: true })
            .eq('status', 'pending'),
          supabase.from('profiles').select('id', { count: 'exact', head: true }),
          supabase.from('events').select('id', { count: 'exact', head: true }),
        ]);

        setStats({
          totalStories: storiesRes.count || 0,
          pendingStories: pendingRes.count || 0,
          totalUsers: usersRes.count || 0,
          totalEvents: eventsRes.count || 0,
        });

        // Fetch pending stories for review
        const { data: pending } = await supabase
          .from('stories')
          .select('id, title, created_at, profiles(full_name)')
          .eq('status', 'pending')
          .order('created_at', { ascending: false })
          .limit(5);

        setPendingStories((pending as PendingStory[]) || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      label: 'Total Cerita',
      value: stats.totalStories,
      icon: FileText,
      color: 'bg-blue-500',
      href: '/admin/stories',
    },
    {
      label: 'Menunggu Review',
      value: stats.pendingStories,
      icon: Clock,
      color: 'bg-yellow-500',
      href: '/admin/stories?status=pending',
    },
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-green-500',
      href: '/admin/users',
    },
    {
      label: 'Total Events',
      value: stats.totalEvents,
      icon: Calendar,
      color: 'bg-purple-500',
      href: '/admin/events',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-iark-red" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-600">Selamat datang di panel administrasi IARK</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pending Stories */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Cerita Menunggu Review
              </h2>
              <p className="text-sm text-gray-600">
                Cerita yang perlu direview dan disetujui
              </p>
            </div>
            <Link
              href="/admin/stories?status=pending"
              className="text-iark-red hover:text-red-700 text-sm font-medium"
            >
              Lihat Semua
            </Link>
          </div>
        </div>

        {pendingStories.length > 0 ? (
          <div className="divide-y">
            {pendingStories.map((story) => (
              <div
                key={story.id}
                className="p-6 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {story.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    oleh {story.profiles?.full_name || 'Anonymous'} •{' '}
                    {new Date(story.created_at).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <Link
                  href={`/admin/stories/${story.id}`}
                  className="ml-4 flex items-center gap-2 text-iark-red hover:text-red-700"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">Review</span>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada cerita yang menunggu review</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/admin/stories?status=pending"
              className="flex items-center gap-3 p-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <Clock className="w-5 h-5" />
              <span className="font-medium">Review Cerita Pending</span>
            </Link>
            <Link
              href="/admin/events"
              className="flex items-center gap-3 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Kelola Events</span>
            </Link>
            <Link
              href="/admin/hero-slides"
              className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Update Hero Slides</span>
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-br from-iark-red to-red-700 rounded-xl shadow-sm p-6 text-white">
          <h2 className="text-lg font-semibold mb-2">Tips Admin</h2>
          <ul className="space-y-2 text-sm text-white/90">
            <li>• Review cerita baru dalam 24 jam untuk engagement maksimal</li>
            <li>• Update hero slides setiap ada event penting</li>
            <li>• Pastikan data pengurus selalu up-to-date</li>
            <li>• Monitor aktivitas user secara berkala</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
