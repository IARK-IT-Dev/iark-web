'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/components/providers/AuthContext';
import {
  Plus,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Edit2,
  Trash2,
  Eye,
} from 'lucide-react';
import Link from 'next/link';

interface Story {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  status: 'draft' | 'pending' | 'published' | 'rejected';
  rejected_reason: string | null;
  created_at: string;
  published_at: string | null;
}

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-gray-100 text-gray-700', icon: FileText },
  pending: { label: 'Menunggu Review', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  published: { label: 'Dipublikasi', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  rejected: { label: 'Ditolak', color: 'bg-red-100 text-red-700', icon: XCircle },
};

export default function MyStoriesPage() {
  const { user } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStories();
    }
  }, [user]);

  async function fetchStories() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('stories')
      .select('id, slug, title, excerpt, status, rejected_reason, created_at, published_at')
      .eq('author_id', user?.id as string)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching stories:', error);
    } else {
      setStories(data || []);
    }
    setLoading(false);
  }

  async function deleteStory(storyId: string) {
    if (!confirm('Apakah Anda yakin ingin menghapus cerita ini?')) return;

    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('stories').delete().eq('id', storyId);

    if (error) {
      console.error('Error deleting story:', error);
      alert('Gagal menghapus cerita');
    } else {
      fetchStories();
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-iark-red" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cerita Saya</h1>
          <p className="text-gray-600">Kelola dan tulis cerita Anda</p>
        </div>
        <Link
          href="/dashboard/stories/new"
          className="flex items-center gap-2 px-4 py-2 bg-iark-red text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Tulis Cerita</span>
        </Link>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-800 text-sm">
          <strong>Info:</strong> Cerita yang Anda kirim akan direview oleh admin sebelum
          dipublikasikan. Proses review biasanya memakan waktu 1-3 hari kerja.
        </p>
      </div>

      {/* Stories List */}
      {stories.length > 0 ? (
        <div className="space-y-4">
          {stories.map((story) => {
            const status = statusConfig[story.status];
            const StatusIcon = status.icon;
            // Allow editing for all except pending? Or just all. 
            // Usually we can edit even if published, but it might need re-review.
            // For now let's allow editing for all to satisfy user request.
            const canEdit = true;

            return (
              <div
                key={story.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {story.title}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {story.excerpt}
                    </p>
                    <p className="text-gray-400 text-xs">
                      Dibuat:{' '}
                      {new Date(story.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                      {story.published_at && (
                        <>
                          {' '}
                          • Dipublikasi:{' '}
                          {new Date(story.published_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </>
                      )}
                    </p>

                    {/* Rejection reason */}
                    {story.status === 'rejected' && story.rejected_reason && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg">
                        <p className="text-xs font-medium text-red-800 mb-1">
                          Alasan Penolakan:
                        </p>
                        <p className="text-sm text-red-700">{story.rejected_reason}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {story.status === 'published' && (
                      <Link
                        href={`/cerita/${story.slug}`}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Lihat"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    )}
                    {canEdit && (
                      <Link
                        href={`/dashboard/stories/${story.id}/edit`}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                    )}
                    <button
                      onClick={() => deleteStory(story.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Belum ada cerita
          </h3>
          <p className="text-gray-500 mb-6">
            Mulai berbagi pengalaman dan cerita Anda sebagai alumni IARK
          </p>
          <Link
            href="/dashboard/stories/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-iark-red text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Tulis Cerita Pertama</span>
          </Link>
        </div>
      )}
    </div>
  );
}
