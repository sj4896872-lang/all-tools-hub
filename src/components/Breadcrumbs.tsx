import React from 'react';

interface BreadcrumbsProps {
  paths: { label: string; href?: string }[];
  onNavigate: (href: string) => void;
}

export default function Breadcrumbs({ paths, onNavigate }: BreadcrumbsProps) {
  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol 
        className="flex items-center text-xs font-mono text-gray-500 dark:text-gray-400 flex-wrap gap-1"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        <li 
          itemProp="itemListElement" 
          itemScope 
          itemType="https://schema.org/ListItem"
          className="flex items-center"
        >
          <button 
            onClick={() => onNavigate('#/')}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            itemProp="item"
          >
            <span itemProp="name">Home</span>
          </button>
          <meta itemProp="position" content="1" />
        </li>

        {paths.map((p, idx) => {
          const position = idx + 2;
          return (
            <React.Fragment key={idx}>
              <span className="mx-1 text-gray-300 dark:text-gray-600" aria-hidden="true">/</span>
              <li 
                itemProp="itemListElement" 
                itemScope 
                itemType="https://schema.org/ListItem"
                className="flex items-center"
              >
                {p.href ? (
                  <button
                    onClick={() => onNavigate(p.href!)}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                    itemProp="item"
                  >
                    <span itemProp="name">{p.label}</span>
                  </button>
                ) : (
                  <span 
                    className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[200px]"
                    itemProp="name"
                  >
                    {p.label}
                  </span>
                )}
                {p.href && <meta itemProp="item" content={`https://alltoolshub.com/${p.href}`} />}
                <meta itemProp="position" content={String(position)} />
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
