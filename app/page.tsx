import { Header, Footer } from '@/components/layout';
import { HeroSection } from '@/components/features/hero';
import { AboutSection } from '@/components/features/about';
import { BidangPreviewSection } from '@/components/features/bidang';
import { BatchStoriesSection } from '@/components/features/batch';
import { ManagementGrid } from '@/components/features/pengurus';
import { TestimoniSection } from '@/components/features/testimoni';
import { PastActivitiesSection } from '@/components/features/activities';
import { AsramaGallerySection } from '@/components/features/asrama';
import { DonasiSection, StickyDonationCTA } from '@/components/features/donasi';
import { fetchHomepageData } from '@/lib/queries/homepage';
import { fetchBatchStoriesData } from '@/lib/queries/batches';

export default async function Home() {
  // Parallel fetch on server
  const [homepageData, batchStoriesData] = await Promise.all([
    fetchHomepageData(),
    fetchBatchStoriesData(),
  ]);

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection initialData={homepageData.heroSlides} />
      <AboutSection />
      <BidangPreviewSection />
      <BatchStoriesSection initialData={batchStoriesData} />
      <ManagementGrid initialData={homepageData.management} />
      <TestimoniSection initialData={homepageData.featuredStories} />
      <PastActivitiesSection initialData={homepageData.recentActivities} />
      <AsramaGallerySection initialData={homepageData.dormitories} />
      <DonasiSection />
      <Footer />
      <StickyDonationCTA />
    </div>
  );
}
