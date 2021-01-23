module.exports = {
    ci: {
        upload: {
            target: 'temporary-public-storage',
        },
        assert: {
            preset: 'lighthouse:all',
            "assertions": {
                // permanently off
                "redirects-http": "off",
                // should be fixed.
                "bypass": 'off',
                "color-contrast": "off",
                "maskable-icon": "off",
                "unsized-images": "off",
                "long-tasks": "off",
                "unused-css-rules": ["error", { "maxLength": 2 }],
                "unused-javascript": ["error", { "maxLength": 1 }],
                "first-contentful-paint": ["error", { "minScore": 0.5 }],
                "first-meaningful-paint": ["error", { "minScore": 0.5 }],
                "largest-contentful-paint": ["error", { "minScore": 0.5 }],
                "legacy-javascript": ["error", { "maxLength": 1 }],
                "max-potential-fid": ["error", { "minScore": 0.1 }],
                "render-blocking-resources": ["error", { "maxLength": 2 }]
            }
        },
    },
};