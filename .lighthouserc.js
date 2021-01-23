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
            "assertions": {
                // permanently off
                "redirects-http": "off",
                // should be fixed.
                "apple-touch-icon": "off",
                "aria-hidden-focus": "off",
                "bootup-time": ["error", { "minScore": 0.5 }],
                "button-name": "off",
                "document-title": "off",
                "dom-size": ["error", { "minScore": 0.8 }],
                "errors-in-console": "off",
                "external-anchors-use-rel-noopener": "off",
                "first-cpu-idle": ["error", { "minScore": 0.3 }],
                "heading-order": "off",
                "html-has-lang": "off",
                "image-alt": "off",
                "installable-manifest": "off",
                "interactive": ["error", { "minScore": 0.2 }],
                "label": "off",
                "largest-contentful-paint": ["error", { "minScore": 0.2 }],
                "legacy-javascript": ["error", { "maxLength": 6 }],
                "link-name": "off",
                "load-fast-enough-for-pwa": "off",
                "mainthread-work-breakdown": "off",
                "meta-description": "off",
                "no-unload-listeners": "off",
                "non-composited-animations": "off",
                "offline-start-url": "off",
                "service-worker": "off",
                "speed-index": "off",
                "speed-index": ["error", { "minScore": 0.3 }],
                "splash-screen": "off",
                "themed-omnibox": "off",
                "unused-javascript": ["error", { "maxLength": 5 }],
                "uses-http2": ["error", { "minScore": 0.85 }],
                "uses-passive-event-listeners": "off",
                "valid-source-maps": "off",
                "works-offline": "off",
            }
        },
    },
};