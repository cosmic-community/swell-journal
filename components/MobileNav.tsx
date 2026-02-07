'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Category } from '@/types'

interface MobileNavProps {
  categories: Category[]
}

export default function MobileNav({ categories }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-navy-700 hover:text-teal-700 transition-colors"
        aria-label="Open menu"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-navy-950/30 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="text-lg font-semibold text-navy-900">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-navy-500 hover:text-navy-900 transition-colors"
              aria-label="Close menu"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            </button>
          </div>

          <nav className="space-y-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-navy-700 font-medium hover:bg-sand-100 transition-colors"
            >
              Home
            </Link>

            <div className="pt-4 pb-2 px-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                Categories
              </span>
            </div>

            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-navy-600 hover:bg-sand-100 hover:text-teal-700 transition-colors"
              >
                {cat.metadata?.name || cat.title}
              </Link>
            ))}

            <div className="pt-4">
              <Link
                href="/authors"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-navy-700 font-medium hover:bg-sand-100 transition-colors"
              >
                Authors
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}