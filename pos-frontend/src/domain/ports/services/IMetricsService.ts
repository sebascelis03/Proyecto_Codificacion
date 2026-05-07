// domain/ports/services/IMetricsService.ts
// Port interface — no implementations here
import { MetricEvent } from '../shared-types';

export interface WebVitalsMetrics {
  readonly lcp: number | null;  // Largest Contentful Paint (ms)
  readonly fid: number | null;  // First Input Delay (ms)
  readonly cls: number | null;  // Cumulative Layout Shift (score)
  readonly ttfb: number | null; // Time to First Byte (ms)
  readonly inp: number | null;  // Interaction to Next Paint (ms)
}

export interface IMetricsService {
  record(event: MetricEvent): void;
  recordWebVitals(metrics: WebVitalsMetrics): void;
  recordPerformanceDegradation(operation: string, expectedMs: number, actualMs: number): void;
}
