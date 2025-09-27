# Requirements Document

## Introduction

This feature addresses the 404 error that occurs when clicking the "Manage" button in Cherry Studio for Houdini. The issue is that external OpenAI-compatible services (like CherryIN) fail to fetch model lists, while local Ollama services work correctly. The solution focuses on intercepting and properly handling the model list fetching that occurs after clicking the Manage button.

## Alignment with Product Vision

This fix ensures that Cherry Studio for Houdini can properly integrate with external AI model providers, expanding the range of available AI services beyond just local Ollama instances.

## Requirements

### Requirement 1: Intercept Manage Button Model Fetching

**User Story:** As a Houdini user, I want the Manage button to successfully fetch model lists from external OpenAI-compatible services, so that I can use a wider range of AI models in my workflow.

#### Acceptance Criteria

1. WHEN user clicks the Manage button THEN the system SHALL intercept the `fetchModels(provider)` call
2. WHEN `fetchModels(provider)` is called THEN the system SHALL route the request through the Python backend's network proxy logic

### Requirement 2: Debug Manage Button Call Chain

**User Story:** As a developer, I want to trace the complete call chain from Manage button click to model list fetching, so that I can identify where the 404 error occurs and fix it.

#### Acceptance Criteria

1. WHEN Manage button is clicked THEN the system SHALL log the start of the call chain
2. WHEN `fetchModels(provider)` is called THEN the system SHALL log the provider details
3. WHEN `AI.models()` is called THEN the system SHALL log the AI provider instance
4. WHEN `this.legacyProvider.models()` is called THEN the system SHALL log the legacy provider call
5. WHEN `this.apiClient.listModels()` is called THEN the system SHALL log the API client call
6. WHEN `window.api?.models?.list` is called THEN the system SHALL log the final API call with config details

### Requirement 3: Fix External Service Model Fetching (Future Phase)

**User Story:** As a Houdini user, I want external OpenAI-compatible services to work the same way as Ollama, so that I can seamlessly switch between different AI providers.

#### Acceptance Criteria

*Note: This requirement will be addressed after Requirements 1 and 2 are completed.*

1. WHEN external service request is detected (non-localhost URL) THEN the system SHALL use the Python backend's `modelList` method
2. WHEN `modelList` method is called THEN the system SHALL try multiple API endpoints in sequence
3. WHEN 404 error occurs THEN the system SHALL try the next endpoint instead of failing
4. WHEN all endpoints are exhausted THEN the system SHALL return empty model list with 200 status
5. WHEN successful response is received THEN the system SHALL return the model list in OpenAI-compatible format

## Non-Functional Requirements

### Code Architecture and Modularity
- **Single Responsibility Principle**: Each interception point should handle one specific part of the call chain
- **Modular Design**: Debug logging should be separate from business logic
- **Dependency Management**: Minimize changes to existing Cherry Studio codebase
- **Clear Interfaces**: Maintain compatibility with existing `window.api.models.list` interface

### Performance
- Model list fetching should complete within 10 seconds
- Multi-path fallback should not significantly impact performance
- Debug logging should not impact user experience

### Security
- API keys should be properly passed through the call chain
- No sensitive information should be logged in debug output

### Reliability
- System should gracefully handle network timeouts
- System should handle malformed API responses
- System should provide meaningful error messages when all endpoints fail

### Usability
- Users should see appropriate feedback during model list loading
- Empty model lists should not prevent users from manually entering model names
- Error messages should be user-friendly and actionable
