const { Tracklytic } = require('./dist/index.js');

// Initialize Tracklytic client
// Replace these with your actual credentials
const tracklytic = new Tracklytic({
  token: 'your-api-token-here',
  project: 'your-project-id',
  disableTracking: false // Set to true to disable API calls during testing
});

async function runTests() {
  console.log('🚀 Starting Tracklytic SDK Tests...\n');

  try {
    // Test 1: Track a simple event
    console.log('📊 Test 1: Tracking a simple event...');
    await tracklytic.track({
      event: 'test_event',
      description: 'This is a test event from the SDK',
      icon: '🧪',
      user_id: 'test_user_123',
      tags: {
        test_type: 'sdk_test',
        environment: 'development'
      }
    });
    console.log('✅ Event tracked successfully!\n');

    // Test 2: Track a page view event
    console.log('📄 Test 2: Tracking a page view...');
    await tracklytic.track({
      event: 'page_view',
      description: 'User viewed the test page',
      icon: '👁️',
      user_id: 'test_user_123',
      tags: {
        page: 'test_page',
        source: 'manual_test'
      }
    });
    console.log('✅ Page view tracked successfully!\n');

    // Test 3: Identify a user
    console.log('👤 Test 3: Identifying a user...');
    await tracklytic.identify({
      user_id: 'test_user_123',
      properties: {
        name: 'Test User',
        email: 'test@example.com',
        plan: 'premium',
        signup_date: new Date().toISOString(),
        test_user: true
      }
    });
    console.log('✅ User identified successfully!\n');

    // Test 4: Track an insight
    console.log('📈 Test 4: Tracking an insight...');
    await tracklytic.insight.track({
      title: 'Test Users Count',
      value: 1,
      icon: '👥'
    });
    console.log('✅ Insight tracked successfully!\n');

    // Test 5: Increment an insight
    console.log('➕ Test 5: Incrementing an insight...');
    await tracklytic.insight.increment({
      title: 'Test Counter',
      value: 1,
      icon: '🔢'
    });
    console.log('✅ Insight incremented successfully!\n');

    // Test 6: Track an event with notification
    console.log('🔔 Test 6: Tracking an event with notification...');
    await tracklytic.track({
      event: 'important_action',
      description: 'This is an important test action',
      icon: '🚨',
      user_id: 'test_user_123',
      tags: {
        priority: 'high',
        action: 'test_notification'
      },
      notify: true
    });
    console.log('✅ Notification event tracked successfully!\n');

    console.log('🎉 All tests completed successfully!');
    console.log('📋 Check your Tracklytic dashboard to see the events.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

// Development mode test
async function testDevelopmentMode() {
  console.log('\n🧪 Testing Development Mode...');
  
  const devTracklytic = new Tracklytic({
    token: 'dev-token',
    project: 'dev-project',
    disableTracking: true
  });

  try {
    await devTracklytic.track({
      event: 'dev_test',
      description: 'This should not be sent to API',
      user_id: 'dev_user'
    });
    console.log('✅ Development mode working - no API calls made');
  } catch (error) {
    console.error('❌ Development mode test failed:', error.message);
  }
}

// Run the tests
async function main() {
  console.log('='.repeat(50));
  console.log('Tracklytic SDK Test Suite');
  console.log('='.repeat(50));
  
  // Check if credentials are provided
  if (tracklytic.token === 'your-api-token-here' || tracklytic.getProject() === 'your-project-id') {
    console.log('\n⚠️  WARNING: Please update the credentials in test.js before running!');
    console.log('   - Replace "your-api-token-here" with your actual API token');
    console.log('   - Replace "your-project-id" with your actual project ID');
    console.log('\n🧪 Running in development mode instead...\n');
    
    await testDevelopmentMode();
  } else {
    await runTests();
    await testDevelopmentMode();
  }
}

// Run the main function
main().catch(console.error); 