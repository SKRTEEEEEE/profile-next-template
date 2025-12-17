# Tests Documentation

## Test Structure

```
tests/
├── unit/                    # Unit tests (no server required)
│   ├── core-utils.spec.ts   # Tests for core/utils.ts
│   ├── lib-utils.spec.ts    # Tests for lib/utils.ts
│   └── components/          # Component unit tests
│       └── button.spec.ts   # Button component tests
├── component/               # Component performance tests (requires server)
│   ├── mode-toggle.spec.ts
│   ├── navbar.spec.ts
│   ├── slider-techs.spec.ts
│   ├── pages-performance.spec.ts
│   └── performance-report.spec.ts
├── e2e/                     # End-to-end tests (requires server)
│   └── performance/
│       └── index.spec.ts
└── utils/                   # Test utilities
    └── url.ts
```

## Running Tests

### Prerequisites

For component and e2e tests, you need to have the development server running:

```bash
npm run dev
```

### Run All Tests

```bash
npm test
```

### Run Only Unit Tests (No Server Required)

```bash
npx playwright test tests/unit
```

### Run Component Performance Tests

```bash
# Start the dev server first
npm run dev

# In another terminal
npx playwright test tests/component
```

### Run E2E Tests

```bash
# Start the dev server first
npm run dev

# In another terminal
npx playwright test tests/e2e
```

## Test Categories

### Unit Tests ✅

Unit tests verify individual functions and components in isolation:

- **core/utils**: Mathematical utility functions (`double`, `triple`)
- **lib/utils**: 
  - `cn()` function for className merging
  - `gradients` array generation
- **Button Component**: Basic rendering and interaction

**Status**: ✅ All passing (29 tests)

### Component Performance Tests ⚡

Performance tests measure render time, interaction time, and resource usage:

- **ModeToggle**: Theme switching performance
- **Navbar**: Navigation rendering and interaction
- **SliderTechs**: Swiper component performance
- **Pages**: Home, Info, and Gradients pages
- **Performance Report**: Generates detailed component analysis

**Requirements**: Development server running on `http://localhost:3000`

### E2E Tests 🔄

End-to-end tests validate full user flows and measure Core Web Vitals:

- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
- JavaScript coverage

**Requirements**: Development server running on `http://localhost:3000`

## Test Reports

Test results are saved to:

```
docs/test-results/
├── reports/
│   └── component-performance-report.md  # Detailed component analysis
└── ...other test outputs
```

### Performance Report

The performance report includes:

- Component size analysis
- Render time measurements
- Script size evaluation
- Memory usage tracking
- Recommendations for optimization

To generate the report:

```bash
# With dev server running
npx playwright test tests/component/performance-report.spec.ts
```

## Interpretation

### Unit Tests

All unit tests should pass without issues. They test pure logic and don't depend on external factors.

### Performance Tests

Performance tests may fail if:

1. **Server not running**: Start with `npm run dev`
2. **Slow system**: Adjust timeout values in test files
3. **Network issues**: Check localhost:3000 accessibility
4. **Resource constraints**: Close other applications

Expected metrics:

- **Load Time**: < 3000ms
- **LCP**: < 2500ms
- **CLS**: < 0.1
- **Render Time**: < 1000ms per component

## Troubleshooting

### "ECONNREFUSED" or timeout errors

**Solution**: Make sure the dev server is running:

```bash
npm run dev
```

### Tests are slow or timing out

**Solution**: Increase timeout in `playwright.config.ts`:

```typescript
timeout: 60000, // Increase from 30000
```

### Performance metrics don't match expectations

This is normal and depends on:

- System resources
- Other running processes
- Network conditions
- Browser cache state

## Future Improvements

- [ ] Add visual regression tests
- [ ] Add accessibility (a11y) tests
- [ ] Add API endpoint tests
- [ ] Implement continuous performance monitoring
- [ ] Add bundle size tracking
