module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      startServerCommand: 'yarn start',
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:all',
      assertions: {
        // permanently off
        'redirects-http': 'off',
        // should be fixed.
        'apple-touch-icon': 'off',
        'aria-hidden-focus': 'off',
        'bootup-time': ['error', { minScore: 0.4 }],
        'button-name': 'off',
        'color-contrast': 'off',
        'cumulative-layout-shift': ['error', { minScore: 0.2 }],
        'document-title': 'off',
        'dom-size': ['error', { minScore: 0.8 }],
        'errors-in-console': 'off',
        'external-anchors-use-rel-noopener': 'off',
        'first-contentful-paint': ['error', { minScore: 0.1 }],
        'first-cpu-idle': ['error', { minScore: 0.1 }],
        'first-meaningful-paint': ['error', { minScore: 0.1 }],
        'heading-order': 'off',
        'html-has-lang': 'off',
        'image-alt': 'off',
        'installable-manifest': 'off',
        interactive: ['error', { minScore: 0.05 }],
        label: 'off',
        'largest-contentful-paint': ['error', { minScore: 0.01 }],
        'legacy-javascript': ['error', { maxLength: 6 }],
        'link-name': 'off',
        'load-fast-enough-for-pwa': 'off',
        'long-tasks': 'off',
        'mainthread-work-breakdown': 'off',
        'maskable-icon': 'off',
        'meta-description': 'off',
        'max-potential-fid': ['error', { minScore: 0.01 }],
        'no-unload-listeners': 'off',
        'non-composited-animations': 'off',
        'offline-start-url': 'off',
        'render-blocking-resources': ['error', { minScore: 0.5 }],
        'service-worker': 'off',
        'speed-index': 'off',
        'speed-index': ['error', { minScore: 0.1 }],
        'splash-screen': 'off',
        'themed-omnibox': 'off',
        'unminified-css': ['error', { minScore: 0.8 }],
        'unsized-images': 'off',
        'unused-css-rules': ['error', { minScore: 0.4 }],
        'unused-javascript': ['error', { maxLength: 7 }],
        'uses-http2': ['error', { minScore: 0.7 }],
        'uses-passive-event-listeners': 'off',
        'valid-source-maps': 'off',
        'works-offline': 'off',
      },
    },
  },
}
