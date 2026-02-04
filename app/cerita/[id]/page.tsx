import { Header, Footer } from '@/components/layout';
import { StoryDetail } from '@/components/features/cerita';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function generateStaticParams() {
  return [];
}

interface StoryWithAuthor {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  hero_image: string | null;
  category: 'karir' | 'pengabdian' | 'akademik' | 'kepemimpinan';
  tags: string[] | null;
  read_time: string | null;
  published_at: string | null;
  author: {
    name: string;
    angkatan: number | null;
    photo: string | null;
  } | null;
}

export default async function StoryDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('stories')
    .select(`
      id,
      title,
      excerpt,
      content,
      hero_image,
      category,
      tags,
      read_time,
      published_at,
      author:profiles!author_id (
        name,
        angkatan,
        photo
      )
    `)
    .eq('id', params.id)
    .eq('status', 'published')
    .single();

  if (error || !data) {
    notFound();
  }

  const storyData = data as unknown as StoryWithAuthor;
  const author = storyData.author;

  const story = {
    id: storyData.id,
    title: storyData.title,
    excerpt: storyData.excerpt || '',
    content: storyData.content || '',
    heroImage: storyData.hero_image || '',
    category: storyData.category,
    tags: storyData.tags || [],
    readTime: storyData.read_time || '5 menit',
    publishedDate: storyData.published_at
      ? new Date(storyData.published_at).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : '',
    name: author?.name || 'Anonymous',
    batch: author?.angkatan ? `RK Angkatan ${author.angkatan}` : '',
    photo: author?.photo || '/images/default-avatar.png',
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <StoryDetail story={story} />
      <Footer />
    </div>
  );
}
