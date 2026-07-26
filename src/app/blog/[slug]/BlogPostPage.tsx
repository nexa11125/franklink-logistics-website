'use client';

import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import Navbar from '@/components/franklink/Navbar';
import Footer from '@/components/franklink/Footer';
import PageHeader from '@/components/franklink/PageHeader';
import Link from 'next/link';
import { BLOG_POSTS } from '../BlogPage';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const postIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const post = BLOG_POSTS[postIndex];

  if (!post) {
    notFound();
  }

  const prevPost = postIndex > 0 ? BLOG_POSTS[postIndex - 1] : null;
  const nextPost = postIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[postIndex + 1] : null;

  // Simple markdown-like rendering for content
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="space-y-2 mb-6 pl-4">
            {listItems.map((item, i) => (
              <li key={i} className="flex items-baseline gap-2 text-ink-dim text-[15px] leading-relaxed">
                <span className="text-accent shrink-0">—</span>
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink">$1</strong>') }} />
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    lines.forEach((line, i) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={i} className="text-ink text-[26px] md:text-[30px] font-bold mt-10 mb-4 tracking-[-0.01em]">
            {trimmed.replace('## ', '')}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={i} className="text-ink text-[20px] font-bold mt-8 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        listItems.push(trimmed.replace(/^[-*]\s/, ''));
      } else if (/^\d+\.\s/.test(trimmed)) {
        listItems.push(trimmed.replace(/^\d+\.\s/, ''));
      } else if (trimmed === '') {
        flushList();
      } else {
        flushList();
        elements.push(
          <p key={i} className="text-ink-dim text-[15px] leading-relaxed mb-4" dangerouslySetInnerHTML={{
            __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink">$1</strong>'),
          }} />
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          title={post.title}
          breadcrumbs={[
            { label: 'Blog', href: '/blog' },
            { label: post.category, href: `/blog/${post.slug}` },
          ]}
        />

        <section className="py-16 md:py-24">
          <div className="max-w-[800px] mx-auto px-5 md:px-8">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-10 pb-6 border-b border-[rgba(245,240,232,0.06)]">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent px-3 py-1 border border-accent/20">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-faint">
                <Calendar size={12} />
                {new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-faint">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>

            {/* Featured Image */}
            <div
              className="w-full aspect-[16/9] bg-cover bg-center mb-12"
              style={{ backgroundImage: `url('${post.image}')` }}
            />

            {/* Content */}
            <article className="blog-content">
              {renderContent(post.content)}
            </article>

            {/* CTA */}
            <div className="mt-16 p-8 border border-[rgba(245,240,232,0.08)] bg-surface/40 text-center">
              <p className="text-ink text-[20px] font-bold mb-3">Need help with your logistics?</p>
              <p className="text-ink-dim text-[14px] mb-6">Our team of experts is ready to assist you.</p>
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-accent text-background text-[12px] uppercase tracking-[0.12em] font-medium hover:bg-accent-dim transition-colors"
              >
                Get in Touch
              </Link>
            </div>

            {/* Navigation */}
            <div className="mt-12 pt-8 border-t border-[rgba(245,240,232,0.06)] flex justify-between items-start gap-4">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="group flex items-center gap-2 text-ink-dim hover:text-ink transition-colors">
                  <ArrowLeft size={16} className="text-ink-faint group-hover:text-accent transition-colors" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint block mb-0.5">Previous</span>
                    <span className="text-[13px]">{prevPost.title}</span>
                  </div>
                </Link>
              ) : <div />}
              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`} className="group flex items-center gap-2 text-right text-ink-dim hover:text-ink transition-colors">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint block mb-0.5">Next</span>
                    <span className="text-[13px]">{nextPost.title}</span>
                  </div>
                  <ArrowRight size={16} className="text-ink-faint group-hover:text-accent transition-colors" />
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
