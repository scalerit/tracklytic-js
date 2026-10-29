// @denoify-ignore
import Tracklytic from './client/tracklytic';

(window as Window & { Tracklytic?: typeof Tracklytic }).Tracklytic = Tracklytic;
