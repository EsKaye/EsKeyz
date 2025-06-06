import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-6xl font-display font-bold mb-6 text-liquid-gold">
        EsKeyzShackReborn
      </h1>
      
      <p className="text-xl text-neon-violet mb-12 max-w-2xl">
        A divine fusion of street-slick aesthetics and celestial mysticism.
        Every item, a key. Every order, a prayer answered.
      </p>
      
      <div className="space-x-6">
        <Link
          href="/products"
          className="btn-primary"
        >
          Explore Collection
        </Link>
        
        <Link
          href="/about"
          className="btn-secondary"
        >
          Our Story
        </Link>
      </div>
      
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <div className="card">
          <h3 className="text-2xl font-display text-liquid-gold mb-4">
            Divine Selection
          </h3>
          <p className="text-neon-violet">
            Curated pieces that blend street culture with celestial energy
          </p>
        </div>
        
        <div className="card">
          <h3 className="text-2xl font-display text-liquid-gold mb-4">
            Limited Editions
          </h3>
          <p className="text-neon-violet">
            Exclusive drops that speak to the soul of the streets
          </p>
        </div>
        
        <div className="card">
          <h3 className="text-2xl font-display text-liquid-gold mb-4">
            Sacred Space
          </h3>
          <p className="text-neon-violet">
            A temple of self-expression and divine connection
          </p>
        </div>
      </div>
    </div>
  );
} 