const { Tracklytic } = require('./dist/index.js');

// Initialize Tracklytic client
// Replace these with your actual credentials
const tracklytic = new Tracklytic({
  token: 'YOUR_API_TOKEN',
  project: '68e284a71fa2cba4a67a6586',
  disableTracking: false // Set to true to disable API calls during testing
});

// Channel ID for testing - replace with your actual channel ID
const CHANNEL_ID = 'test-channel';

async function runTests() {
  console.log('🚀 Starting Tracklytic SDK Tests...\n');

  try {
    // Test 1: Track a simple event
    console.log('📊 Test 1: Tracking a simple event...');
    await tracklytic.track({
      event: 'test_event',
      channel: CHANNEL_ID,
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
      notify: true,
      event: 'page_view',
      channel: CHANNEL_ID,
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
      icon: '👥',
    });
    console.log('✅ Insight tracked successfully!\n');

    // Test 5: Increment an insight
    console.log('➕ Test 5: Incrementing an insight...');
    await tracklytic.insight.increment({
      title: 'Test Counter',
      value: 1,
      icon: '🔢',
    });
    console.log('✅ Insight incremented successfully!\n');

    // Test 6: Track an event with notification
    console.log('🔔 Test 6: Tracking an event with notification...');
    await tracklytic.track({
      event: 'important_action',
      channel: CHANNEL_ID,
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

    // Test 7: Track an event with button action
    console.log('🔘 Test 7: Tracking an event with button action...');
    await tracklytic.track({
      event: 'user_action_required',
      channel: CHANNEL_ID,
      description: 'User needs to confirm an action',
      icon: '⚠️',
      user_id: 'test_user_123',
      tags: {
        action_type: 'confirmation',
        urgency: 'medium'
      },
      actions: [{
        type: 'button',
        properties: {
          buttonText: 'Confirm Action',
          buttonColor: 'green',
          buttonStyle: 'primary'
        },
        action: [{
          type: 'webhook',
          properties: {
            url: 'https://api.example.com/confirm-action',
            method: 'POST',
            body: {
              userId: 'test_user_123',
              action: 'confirmation',
              timestamp: new Date().toISOString()
            }
          }
        }]
      }]
    });
    console.log('✅ Button action event tracked successfully!\n');

    // Test 8: Track an event with form action
    console.log('📝 Test 8: Tracking an event with form action...');
    await tracklytic.track({
      event: 'feedback_requested',
      channel: CHANNEL_ID,
      description: 'User feedback is needed',
      icon: '💬',
      user_id: 'test_user_123',
      tags: {
        feedback_type: 'user_experience',
        priority: 'low'
      },
      actions: [{
        type: 'form',
        properties: {
          formTitle: 'Provide Feedback',
          submitButtonText: 'Submit Feedback',
          fields: [
            { name: 'rating', type: 'number', label: 'Rating (1-5)', required: true },
            { name: 'comment', type: 'textarea', label: 'Comments', required: false }
          ]
        },
        action: [{
          type: 'webhook',
          properties: {
            url: 'https://api.example.com/submit-feedback',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        }]
      }]
    });
    console.log('✅ Form action event tracked successfully!\n');

    // Test 9: Track an event with multiple actions
    console.log('🔄 Test 9: Tracking an event with multiple actions...');
    await tracklytic.track({
      event: 'order_processing',
      channel: CHANNEL_ID,
      description: 'Order needs processing with multiple options',
      icon: '📦',
      user_id: 'test_user_123',
      tags: {
        order_id: 'ORD-12345',
        status: 'pending'
      },
      actions: [
        {
          type: 'button',
          properties: {
            buttonText: 'Process Order',
            buttonColor: 'blue'
          },
          action: [{
            type: 'webhook',
            properties: {
              url: 'https://api.example.com/process-order',
              method: 'POST',
              body: { orderId: 'ORD-12345', action: 'process' }
            }
          }]
        },
        {
          type: 'button',
          properties: {
            buttonText: 'Cancel Order',
            buttonColor: 'red'
          },
          action: [{
            type: 'webhook',
            properties: {
              url: 'https://api.example.com/cancel-order',
              method: 'POST',
              body: { orderId: 'ORD-12345', action: 'cancel' }
            }
          }]
        },
        {
          type: 'button',
          properties: {
            buttonText: 'View Details',
            buttonColor: 'gray'
          },
          action: [{
            type: 'url',
            properties: {
              url: 'https://app.example.com/orders/ORD-12345',
              openInNewTab: true
            }
          }]
        }
      ]
    });
    console.log('✅ Multiple actions event tracked successfully!\n');

    // Test 10: Track an event with custom action
    console.log('🎨 Test 10: Tracking an event with custom action...');
    await tracklytic.track({
      event: 'custom_widget_interaction',
      channel: CHANNEL_ID,
      description: 'Custom widget interaction detected',
      icon: '🎯',
      user_id: 'test_user_123',
      tags: {
        widget_type: 'custom',
        interaction: 'click'
      },
      actions: [{
        type: 'custom',
        properties: {
          componentName: 'CustomWidget',
          customData: {
            widgetId: 'widget-123',
            position: { x: 100, y: 200 },
            timestamp: new Date().toISOString()
          }
        },
        action: [{
          type: 'notification',
          properties: {
            title: 'Widget Interaction',
            message: 'Custom widget was clicked',
            type: 'info'
          }
        }]
      }]
    });
    console.log('✅ Custom action event tracked successfully!\n');

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
      channel: 'dev-channel',
      description: 'This should not be sent to API',
      user_id: 'dev_user'
    });
    console.log('✅ Development mode working - no API calls made');

    // Test actions in development mode
    await devTracklytic.track({
      event: 'dev_action_test',
      channel: 'dev-channel',
      description: 'Testing actions in development mode',
      user_id: 'dev_user',
      actions: [{
        type: 'button',
        properties: {
          buttonText: 'Dev Action',
          buttonColor: 'purple'
        },
        action: [{
          type: 'webhook',
          properties: {
            url: 'https://dev-api.example.com/test',
            method: 'POST'
          }
        }]
      }]
    });
    console.log('✅ Development mode actions test working - no API calls made');
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
    console.log('   - Replace "your-channel-id-here" with your actual channel ID');
    console.log('\n🧪 Running in development mode instead...\n');
    
    await testDevelopmentMode();
  } else {
    await runTests();
    await testDevelopmentMode();
  }
}

// Run the main function
main().catch(console.error); 