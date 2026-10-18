import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { company, products, type Product } from '@/data/products'

function productImageAlt(product: Product) {
  return `${product.name} ${product.form} by ${company.name} for ${product.category.toLowerCase()}`
}

export function ProductCard({ product }: { product: Product }) {
  const thumbnail = product.images[0]

  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <article className="glass-panel flex h-full flex-col overflow-hidden rounded-[2rem] border-white/50">
        <div className="relative aspect-[4/3] overflow-hidden bg-white">
          <Image
            src={thumbnail}
            alt={productImageAlt(product)}
            width={900}
            height={700}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="size-full object-cover"
          />
          <div className="absolute left-4 top-4">
            <span className="rounded-full border border-white/70 bg-white/90 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">
              {product.category}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-2xl font-heading font-bold tracking-tight text-foreground">
            {product.name}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
            {product.shortDescription}
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {product.composition.slice(0, 2).map((item) => (
              <span key={item} className="rounded-full bg-secondary/80 px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-end justify-between border-t border-white/60 pt-5">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                MRP
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">{product.mrp}</p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              View details
              <ArrowRight className="size-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export function Products() {
  return (
    <section id="products" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <span className="glass-panel inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Product Portfolio
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            RexCure product range
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Browse our formulations across anti-diabetic, gastro care, allergy, pain management, nutraceutical and pediatric therapy areas, along with our apparel.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
