/**
 * Action component types
 */
export type ActionComponentType = 'button' | 'form' | 'custom';

/**
 * Action execution types
 */
export type ActionExecutionType = 'webhook' | 'url' | 'notification';

/**
 * Action execution definition
 */
export interface ActionExecution {
  /**
   * Type of action to execute
   */
  type: ActionExecutionType;
  
  /**
   * Action-specific properties
   */
  properties?: Record<string, any>;
}

/**
 * Action component definition
 */
export interface ActionComponent {
  /**
   * Type of action component
   */
  type: ActionComponentType;
  
  /**
   * Component-specific properties
   */
  properties?: Record<string, any>;
  
  /**
   * Actions to execute when component is triggered
   */
  action: ActionExecution[];
}
