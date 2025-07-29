# 🧪 Tracklytic SDK Testing Guide

This guide will help you test the Tracklytic SDK to ensure it's working correctly with your Tracklytic instance.

## 📋 Prerequisites

1. **Tracklytic Account**: You need a Tracklytic account with a project set up
2. **API Token**: Get your API token from your Tracklytic dashboard
3. **Project ID**: Get your project ID from your Tracklytic dashboard

## 🚀 Quick Start

### 1. Node.js Testing

```bash
# Navigate to the tl_js directory
cd tl_js

# Install dependencies (if not already done)
npm install

# Build the SDK
npm run build

# Edit the test file with your credentials
# Open test.js and replace:
# - 'your-api-token-here' with your actual API token
# - 'your-project-id' with your actual project ID

# Run the test
node test.js
```

### 2. Browser Testing

```bash
# Build the SDK for browser
npm run build:vite

# Open the browser test file
open test-browser.html
# or simply open test-browser.html in your browser
```

## 📊 Test Coverage

The test files cover all major SDK functionality:

### Event Tracking
- ✅ Simple event tracking
- ✅ Page view tracking
- ✅ Events with notifications
- ✅ Events with custom tags

### User Identification
- ✅ User profile creation/updates
- ✅ Custom user properties

### Insights
- ✅ Setting insight values
- ✅ Incrementing insight values

### Development Mode
- ✅ Testing with disabled tracking
- ✅ Error handling

## 🔧 Configuration

### API Endpoint
The SDK is configured to use `https://api.tracklytic.de` as the base endpoint. If you need to change this, edit `src/constants.ts`:

```typescript
const TRACKLYTIC_BASE = 'https://your-api-endpoint.com';
```

### Development Mode
For development and testing, you can disable API calls:

```javascript
const tracklytic = new Tracklytic({
  token: 'your-token',
  project: 'your-project',
  disableTracking: true // This prevents actual API calls
});
```

## 📝 Expected Results

### Successful Test Run
```
==================================================
Tracklytic SDK Test Suite
==================================================

🚀 Starting Tracklytic SDK Tests...

📊 Test 1: Tracking a simple event...
✅ Event tracked successfully!

📄 Test 2: Tracking a page view...
✅ Page view tracked successfully!

👤 Test 3: Identifying a user...
✅ User identified successfully!

📈 Test 4: Tracking an insight...
✅ Insight tracked successfully!

➕ Test 5: Incrementing an insight...
✅ Insight incremented successfully!

🔔 Test 6: Tracking an event with notification...
✅ Notification event tracked successfully!

🎉 All tests completed successfully!
📋 Check your Tracklytic dashboard to see the events.
```

### Error Handling
If there are any issues, you'll see detailed error messages:

```
❌ Test failed: HTTP Error Response: 401 Unauthorized
[Tracklytic] Failed to publish: : Please check our docs at https://docs.tracklytic.com
```

## 🔍 Troubleshooting

### Common Issues

1. **401 Unauthorized**
   - Check your API token is correct
   - Ensure your token has the right permissions

2. **404 Not Found**
   - Verify your project ID is correct
   - Check if the project exists in your account

3. **Network Errors**
   - Check your internet connection
   - Verify the API endpoint is accessible
   - Check if there are any firewall restrictions

4. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check that TypeScript is installed globally or locally

### Debug Mode

For more detailed debugging, you can modify the test files to log the full request/response:

```javascript
// Add this to see the actual API calls
console.log('Request body:', body);
console.log('Response status:', response.status);
console.log('Response body:', await response.text());
```

## 📱 Browser Testing Tips

1. **Open Developer Tools**: Press F12 to open browser dev tools
2. **Check Network Tab**: Monitor API calls in the Network tab
3. **Console Logs**: Check the browser console for any errors
4. **CORS Issues**: If you see CORS errors, ensure your API endpoint allows browser requests

## 🎯 Next Steps

After successful testing:

1. **Integration**: Integrate the SDK into your application
2. **Production**: Update the API endpoint for production use
3. **Monitoring**: Set up monitoring for your Tracklytic events
4. **Documentation**: Check the main README.md for full API documentation

## 📞 Support

If you encounter any issues:

1. Check the [main README.md](README.md) for detailed documentation
2. Review the [Tracklytic API documentation](https://docs.tracklytic.com)
3. Check the browser console or Node.js logs for detailed error messages
4. Ensure your Tracklytic instance is running and accessible

---

Happy testing! 🎉 