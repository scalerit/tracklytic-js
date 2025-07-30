<div align="center">
	<br>
    <h1>Tracklytic</h1>
	<p>Real-time event tracking and analytics for modern applications.</p>
	<a href="https://www.npmjs.com/package/tracklytic"><img src="https://img.shields.io/npm/v/tracklytic" alt="NPM Version"></a>
	<a href="https://docs.tracklytic.de"><img src="https://img.shields.io/badge/Docs-Tracklytic-blue" alt="Documentation"></a>
	<br>
	<br>
</div>

## 🚀 Features

- **Real-time Event Tracking** - Track user interactions, page views, and custom events
- **User Identification** - Build comprehensive user profiles with custom properties
- **Live Insights** - Monitor key metrics and KPIs in real-time
- **Flexible API** - Simple integration with any JavaScript/TypeScript application
- **TypeScript Support** - Full type safety and IntelliSense support
- **Multiple Environments** - Works in Node.js, browsers, and Deno

## 📦 Installation

```sh
npm install --save tracklytic
```

## 🎯 Quick Start

### Initialize Tracklytic

```js
import { Tracklytic } from 'tracklytic';

const tracklytic = new Tracklytic({ 
  token: 'your-api-token-here',
  project: 'your-project-id'
});
```

### Track Events

```js
// Track a page view
await tracklytic.track({
  event: "page_view",
  channel: "507f1f77bcf86cd799439013",
  description: "User viewed homepage",
  icon: "👁️",
  user_id: "user_123",
  tags: {
    source: "web",
    page: "homepage"
  }
});

// Track a custom event
await tracklytic.track({
  event: "user_signup",
  channel: "507f1f77bcf86cd799439013",
  description: "New user registered",
  icon: "🎉",
  user_id: "user_456",
  tags: {
    source: "google",
    plan: "premium"
  },
  notify: true
});
```

### Identify Users

```js
await tracklytic.identify({
  user_id: "user_123",
  properties: {
    name: "John Doe",
    email: "john@example.com",
    plan: "premium",
    signup_date: "2024-01-15"
  }
});
```

### Track Insights

```js
// Set an insight value
await tracklytic.insight.track({
  title: "Total Users",
  value: 1250,
  icon: "👥"
});

// Increment an insight
await tracklytic.insight.increment({
  title: "Daily Active Users",
  value: 1,
  icon: "📈"
});
```

## 📚 API Reference

### Constructor

```js
new Tracklytic({
  token: string,           // Your Tracklytic API token
  project: string,         // Your project ID
  disableTracking?: boolean // Optional: disable tracking for development
})
```

### Track Events

```js
tracklytic.track({
  event: string,           // Required: Event name
  channel: string,         // Required: Channel ID
  description?: string,    // Optional: Event description
  user_id?: string,        // Optional: User identifier
  icon?: string,           // Optional: Emoji icon
  tags?: object,           // Optional: Custom tags
  notify?: boolean,        // Optional: Send notifications
  parser?: 'markdown',     // Optional: Description parser
  timestamp?: number|Date  // Optional: Event timestamp
})
```

### Identify Users

```js
tracklytic.identify({
  user_id: string,         // Required: User identifier
  properties: object       // Required: User properties
})
```

### Track Insights

```js
// Set insight value
tracklytic.insight.track({
  title: string,           // Required: Insight title
  value: string|number|boolean, // Required: Insight value
  icon?: string            // Optional: Emoji icon
})

// Increment insight value
tracklytic.insight.increment({
  title: string,           // Required: Insight title
  value: number,           // Required: Value to increment by
  icon?: string            // Optional: Emoji icon
})
```

## 🔧 Configuration

### Development Mode

```js
const tracklytic = new Tracklytic({
  token: 'your-token',
  project: 'your-project',
  disableTracking: true // Disables API calls for development
});

// Or toggle dynamically
tracklytic.disableTracking();
tracklytic.enableTracking();
```

### Error Handling

```js
try {
  await tracklytic.track({
    event: "test_event",
    user_id: "user_123"
  });
} catch (error) {
  console.error('Tracklytic error:', error.message);
}
```

## 🌐 Environment Support

- **Node.js** - Full support with automatic fetch polyfill
- **Browser** - Works in all modern browsers
- **Deno** - Native Deno support
- **React/Vue/Angular** - Works with any frontend framework

## 📖 Examples

### E-commerce Tracking

```js
// Track product views
await tracklytic.track({
  event: "product_view",
  channel: "507f1f77bcf86cd799439013",
  description: "User viewed product",
  user_id: user.id,
  tags: {
    product_id: "prod_123",
    category: "electronics",
    price: 299.99
  }
});

// Track purchases
await tracklytic.track({
  event: "purchase_completed",
  channel: "507f1f77bcf86cd799439013",
  description: "Order completed successfully",
  user_id: user.id,
  icon: "💰",
  tags: {
    order_id: "order_456",
    total: 299.99,
    currency: "USD"
  },
  notify: true
});
```

### SaaS Analytics

```js
// Track feature usage
await tracklytic.track({
  event: "feature_used",
  channel: "507f1f77bcf86cd799439013",
  description: "User used advanced analytics",
  user_id: user.id,
  tags: {
    feature: "advanced_analytics",
    plan: user.plan
  }
});

// Update user properties
await tracklytic.identify({
  user_id: user.id,
  properties: {
    name: user.name,
    email: user.email,
    plan: user.plan,
    last_login: new Date().toISOString(),
    features_used: user.features
  }
});
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 [Documentation](https://docs.tracklytic.de)
- 📧 [Email Support](mailto:support@scalerit.com)

---

<div align="center">
  <p>Built with ❤️ by the Tracklytic Team</p>
  <p><a href="https://tracklytic.de">tracklytic.de</a></p>
</div>
