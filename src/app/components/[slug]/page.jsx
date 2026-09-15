import React from 'react';
import { componentsMeta } from '@/data/componentsMeta';
import ComponentDetail from '@/components/ComponentDetail';

export function generateStaticParams() {
  return componentsMeta.map((comp) => ({
    slug: comp.slug,
  }));
}

export function generateMetadata({ params }) {
  const meta = componentsMeta.find((c) => c.slug === params?.slug);
  return {
    title: meta ? `${meta.title} - Flinza Framer Component` : 'Component - Flinza',
    description: meta?.description || 'Framer component in Next.js',
  };
}

export default function ComponentPage({ params }) {
  return <ComponentDetail slug={params?.slug} />;
}
